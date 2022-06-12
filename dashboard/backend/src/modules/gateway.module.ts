import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayController } from 'controllers/gateway.controller';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { GatewaySchema } from 'dataLayer/entities/gateway.entity';
import { GatewayAuthorizationSchema } from 'dataLayer/entities/gatewayAuthorization.entity';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { GatewayAuthorizationRepository } from 'dataLayer/repositories/gatewayAuthorization.repository';
import { GatewayService } from 'services/gateway.service';
import { SharedModule } from './shared.module';
import { WorkspaceModule } from './workspace.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: SchemaConstants.Gateway, schema: GatewaySchema }]),
        MongooseModule.forFeature([{ name: SchemaConstants.GatewayAuthorization, schema: GatewayAuthorizationSchema }]),
        WorkspaceModule,
        SharedModule,
    ],
    controllers: [GatewayController],
    providers: [GatewayService, GatewayRepository, GatewayAuthorizationRepository],
    exports: [GatewayService, GatewayRepository, GatewayAuthorizationRepository],
})
export class GatewayModule {}
