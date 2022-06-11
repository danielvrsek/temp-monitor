import { Controller, Get, Post, Body, Param, UseGuards, Req, BadRequestException, Query } from '@nestjs/common';
import { TokenType } from 'auth/common/tokenType';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { CookieHelper } from 'utils/cookieHelper';
import { WeatherDataRepository } from 'dataLayer/repositories/weatherData.repository';
import { WeatherDataService } from 'services/weatherData.service';
import { objectId } from 'utils/schemaHelper';
import { ControllerBase } from './controllerBase';
import { InsertWeatherDataDto, InsertWeatherDataResponse, WeatherDataDto } from 'services/dto/weatherData.dto';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { GatewayRequest } from 'common/request';
import { WeatherDataGranularityService } from 'services/weatherDataGranularity.service';

@Controller('weather-data')
@UseGuards(JwtAuthGuard, TokenTypeGuard)
export class WeatherDataController extends ControllerBase {
    constructor(
        private readonly weatherDataGranuralityService: WeatherDataGranularityService,
        private readonly weatherDataRepository: WeatherDataRepository,
        private readonly weatherDataService: WeatherDataService,
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
    ): Promise<WeatherDataDto[]> {
        const dateFrom = new Date(dateFromString);
        const dateTo = new Date(dateToString);

        let data = await this.weatherDataRepository.findAllByGatewayIdAsync(gatewayId, dateFrom, dateTo);
        data = this.weatherDataService.sortWeatherData(data);
        let dataDto = this.weatherDataService.mapToWeatherDataDto(data);

        let granularity = granularityString ? parseInt(granularityString) : 0;
        if (granularity === 0 || isNaN(granularity)) {
            granularity = this.weatherDataGranuralityService.calculateGranularity(dateFrom, dateTo);
        }

        dataDto = this.weatherDataGranuralityService.transformByGranularity(dataDto, dateFrom, dateTo, granularity);

        return dataDto;
    }

    @Post()
    @EnforceTokenType(TokenType.Gateway)
    async insertAsync(
        @Req() request: GatewayRequest<void>,
        @Body() insertDto: InsertWeatherDataDto
    ): Promise<InsertWeatherDataResponse> {
        const gateway = await this.gatewayRepository.findByIdAsync(objectId(request.user.gatewayId));
        if (!gateway) {
            throw new BadRequestException('Invalid gateway');
        }

        const count = await this.weatherDataService.insertAsync(gateway._id, insertDto);
        return {
            count,
        };
    }
}
