import { Module } from '@nestjs/common';
import { UserDataGateway } from 'websockets/userData.gateway';
import { DataLayerModule } from './dataLayer.module';
import { ServicesModule } from './services.module';
import { SharedModule } from './shared.module';

@Module({
    imports: [DataLayerModule, ServicesModule, SharedModule],
    providers: [UserDataGateway],
    exports: [UserDataGateway],
})
export class WebSocketsModule {}
