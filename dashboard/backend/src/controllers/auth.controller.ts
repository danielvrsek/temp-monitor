import {
    Controller,
    Req,
    Post,
    UseGuards,
    Res,
    Get,
    HttpCode,
    UnauthorizedException,
    Body,
    BadRequestException,
} from '@nestjs/common';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { LocalGatewayAuthGuard } from 'auth/guards/local-gateway.guard';
import { LocalUserAuthGuard } from 'auth/guards/local-user.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { cookieOptions, Cookies } from 'common/cookies';
import { UserRequest } from 'common/request';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { Response } from 'express';
import { AuthService } from 'services/auth.service';
import { CookieHelper } from 'utils/cookieHelper';
import { ControllerBase } from './controllerBase';
import { UserService } from '../services/user.service';
import { RegisterDto, UserInfo, WorkspaceInfo } from 'shared/dto';
import { TokenType } from 'shared/authorization';

@Controller('auth')
export class AuthController extends ControllerBase {
    constructor(
        private authService: AuthService,
        private userService: UserService,
        cookieHelper: CookieHelper,
        workspaceRepository: WorkspaceRepository,
        userRepository: UserRepository
    ) {
        super(cookieHelper, workspaceRepository, userRepository);
    }

    @Post('register')
    async registerAsync(@Res({ passthrough: true }) response: Response, @Body() payload: RegisterDto): Promise<void> {
        if (!(payload.email && payload.firstName && payload.lastname && payload.passwordRaw)) {
            throw new BadRequestException();
        }

        const user = await this.userService.createAsync({
            email: payload.email,
            username: payload.email,
            firstName: payload.firstName,
            lastname: payload.lastname,
            passwordRaw: payload.passwordRaw,
            isExternal: false,
            profilePhotoUrl: null,
        });

        const token = this.authService.generateToken({
            userId: user._id.toString(),
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastname: user.lastname,
            profilePhotoUrl: 'default.jpg',
            tokenType: TokenType.User,
        });

        response.cookie(Cookies.AuthCookie, token, cookieOptions);
        response.status(200);
        response.end();
    }

    @Post('login')
    @UseGuards(LocalUserAuthGuard)
    async loginAsync(@Req() request: UserRequest<void>, @Res({ passthrough: true }) response: Response): Promise<void> {
        const token = this.authService.generateToken(request.user);

        response.cookie(Cookies.AuthCookie, token, cookieOptions);
        response.status(200);
        response.end();
    }

    @Post('logout')
    @EnforceTokenType(TokenType.User)
    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    logout(@Res() response: Response): void {
        response.clearCookie(Cookies.AuthCookie, cookieOptions);
        response.clearCookie(Cookies.CurrentWorkspace, cookieOptions);
        response.statusCode = 200;
        response.end();
    }

    @Get('user-info')
    @EnforceTokenType(TokenType.User)
    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    async getUserInfoAsync(@Req() request: UserRequest<void>): Promise<UserInfo> {
        return request.user;
    }

    @Get('workspace-info')
    @EnforceTokenType(TokenType.User)
    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    async getWorkspaceInfoAsync(@Req() request: UserRequest<void>): Promise<WorkspaceInfo> {
        const workspace = await this.getCurrentWorkspaceAsync(request);
        if (!workspace) {
            throw new UnauthorizedException();
        }

        const user = await this.getCurrentUserAsync(request);
        return {
            workspaceId: workspace._id.toString(),
            name: workspace.name,
            roles: await this.authService.getUserRolesForWorkspaceAsync(user._id, workspace._id),
        };
    }

    @HttpCode(200)
    @Post('gateway/authorize')
    @UseGuards(LocalGatewayAuthGuard)
    authorizeGateway(@Req() request: UserRequest<void>): { token: string } {
        return { token: this.authService.generateToken(request.user) };
    }
}
