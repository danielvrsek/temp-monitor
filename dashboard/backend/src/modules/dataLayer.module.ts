import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { GatewaySchema } from 'dataLayer/entities/gateway.entity';
import { GatewayAuthorizationSchema } from 'dataLayer/entities/gatewayAuthorization.entity';
import { UserSchema } from 'dataLayer/entities/user.entity';
import { WeatherDataSchema } from 'dataLayer/entities/weatherData.entity';
import { WorkspaceSchema } from 'dataLayer/entities/workspace.entity';
import { WorkspaceMembershipSchema } from 'dataLayer/entities/workspaceMembership.entity';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { GatewayAuthorizationRepository } from 'dataLayer/repositories/gatewayAuthorization.repository';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { WeatherDataRepository } from 'dataLayer/repositories/weatherData.repository';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { WorkspaceMembershipRepository } from 'dataLayer/repositories/workspaceMembership.repository';
import { UnitOfWorkFactory } from 'dataLayer/unitOfWork';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: SchemaConstants.Gateway, schema: GatewaySchema }]),
        MongooseModule.forFeature([{ name: SchemaConstants.GatewayAuthorization, schema: GatewayAuthorizationSchema }]),
        MongooseModule.forFeature([{ name: SchemaConstants.User, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: SchemaConstants.WeatherData, schema: WeatherDataSchema }]),
        MongooseModule.forFeature([{ name: SchemaConstants.Workspace, schema: WorkspaceSchema }]),
        MongooseModule.forFeature([{ name: SchemaConstants.WorkspaceMembership, schema: WorkspaceMembershipSchema }]),
    ],
    providers: [
        GatewayRepository,
        GatewayAuthorizationRepository,
        UserRepository,
        WeatherDataRepository,
        WorkspaceRepository,
        WorkspaceMembershipRepository,
        UnitOfWorkFactory,
    ],
    exports: [
        GatewayRepository,
        GatewayAuthorizationRepository,
        UserRepository,
        WeatherDataRepository,
        WorkspaceRepository,
        WorkspaceMembershipRepository,
        UnitOfWorkFactory,
    ],
})
export class DataLayerModule {}
