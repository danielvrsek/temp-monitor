import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthConstants } from 'auth/common/authConstants';
import { LocalUserStrategy } from 'auth/strategies/localUser.strategy';
import { JwtStrategy } from 'auth/strategies/jwt.strategy';
import { AuthService } from 'auth/auth.service';
import { LocalGatewayStrategy } from 'auth/strategies/localGateway.strategy';
import { SharedModule } from './shared.module';
import { MicrosoftAuthorizationService } from 'services/microsoftAuthorizationService';
import { MicrosoftGraphApi } from 'services/microsoftGraphApi';
import { DataLayerModule } from './dataLayer.module';
import { ServicesModule } from './services.module';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: AuthConstants.JwtSecret,
            signOptions: { expiresIn: '240s' },
        }),
        DataLayerModule,
        ServicesModule,
        SharedModule,
    ],
    providers: [
        JwtService,
        LocalUserStrategy,
        LocalGatewayStrategy,
        JwtStrategy,
        MicrosoftGraphApi,
        MicrosoftAuthorizationService,
        AuthService,
    ],
    exports: [AuthService],
})
export class AuthModule {}
