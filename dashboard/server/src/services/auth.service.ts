import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from 'auth/common/tokenType';
import { Cookies } from 'common/cookies';
import { GatewayState } from 'dataLayer/entities/enums/gatewayState.enum';
import { UserRole } from 'dataLayer/entities/enums/role.enum';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { GatewayAuthorizationRepository } from 'dataLayer/repositories/gatewayAuthorization.repository';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { WorkspaceMembershipRepository } from 'dataLayer/repositories/workspaceMembership.repository';
import { comparePasswords } from 'utils/bcrypt';
import { objectId } from 'utils/schemaHelper';
import { GatewayInfo } from './dto/gateway.dto';
import { UserInfo } from './dto/user.dto';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
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
        if (gateway.state != GatewayState.Created) {
            throw new BadRequestException();
        }

        gateway.state = GatewayState.Registered;

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

    async getUserRolesForWorkspaceAsync(userId: Types.ObjectId, workspaceId: Types.ObjectId): Promise<UserRole[]> {
        const memberships = await this.workspaceMembershipRepository.getMembershipsForUserByWorkspaceAsync(
            userId,
            workspaceId
        );
        return memberships.roles;
    }
}
