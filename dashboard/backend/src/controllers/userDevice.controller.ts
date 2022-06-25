import { Body, Controller, Get, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { CookieHelper } from 'utils/cookieHelper';
import { objectId } from 'utils/schemaHelper';
import { ControllerBase } from './controllerBase';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { TokenType } from 'shared/authorization';
import { CreateUserDeviceDto, UserDeviceViewModel } from 'shared/dto';
import { UserDeviceRepository } from 'dataLayer/repositories/userDevice.repository';
import { UserDeviceMapper } from 'mappers/userDevice.mapper';
import { UserDeviceService } from 'services/userDevice.service';

@Controller('devices')
@EnforceTokenType(TokenType.User)
@UseGuards(JwtAuthGuard, TokenTypeGuard)
export class UserDeviceController extends ControllerBase {
    constructor(
        private readonly userDeviceRepository: UserDeviceRepository,
        private readonly userDeviceService: UserDeviceService,
        cookieHelper: CookieHelper,
        workspaceRepository: WorkspaceRepository
    ) {
        super(cookieHelper, workspaceRepository);
    }

    @Get('gateway/:gatewayId')
    async findAllByGatewayAsync(@Param('gatewayId') gatewayId: string): Promise<UserDeviceViewModel[]> {
        const data = await this.userDeviceRepository.findAllByGatewayIdAsync(objectId(gatewayId));
        return data.map(UserDeviceMapper.mapToViewModel);
    }

    @Get(':id')
    async findByIdAsync(@Param('id') id: string): Promise<UserDeviceViewModel> {
        const userDevice = await this.userDeviceRepository.findByIdAsync(objectId(id));
        if (!userDevice) {
            throw new NotFoundException();
        }

        return UserDeviceMapper.mapToViewModel(userDevice);
    }

    @Post()
    async createAsync(@Body() createDto: CreateUserDeviceDto): Promise<UserDeviceViewModel> {
        const device = await this.userDeviceService.createAsync(createDto);
        return UserDeviceMapper.mapToViewModel(device);
    }
}
