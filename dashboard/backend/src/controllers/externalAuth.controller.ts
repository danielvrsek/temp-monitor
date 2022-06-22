import { Controller, Req, Res, Get, Query } from '@nestjs/common';
import { UserRequest } from 'common/request';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { Response } from 'express';
import { CookieHelper } from 'utils/cookieHelper';
import { ControllerBase } from './controllerBase';
import { HttpHelper } from 'utils/httpHelper';
import { ConfigurationProvider } from 'configuration/configuration';
import { MicrosoftAuthorizationService } from 'services/microsoftAuthorizationService';
import { MicrosoftGraphApi } from 'services/microsoftGraphApi';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { UserService } from 'services/user.service';
import { AuthService } from 'auth/auth.service';
import { cookieOptions, Cookies } from 'common/cookies';
import { AssetService } from 'services/assetService';
import * as msal from '@azure/msal-node';
import { TokenType } from 'shared/authorization';

@Controller('external-auth')
export class ExternalAuthController extends ControllerBase {
    constructor(
        private microsoftGraphApi: MicrosoftGraphApi,
        private microsoftAuthorizationService: MicrosoftAuthorizationService,
        private configurationProvider: ConfigurationProvider,
        private userRepository: UserRepository,
        private assetService: AssetService,
        private userService: UserService,
        private authService: AuthService,
        private httpHelper: HttpHelper,
        cookieHelper: CookieHelper,
        workspaceRepository: WorkspaceRepository
    ) {
        super(cookieHelper, workspaceRepository);
    }

    @Get('microsoft-login')
    async loginExternalAsync(@Req() request: UserRequest<void>, @Res() res: Response): Promise<void> {
        const config = this.configurationProvider.getConfiguration();
        const authCodeUrlParameters = {
            scopes: config.auth.microsoft.requiredScopes,
            redirectUri: this.#getExternalLoginCallbackUrl(request),
        };

        let response;
        try {
            // get url to sign user in and consent to scopes needed for application
            response = await this.microsoftAuthorizationService.getAuthCodeUrl(authCodeUrlParameters);
        } catch (error) {
            console.log(JSON.stringify(error));
            res.sendStatus(500);
            return;
        }

        res.redirect(response);
    }

    // 2nd leg of auth code flow: exchange code for token
    @Get('microsoft-login-callback')
    async loginExternalCallbackAsync(
        @Req() request: UserRequest<void>,
        @Res() response: Response,
        @Query('code') code
    ): Promise<void> {
        const config = this.configurationProvider.getConfiguration();
        const tokenRequest = {
            redirectUri: this.#getExternalLoginCallbackUrl(request),
            scopes: config.auth.microsoft.requiredScopes,
            code,
        };

        let result: msal.AuthenticationResult;
        try {
            result = await this.microsoftAuthorizationService.acquireTokenByCode(tokenRequest);
        } catch (error) {
            console.log(error);
            response.sendStatus(500);
            return;
        }

        const { homeAccountId, username } = result.account;
        const { givenName, surname, mail } = await this.microsoftGraphApi.getUserDetailsAsync(homeAccountId);

        const photoBlob = await this.microsoftGraphApi.getUserPhotoAsync(homeAccountId);
        const profilePhotoUrl = await this.assetService.saveProfilePhotoAsync(`${homeAccountId}.jpg`, photoBlob);

        let user = await this.userRepository.findByUsernameAsync(username);
        if (!user) {
            user = await this.userService.createAsync({
                firstName: givenName,
                lastname: surname,
                username,
                email: mail,
                profilePhotoUrl,
                isExternal: true,
                passwordRaw: null,
            });
        }

        const token = this.authService.generateToken({
            userId: user._id.toString(),
            firstName: user.firstName,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
            tokenType: TokenType.User,
            profilePhotoUrl,
        });
        response.cookie(Cookies.AuthCookie, token, cookieOptions);

        response.redirect(this.configurationProvider.getConfiguration().webUrl);
    }

    #getExternalLoginCallbackUrl(req) {
        return `${this.httpHelper.getServerUrl(req)}/external-auth/microsoft-login-callback`;
    }
}
