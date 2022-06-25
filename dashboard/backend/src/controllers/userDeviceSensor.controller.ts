import { Body, Controller, Get, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { CookieHelper } from 'utils/cookieHelper';
import { objectId } from 'utils/schemaHelper';
import { ControllerBase } from './controllerBase';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { TokenType } from 'shared/authorization';
import {
    CreateUserDeviceDto,
    CreateUserDeviceSensorDto,
    UserDeviceSensorViewModel,
    UserDeviceViewModel,
} from 'shared/dto';
import { UserDeviceMapper } from 'mappers/userDevice.mapper';
import { UserDeviceSensorRepository } from 'dataLayer/repositories/userDeviceSensor.repository';
import { UserDeviceSensorService } from 'services/userDeviceSensor.service';
import { UserDeviceSensorMapper } from 'mappers/userDeviceSensor.mapper';

@Controller('device-sensors')
@EnforceTokenType(TokenType.User)
@UseGuards(JwtAuthGuard, TokenTypeGuard)
export class UserDeviceSensorController extends ControllerBase {
    constructor(
        private readonly userDeviceSensorRepository: UserDeviceSensorRepository,
        private readonly userDeviceSensorService: UserDeviceSensorService,
        cookieHelper: CookieHelper,
        workspaceRepository: WorkspaceRepository
    ) {
        super(cookieHelper, workspaceRepository);
    }

    @Get('device/:deviceId')
    async findAllByGatewayAsync(@Param('deviceId') deviceId: string): Promise<UserDeviceSensorViewModel[]> {
        const data = await this.userDeviceSensorRepository.findAllByUserDeviceIdAsync(objectId(deviceId));
        return data.map(UserDeviceSensorMapper.mapToViewModel);
    }

    @Get(':id')
    async findByIdAsync(@Param('id') id: string): Promise<UserDeviceViewModel> {
        const userDeviceSensor = await this.userDeviceSensorRepository.findByIdAsync(objectId(id));
        if (!userDeviceSensor) {
            throw new NotFoundException();
        }

        return UserDeviceSensorMapper.mapToViewModel(userDeviceSensor);
    }

    @Post()
    async createAsync(@Body() createDto: CreateUserDeviceSensorDto): Promise<UserDeviceSensorViewModel> {
        const device = await this.userDeviceSensorService.createAsync(createDto);
        return UserDeviceSensorMapper.mapToViewModel(device);
    }
}
