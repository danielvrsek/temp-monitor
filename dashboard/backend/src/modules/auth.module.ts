import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthConstants } from 'auth/common/authConstants';
import { UserModule } from './user.module';
import { LocalUserStrategy } from 'auth/strategies/localUser.strategy';
import { JwtStrategy } from 'auth/strategies/jwt.strategy';
import { AuthService } from 'services/auth.service';
import { AuthController } from 'controllers/auth.controller';
import { GatewayModule } from './gateway.module';
import { LocalGatewayStrategy } from 'auth/strategies/localGateway.strategy';
import { SharedModule } from './shared.module';
import { WorkspaceModule } from './workspace.module';
import { MicrosoftAuthorizationService } from 'services/microsoftAuthorizationService';
import { ExternalAuthController } from 'controllers/externalAuth.controller';
import { MicrosoftGraphApi } from 'services/microsoftGraphApi';

@Module({
    imports: [
        UserModule,
        GatewayModule,
        PassportModule,
        JwtModule.register({
            secret: AuthConstants.JwtSecret,
            signOptions: { expiresIn: '240s' },
        }),
        SharedModule,
        WorkspaceModule,
    ],
    controllers: [AuthController, ExternalAuthController],
    providers: [
        AuthService,
        LocalUserStrategy,
        LocalGatewayStrategy,
        JwtStrategy,
        MicrosoftGraphApi,
        MicrosoftAuthorizationService,
    ],
    exports: [AuthService],
})
export class AuthModule {}
