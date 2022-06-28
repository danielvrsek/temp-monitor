import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Events } from 'shared/websockets';
import { UserDeviceRepository } from 'dataLayer/repositories/userDevice.repository';
import { UserDeviceSensorValueMapper } from 'mappers/userDeviceSensorValue.mapper';
import { objectId } from 'utils/schemaHelper';
import { UserDeviceSensorValueGranularityService } from 'services/userDeviceSensorValueGranularity.service';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { TokenType } from 'shared/authorization';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { GatewaySocket } from '../clientSocket';
import { UserDeviceSensorValueRepository } from 'dataLayer/repositories/userDeviceSensorValue.repository';
import { UserDeviceSensorValueService } from 'services/userDeviceSensorValue.service';
import {
    CreateUserDeviceSensorDto,
    InsertUserDeviceSensorDataDto,
    UserDeviceSensorValueDataDto,
    UserDeviceSensorValueDto,
    UserDeviceSensorValueQuery,
    UserDeviceSensorViewModel,
} from 'shared/dto';
import { UserDeviceSensorMapper } from 'mappers/userDeviceSensor.mapper';
import { UserDeviceSensorService } from 'services/userDeviceSensor.service';
import { UserDeviceSensorRepository } from 'dataLayer/repositories/userDeviceSensor.repository';

@WebSocketGateway()
export class UserDeviceSensorGateway {
    @WebSocketServer()
    server: Server & { gateways: { [id: string]: string } };

    constructor(
        private readonly userDeviceRepository: UserDeviceRepository,
        private readonly userDeviceSensorService: UserDeviceSensorService,
        private readonly userDeviceSensorRepository: UserDeviceSensorRepository,
        private readonly userDeviceSensorValueRepository: UserDeviceSensorValueRepository,
        private readonly userDeviceSensorValueService: UserDeviceSensorValueService,
        private readonly userDeviceSensorValueGranularityService: UserDeviceSensorValueGranularityService,
        private readonly gatewayRepository: GatewayRepository
    ) {}

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @EnforceTokenType(TokenType.User)
    @SubscribeMessage(Events.CreateUserDeviceSensor)
    async createDeviceAsync(@MessageBody() dto: CreateUserDeviceSensorDto): Promise<UserDeviceSensorViewModel> {
        const deviceSensor = await this.userDeviceSensorService.createAsync(dto);
        const device = await this.userDeviceRepository.findByIdAsync(deviceSensor.userDeviceId);

        const socketId = this.getGatewaySocketId(device.gatewayId.toString());
        if (socketId) {
            const sensorViewModel = UserDeviceSensorMapper.mapToViewModel(deviceSensor);
            this.server.sockets.to(socketId).timeout(1000).emit('gateway/deviceSensorAdded', sensorViewModel);
        }

        return UserDeviceSensorMapper.mapToViewModel(deviceSensor);
    }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @EnforceTokenType(TokenType.User)
    @SubscribeMessage(Events.DeleteUserDeviceSensor)
    async deleteDeviceSensorAsync(@MessageBody() deviceSensorId: string): Promise<UserDeviceSensorViewModel> {
        const deviceSensor = await this.userDeviceSensorService.deleteAsync(deviceSensorId);
        const device = await this.userDeviceRepository.findByIdAsync(deviceSensor.userDeviceId);

        const socketId = this.getGatewaySocketId(device.gatewayId.toString());
        if (socketId) {
            const sensorViewModel = UserDeviceSensorMapper.mapToViewModel(deviceSensor);
            this.server.sockets.to(socketId).timeout(1000).emit('gateway/deviceSensorRemoved', deviceSensorId);
        }

        return UserDeviceSensorMapper.mapToViewModel(deviceSensor);
    }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @EnforceTokenType(TokenType.User)
    @SubscribeMessage(Events.QueryAvailableSensors)
    async queryAvailableSensorsAsync(@MessageBody() deviceId: string): Promise<string | null> {
        const device = await this.userDeviceRepository.findByIdAsync(objectId(deviceId));
        if (!device) {
            throw new BadRequestException('Invalid device');
        }

        const socketId = this.getGatewaySocketId(device.gatewayId.toString());
        if (!socketId) {
            return null;
        }

        const currentDeviceSensors = await this.userDeviceSensorRepository.findAllByDeviceIdAsync(device._id);

        return await new Promise<string>((resolve, reject) => {
            this.server.sockets
                .to(socketId)
                .timeout(1000)
                .emit('gateway/getAvailableSensors', device.externalId, (_, response) => {
                    const result = response[0].filter(
                        (x) => !currentDeviceSensors.some((device) => device.externalId === x.identifier)
                    );

                    resolve(result);
                });
        });
    }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @EnforceTokenType(TokenType.User)
    @SubscribeMessage(Events.QueryUserDeviceSensorValue)
    async queryDeviceSensorValueAsync(
        @MessageBody() deviceSensorId: string
    ): Promise<UserDeviceSensorValueDataDto | null> {
        const deviceSensor = await this.userDeviceSensorRepository.findByIdAsync(objectId(deviceSensorId));
        const device = await this.userDeviceRepository.findByIdAsync(deviceSensor.userDeviceId);

        const socketId = this.getGatewaySocketId(device.gatewayId.toString());
        if (!socketId) {
            return null;
        }

        return await new Promise<UserDeviceSensorValueDataDto>((resolve, reject) => {
            this.server.sockets
                .to(socketId)
                .timeout(1000)
                .emit('gateway/getDeviceSensorValue', deviceSensor.externalId, (_, response) => {
                    const result: UserDeviceSensorValueDataDto = response[0];
                    resolve(result);
                });
        });
    }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @EnforceTokenType(TokenType.User)
    @SubscribeMessage(Events.QueryUserDeviceSensorValueData)
    async queryUserDeviceSensorData(
        @MessageBody() query: UserDeviceSensorValueQuery
    ): Promise<UserDeviceSensorValueDto[]> {
        const dateFrom = new Date(query.dateFrom);
        const dateTo = new Date(query.dateTo);
        const sensorId = objectId(query.sensorId);
        let granularity = query.granularity;

        let data = await this.userDeviceSensorValueRepository.findAllBySensorIdAsync(sensorId, dateFrom, dateTo);
        if (data.length === 0) {
            return [];
        }

        data = this.userDeviceSensorValueService.sort(data);
        let dataDto = data.map(UserDeviceSensorValueMapper.mapToViewModel);

        if (granularity === 0 || isNaN(granularity)) {
            granularity = this.userDeviceSensorValueGranularityService.calculateGranularity(dateFrom, dateTo);
        }

        return this.userDeviceSensorValueGranularityService.transformByGranularity(
            dataDto,
            dateFrom,
            dateTo,
            granularity
        );
    }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @EnforceTokenType(TokenType.Gateway)
    @SubscribeMessage(Events.InsertUserDeviceSensorValueData)
    async insertUserDeviceSensorData(
        @ConnectedSocket() client: GatewaySocket,
        @MessageBody() data: InsertUserDeviceSensorDataDto
    ) {
        const gateway = await this.gatewayRepository.findByIdAsync(objectId(client.user.gatewayId));
        if (!gateway) {
            throw new BadRequestException('Invalid gateway');
        }

        const count = await this.userDeviceSensorValueService.insertAsync(data);
        return {
            count,
        };
    }

    private getGatewaySocketId(gatewayId: string): string | null {
        if (!this.server.gateways) {
            return null;
        }

        return this.server.gateways[gatewayId];
    }
}
