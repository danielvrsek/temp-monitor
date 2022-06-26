import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Events } from 'shared/websockets';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { TokenType } from 'shared/authorization';
import { GatewaySocket } from '../clientSocket';

@WebSocketGateway()
export class MainGateway {
    @WebSocketServer()
    server: Server & { gateways: { [id: string]: string } };

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @EnforceTokenType(TokenType.Gateway)
    @SubscribeMessage(Events.RegisterGateway)
    async registerGateway(@ConnectedSocket() client: GatewaySocket): Promise<void> {
        if (!client?.user?.gatewayId) {
            client.disconnect();
        }

        this.setGatewaySocketId(client.user.gatewayId, client.id);

        client.on(Events.Disconnect, () => {
            this.setGatewaySocketId(client.user.gatewayId, null);
            console.log('removed');
        });

        console.log('registered');
    }

    @SubscribeMessage(Events.ConnectionError)
    async logConnectError(@MessageBody() err: any): Promise<void> {
        console.log(err);
    }

    @SubscribeMessage(Events.Exception)
    async logException(@MessageBody() err: any): Promise<void> {
        console.log(err);
    }

    private setGatewaySocketId(gatewayId: string, socketId: string): void {
        if (!this.server.gateways) {
            this.server.gateways = {};
        }

        this.server.gateways[gatewayId] = socketId;
    }
}
