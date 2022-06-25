import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Events } from 'shared/websockets';
import { InsertUserDataDto, UserDataQuery, UserDataViewModel } from 'shared/dto';
import { UserDataGroupRepository } from 'dataLayer/repositories/userDataGroup.repository';
import { UserDataRepository } from 'dataLayer/repositories/userData.repository';
import { UserDataService } from 'services/userData.service';
import { UserDataMapper } from 'mappers/userData.mapper';
import { objectId } from 'utils/schemaHelper';
import { UserDataGranularityService } from 'services/userDataGranularity.service';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { TokenType } from 'shared/authorization';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { GatewaySocket } from './clientSocket';

@WebSocketGateway()
export class UserDataGateway {
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly userDataGroupRepository: UserDataGroupRepository,
        private readonly userDataRepository: UserDataRepository,
        private readonly userDataService: UserDataService,
        private readonly userDataGranularityService: UserDataGranularityService,
        private readonly gatewayRepository: GatewayRepository
    ) {}

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @EnforceTokenType(TokenType.User)
    @SubscribeMessage(Events.QueryUserData)
    async queryUserData(@MessageBody() query: UserDataQuery): Promise<UserDataViewModel[]> {
        const dateFrom = new Date(query.dateFrom);
        const dateTo = new Date(query.dateTo);
        const gatewayId = objectId(query.gatewayId);
        let granularity = query.granularity;

        const group = (await this.userDataGroupRepository.findAllByGatewayIdAsync(gatewayId))[0];
        let data = await this.userDataRepository.findAllByGroupIdAsync(group._id, new Date(dateFrom), new Date(dateTo));
        if (data.length === 0) {
            return [];
        }

        data = this.userDataService.sort(data);
        let dataDto = data.map(UserDataMapper.mapToViewModel);

        if (granularity === 0 || isNaN(granularity)) {
            granularity = this.userDataGranularityService.calculateGranularity(dateFrom, dateTo);
        }

        return this.userDataGranularityService.transformByGranularity(dataDto, dateFrom, dateTo, granularity);
    }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @EnforceTokenType(TokenType.Gateway)
    @SubscribeMessage(Events.InsertUserData)
    async insertUserData(@ConnectedSocket() client: GatewaySocket, @MessageBody() data: InsertUserDataDto) {
        console.log(data);
        const gateway = await this.gatewayRepository.findByIdAsync(objectId(client.user.gatewayId));
        if (!gateway) {
            throw new BadRequestException('Invalid gateway');
        }

        const count = await this.userDataService.insertAsync(data);
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
