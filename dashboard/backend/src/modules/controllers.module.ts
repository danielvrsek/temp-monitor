import { Module } from '@nestjs/common';
import { AuthController } from 'controllers/auth.controller';
import { ExternalAuthController } from 'controllers/externalAuth.controller';
import { GatewayController } from 'controllers/gateway.controller';
import { UserController } from 'controllers/user.controller';
import { WeatherDataController } from 'controllers/weatherData.controller';
import { WorkspaceController } from 'controllers/workspace.controller';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { GatewayAuthorizationRepository } from 'dataLayer/repositories/gatewayAuthorization.repository';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { WeatherDataRepository } from 'dataLayer/repositories/weatherData.repository';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { WorkspaceMembershipRepository } from 'dataLayer/repositories/workspaceMembership.repository';
import { AuthModule } from './auth.module';
import { DataLayerModule } from './dataLayer.module';
import { ServicesModule } from './services.module';
import { SharedModule } from './shared.module';

@Module({
    imports: [DataLayerModule, ServicesModule, AuthModule, SharedModule],
    controllers: [
        AuthController,
        ExternalAuthController,
        GatewayController,
        UserController,
        WeatherDataController,
        WorkspaceController,
    ],
})
export class ControllersModule {}
