import { Module } from '@nestjs/common';
import { AuthController } from 'controllers/auth.controller';
import { ExternalAuthController } from 'controllers/externalAuth.controller';
import { GatewayController } from 'controllers/gateway.controller';
import { UserController } from 'controllers/user.controller';
import { UserDeviceController } from 'controllers/userDevice.controller';
import { UserDeviceSensorController } from 'controllers/userDeviceSensor.controller';
import { WorkspaceController } from 'controllers/workspace.controller';
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
        UserDeviceController,
        UserDeviceSensorController,
        WorkspaceController,
    ],
})
export class ControllersModule {}
