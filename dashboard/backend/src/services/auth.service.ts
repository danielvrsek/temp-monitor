import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cookies } from 'common/cookies';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { GatewayAuthorizationRepository } from 'dataLayer/repositories/gatewayAuthorization.repository';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { WorkspaceMembershipRepository } from 'dataLayer/repositories/workspaceMembership.repository';
import { comparePasswords } from 'utils/bcrypt';
import { objectId } from 'utils/schemaHelper';
import { Types } from 'mongoose';
import { GatewayService } from './gateway.service';
import { GatewayInfo, UserInfo, UserRoleDto } from 'shared/src/dto';
import { TokenType } from 'shared/src/authorization';
import { GatewayState } from 'dataLayer/entities/enums/gatewayState.enum';
import { UserRole } from 'dataLayer/entities/enums/userRole.enum';
import { GatewayMapper } from 'mappers/gateway.mapper';
import { UserMapper } from 'mappers/user.mapper';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly gatewayService: GatewayService,
        private readonly gatewayRepository: GatewayRepository,
        private readonly gatewayAuthorizationRepository: GatewayAuthorizationRepository,
        private readonly workspaceMembershipRepository: WorkspaceMembershipRepository,
        private readonly jwtService: JwtService
    ) {}

    async validateUserAsync(username: string, password: string): Promise<UserInfo> {
        const user = await this.userRepository.findByUsernameAsync(username);
        if (!user) {
            return null;
        }

        const matched = comparePasswords(password, user.passwordHash);
        if (!matched) {
            // TODO: move to controller
            throw new HttpException('Login failed.', HttpStatus.FORBIDDEN);
        }

        return {
            userId: user._id.toString(),
            firstName: user.firstName,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            tokenType: TokenType.User,
            profilePhotoUrl: user.profilePhotoUrl ? user.profilePhotoUrl : 'default.jpg',
        };
    }

    async validateGatewayAsync(workspaceId: string, secret: string): Promise<GatewayInfo> {
        const authorization = await this.gatewayAuthorizationRepository.findBySecretAsync(
            objectId(workspaceId),
            secret
        );
        if (!authorization) {
            throw new UnauthorizedException();
        }

        const gateway = await this.gatewayRepository.findByIdAsync(authorization.gatewayId);
        await this.gatewayService.updateAsync(gateway._id, {
            state: GatewayMapper.mapGatewayStateToDto(GatewayState.Registered),
        });

        return {
            gatewayId: gateway._id.toString(),
            workspaceId: workspaceId,
            tokenType: TokenType.Gateway,
        };
    }

    getCurrentUserWorkspace(request) {
        return request.cookies[Cookies.CurrentWorkspace];
    }

    generateToken(data: UserInfo | GatewayInfo) {
        return this.jwtService.sign(data);
    }

    async getUserRolesForWorkspaceAsync(userId: Types.ObjectId, workspaceId: Types.ObjectId): Promise<UserRoleDto[]> {
        const membership = await this.workspaceMembershipRepository.getMembershipForUserByWorkspaceAsync(
            userId,
            workspaceId
        );
        return membership ? membership.roles.map(UserMapper.mapUserRoleToDto) : [];
    }
}
