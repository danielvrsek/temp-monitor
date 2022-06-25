import { Module } from '@nestjs/common';
import { UserDeviceSensorValueGateway } from 'websockets/userDeviceSensor.gateway';
import { DataLayerModule } from './dataLayer.module';
import { ServicesModule } from './services.module';
import { SharedModule } from './shared.module';

@Module({
    imports: [DataLayerModule, ServicesModule, SharedModule],
    providers: [UserDeviceSensorValueGateway],
    exports: [UserDeviceSensorValueGateway],
})
export class WebSocketsModule {}
