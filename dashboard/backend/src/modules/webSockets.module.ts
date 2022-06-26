import { Module } from '@nestjs/common';
import { MainGateway } from 'websockets/gateways/main.gateway';
import { UserDeviceSensorGateway } from 'websockets/gateways/userDeviceSensor.gateway';
import { DataLayerModule } from './dataLayer.module';
import { ServicesModule } from './services.module';
import { SharedModule } from './shared.module';

@Module({
    imports: [DataLayerModule, ServicesModule, SharedModule],
    providers: [MainGateway, UserDeviceSensorGateway],
    exports: [MainGateway, UserDeviceSensorGateway],
})
export class WebSocketsModule {}
