import { Controller, Get, Post, Body, Param, UseGuards, Req, BadRequestException, Query } from '@nestjs/common';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { CookieHelper } from 'utils/cookieHelper';
import { UserDataRepository } from 'dataLayer/repositories/userData.repository';
import { UserDataService } from 'services/userData.service';
import { objectId } from 'utils/schemaHelper';
import { ControllerBase } from './controllerBase';
import { InsertUserDataDto, InsertUserDataResponse, UserDataViewModel } from 'shared/dto';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { GatewayRequest } from 'common/request';
import { UserDataGranularityService } from 'services/userDataGranularity.service';
import { TokenType } from 'shared/authorization';
import { UserDataMapper } from 'mappers/userData.mapper';

@Controller('data')
@UseGuards(JwtAuthGuard, TokenTypeGuard)
export class UserDataController extends ControllerBase {
    constructor(
        private readonly userDataGranuralityService: UserDataGranularityService,
        private readonly userDataRepository: UserDataRepository,
        private readonly userDataService: UserDataService,
        private readonly gatewayRepository: GatewayRepository,
        workspaceRepository: WorkspaceRepository,
        cookieHelper: CookieHelper
    ) {
        super(cookieHelper, workspaceRepository);
    }

    @Get('gateway/:gatewayId')
    @EnforceTokenType(TokenType.User)
    async findByGatewayIdAsync(
        @Param('gatewayId') gatewayId,
        @Query('dateFrom') dateFromString?: string,
        @Query('dateTo') dateToString?: string,
        @Query('granularity') granularityString?: string
    ): Promise<UserDataViewModel[]> {
        const dateFrom = new Date(dateFromString);
        const dateTo = new Date(dateToString);

        let data = await this.userDataRepository.findAllByGatewayIdAsync(gatewayId, dateFrom, dateTo);
        if (data.length === 0) {
            return [];
        }

        data = this.userDataService.sort(data);
        let dataDto = data.map(UserDataMapper.mapToViewModel);

        let granularity = granularityString ? parseInt(granularityString) : 0;
        if (granularity === 0 || isNaN(granularity)) {
            granularity = this.userDataGranuralityService.calculateGranularity(dateFrom, dateTo);
        }

        return this.userDataGranuralityService.transformByGranularity(dataDto, dateFrom, dateTo, granularity);
    }

    @Post()
    @EnforceTokenType(TokenType.Gateway)
    async insertAsync(
        @Req() request: GatewayRequest<void>,
        @Body() insertDto: InsertUserDataDto
    ): Promise<InsertUserDataResponse> {
        const gateway = await this.gatewayRepository.findByIdAsync(objectId(request.user.gatewayId));
        if (!gateway) {
            throw new BadRequestException('Invalid gateway');
        }

        const count = await this.userDataService.insertAsync(gateway._id, insertDto);
        return {
            count,
        };
    }
}
