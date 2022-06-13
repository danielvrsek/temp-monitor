import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    Put,
    Req,
    UnauthorizedException,
    Res,
    BadRequestException,
    Delete,
} from '@nestjs/common';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { CookieHelper } from 'utils/cookieHelper';
import { cookieOptions, Cookies } from 'common/cookies';
import { Workspace } from 'dataLayer/entities/workspace.entity';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';

import { WorkspaceService } from 'services/workspace.service';
import { ControllerBase } from './controllerBase';
import { UserRequest } from 'common/request';
import { objectId } from 'utils/schemaHelper';
import { Response } from 'express';
import { WorkspaceMembershipRepository } from 'dataLayer/repositories/workspaceMembership.repository';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { WorkspaceType } from 'dataLayer/entities/enums/workspaceType.enum';
import { TokenType } from 'shared/authorization';
import {
    AddUserToWorkspaceDto,
    CreateWorkspaceDto,
    SetCurrentWorkspaceDto,
    UserViewModel,
    WorkspaceViewModel,
} from 'shared/dto';
import { UserRole } from 'dataLayer/entities/enums/userRole.enum';
import { WorkspaceMapper } from 'mappers/workspace.mapper';
import { UserMapper } from 'mappers/user.mapper';
import { WorkspaceMembershipService } from 'services/workspaceMembership.service';

@Controller('workspaces')
@EnforceTokenType(TokenType.User)
@UseGuards(JwtAuthGuard, TokenTypeGuard)
export class WorkspaceController extends ControllerBase {
    constructor(
        private readonly workspaceMembershipRepository: WorkspaceMembershipRepository,
        private readonly workspaceMembershipService: WorkspaceMembershipService,
        private readonly workspaceRepository: WorkspaceRepository,
        private readonly workspaceService: WorkspaceService,
        private readonly userRepository: UserRepository,
        cookieHelper: CookieHelper
    ) {
        super(cookieHelper, workspaceRepository);
    }

    @Get()
    findAllAsync(): Promise<Workspace[]> {
        return this.workspaceRepository.findAllAsync();
    }

    @Get('user')
    async findAllForCurrentUserAsync(@Req() request: UserRequest<void>): Promise<WorkspaceViewModel[]> {
        const userId = objectId(request.user.userId);
        const memberships = await this.workspaceMembershipRepository.getAllMembershipsForUserAsync(userId);

        const data = await this.workspaceRepository.findAllByIdsAsync(memberships.map((x) => x.workspaceId));
        return data.map(WorkspaceMapper.mapToViewModel);
    }

    @Get('user/current')
    async getCurrentAsync(@Req() request: UserRequest<void>): Promise<WorkspaceViewModel> {
        const workspace = await this.getCurrentWorkspaceAsync(request);
        if (!workspace) {
            throw new UnauthorizedException('No workspace selected.');
        }

        return WorkspaceMapper.mapToViewModel(workspace);
    }

    @Put('user/current')
    async setCurrentAsync(
        @Body() body: SetCurrentWorkspaceDto,
        @Req() request: UserRequest<void>,
        @Res() response: Response
    ): Promise<void> {
        const availableWorkspaces = await this.workspaceRepository.findAllForUserAsync(objectId(request.user.userId));
        const workspace = availableWorkspaces.filter((x) => x._id.toString() == body.workspaceId)[0];
        if (!workspace) {
            throw new UnauthorizedException();
        }

        response.cookie(Cookies.CurrentWorkspace, workspace._id, cookieOptions);
        response.status(200);
        response.end();
    }

    @Get(':id')
    async findByIdAsync(@Param('id') id): Promise<WorkspaceViewModel> {
        const workspace = await this.workspaceRepository.findByIdAsync(id);
        return WorkspaceMapper.mapToViewModel(workspace);
    }

    @Get('current/users')
    async getAllUsersForWorkspaceAsync(@Req() request: UserRequest<void>): Promise<UserViewModel[]> {
        const workspace = await this.getCurrentWorkspaceAsync(request);
        if (!workspace) {
            throw new UnauthorizedException('No workspace selected.');
        }

        const memberships = await this.workspaceMembershipRepository.getAllMembershipsByWorkspaceAsync(workspace._id);
        const users = await this.userRepository.findAllByIdsAsync(memberships.map((x) => x.userId));
        return users.map(UserMapper.mapToViewModel);
    }

    @Post('current/users')
    async addUserToWorkspaceAsync(
        @Req() request: UserRequest<void>,
        @Body() dto: AddUserToWorkspaceDto
    ): Promise<void> {
        const workspace = await this.getCurrentWorkspaceAsync(request);
        if (!workspace) {
            throw new UnauthorizedException('No workspace selected.');
        }

        const user = await this.userRepository.findByUsernameAsync(dto.username);
        if (!user) {
            throw new BadRequestException('User does not exist');
        }

        await this.workspaceMembershipService.addUserToWorkspaceAsync(workspace._id, user._id, [UserRole.User]);
    }

    @Delete('current/users/:userId')
    async deleteUserFromWorkspaceAsync(@Req() request: UserRequest<void>, @Param('userId') userId): Promise<void> {
        const workspace = await this.getCurrentWorkspaceAsync(request);
        if (!workspace) {
            throw new UnauthorizedException('No workspace selected.');
        }

        if (!(await this.workspaceMembershipService.removeUserFromWorkspace(workspace._id, objectId(userId)))) {
            throw new BadRequestException();
        }
    }

    @Post()
    async createAsync(
        @Req() request: UserRequest<void>,
        @Body() createDto: CreateWorkspaceDto
    ): Promise<WorkspaceViewModel> {
        const user = await this.getCurrentUserAsync(request);
        const workspace = await this.workspaceService.createAsync(createDto, WorkspaceType.Private);
        await this.workspaceMembershipService.addUserToWorkspaceAsync(workspace._id, user._id, [UserRole.Admin]);

        return WorkspaceMapper.mapToViewModel(workspace);
    }
}
