import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Req,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { CookieHelper } from 'utils/cookieHelper';
import { Gateway } from 'dataLayer/entities/gateway.entity';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { GatewayService } from 'services/gateway.service';
import { objectId } from 'utils/schemaHelper';
import { ControllerBase } from './controllerBase';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { UserRequest } from 'common/request';
import { TokenType } from 'shared/authorization';
import { CreateGatewayDto, CreateGatewayResult, GatewayViewModel } from 'shared/dto';
import { GatewayMapper } from 'mappers/gateway.mapper';

@Controller('gateways')
@EnforceTokenType(TokenType.User)
@UseGuards(JwtAuthGuard, TokenTypeGuard)
export class GatewayController extends ControllerBase {
    constructor(
        private readonly gatewayRepository: GatewayRepository,
        private readonly gatewayService: GatewayService,
        cookieHelper: CookieHelper,
        workspaceRepository: WorkspaceRepository
    ) {
        super(cookieHelper, workspaceRepository);
    }

    @Get()
    async findAllByWorkspaceAsync(@Req() request: UserRequest<void>): Promise<GatewayViewModel[]> {
        const workspace = await this.getCurrentWorkspaceAsync(request);
        const data = await this.gatewayService.getAllGatewaysForWorkspace(workspace._id);
        return data.map(GatewayMapper.mapToViewModel);
    }

    @Get(':id')
    async findByIdAsync(@Param('id') id: string): Promise<GatewayViewModel> {
        const gateway = await this.gatewayRepository.findByIdAsync(objectId(id));
        if (!gateway) {
            throw new NotFoundException();
        }

        return GatewayMapper.mapToViewModel(gateway);
    }

    @Post()
    async createAsync(
        @Req() request: UserRequest<void>,
        @Body() createDto: CreateGatewayDto
    ): Promise<CreateGatewayResult> {
        const workspace = await this.getCurrentWorkspaceAsync(request);
        // TODO: check user authorization for the workspace
        return await this.gatewayService.createAsync(workspace._id, createDto);
    }

    @Delete(':gatewayId/workspace')
    async deleteFromWorkspaceAsync(@Req() request: UserRequest<void>, @Param('gatewayId') gatewayId): Promise<void> {
        const workspace = await this.getCurrentWorkspaceAsync(request);
        if (!workspace) {
            throw new UnauthorizedException('No workspace selected.');
        }

        if (!(await this.gatewayService.removeFromWorkspace(workspace._id, objectId(gatewayId)))) {
            throw new BadRequestException();
        }
    }
}
