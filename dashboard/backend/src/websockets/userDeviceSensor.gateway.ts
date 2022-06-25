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
import { GatewaySocket } from './clientSocket';
import { UserDeviceSensorValueRepository } from 'dataLayer/repositories/userDeviceSensorValue.repository';
import { UserDeviceSensorValueService } from 'services/userDeviceSensorValue.service';
import { InsertUserDeviceSensorDataDto, UserDeviceSensorValueDto, UserDeviceSensorValueQuery } from 'shared/dto';

@WebSocketGateway()
export class UserDeviceSensorValueGateway {
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly userDeviceSensorValueRepository: UserDeviceSensorValueRepository,
        private readonly userDeviceSensorValueService: UserDeviceSensorValueService,
        private readonly userDeviceSensorValueGranularityService: UserDeviceSensorValueGranularityService,
        private readonly gatewayRepository: GatewayRepository
    ) {}

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @EnforceTokenType(TokenType.User)
    @SubscribeMessage(Events.QueryUserDeviceSensorData)
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
    @SubscribeMessage(Events.InsertUserDeviceSensorData)
    async insertUserDeviceSensorData(
        @ConnectedSocket() client: GatewaySocket,
        @MessageBody() data: InsertUserDeviceSensorDataDto
    ) {
        console.log(data);
        const gateway = await this.gatewayRepository.findByIdAsync(objectId(client.user.gatewayId));
        if (!gateway) {
            throw new BadRequestException('Invalid gateway');
        }

        const count = await this.userDeviceSensorValueService.insertAsync(data);
        return {
            count,
        };
    }

    @SubscribeMessage(Events.ConnectionError)
    async logConnectError(@MessageBody() err: any): Promise<void> {
        console.log(err);
    }

    @SubscribeMessage(Events.Exception)
    async logException(@MessageBody() err: any): Promise<void> {
        console.log(err);
    }
}
