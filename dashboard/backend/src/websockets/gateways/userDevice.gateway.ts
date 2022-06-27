import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Events } from 'shared/websockets';
import { UserDeviceRepository } from 'dataLayer/repositories/userDevice.repository';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { TokenType } from 'shared/authorization';
import { UserDeviceSensorRepository } from 'dataLayer/repositories/userDeviceSensor.repository';
import { GatewaySocket } from 'websockets/clientSocket';
import { objectId } from 'utils/schemaHelper';
import {
    CreateUserDeviceDto,
    UserDeviceAvailableViewModel,
    UserDeviceRegisteredViewModel,
    UserDeviceViewModel,
} from 'shared/dto';
import { UserDeviceSensorMapper } from 'mappers/userDeviceSensor.mapper';
import { UserDeviceService } from 'services/userDevice.service';
import { UserDeviceMapper } from 'mappers/userDevice.mapper';

@WebSocketGateway()
export class UserDeviceGateway {
    @WebSocketServer()
    server: Server & { gateways: { [id: string]: string } };

    constructor(
        private readonly userDeviceService: UserDeviceService,
        private readonly userDeviceRepository: UserDeviceRepository,
        private readonly userDeviceSensorRepository: UserDeviceSensorRepository
    ) {}

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @EnforceTokenType(TokenType.User)
    @SubscribeMessage(Events.CreateUserDevice)
    async createDeviceAsync(@MessageBody() dto: CreateUserDeviceDto): Promise<UserDeviceViewModel> {
        const device = await this.userDeviceService.createAsync(dto);
        return UserDeviceMapper.mapToViewModel(device);
    }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @EnforceTokenType(TokenType.User)
    @SubscribeMessage(Events.DeleteUserDevice)
    async deleteDeviceAsync(@MessageBody() userDeviceId: string): Promise<UserDeviceViewModel> {
        const device = await this.userDeviceService.deleteAsync(userDeviceId);
        return UserDeviceMapper.mapToViewModel(device);
    }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @EnforceTokenType(TokenType.User)
    @SubscribeMessage(Events.QueryAvailableDevices)
    async queryAvailableDevicesAsync(@MessageBody() gatewayId: string): Promise<string | null> {
        const socketId = this.getGatewaySocketId(gatewayId);
        if (!socketId) {
            return null;
        }

        const currentDevices = await this.userDeviceRepository.findAllByGatewayIdAsync(objectId(gatewayId));

        return new Promise<string>((resolve, reject) => {
            this.server.sockets
                .to(socketId)
                .timeout(1000)
                .emit('gateway/getAvailableDevices', (_, response) => {
                    const result = response[0].filter(
                        (x) => !currentDevices.some((device) => device.externalId === x.identifier)
                    );

                    resolve(result);
                });
        });
    }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @EnforceTokenType(TokenType.Gateway)
    @SubscribeMessage(Events.QueryRegisteredDevices)
    async queryRegisteredDevicesAsync(
        @ConnectedSocket() client: GatewaySocket
    ): Promise<UserDeviceRegisteredViewModel[]> {
        const gatewayId = client.user.gatewayId;

        const devices: Promise<UserDeviceRegisteredViewModel>[] = (
            await this.userDeviceRepository.findAllByGatewayIdAsync(objectId(gatewayId))
        ).map(async (device) => {
            return {
                id: device._id.toString(),
                name: device.name,
                externalId: device.externalId,
                createdAt: device.createdAt,
                sensors: (await this.userDeviceSensorRepository.findAllByDeviceIdAsync(device._id)).map(
                    UserDeviceSensorMapper.mapToViewModel
                ),
            };
        });

        return await Promise.all(devices);
    }

    private getGatewaySocketId(gatewayId: string): string | null {
        if (!this.server.gateways) {
            return null;
        }

        return this.server.gateways[gatewayId];
    }
}
