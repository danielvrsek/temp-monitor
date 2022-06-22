import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Entities } from 'dataLayer/common/schemaConstants';
import { GatewaySchema } from 'dataLayer/entities/gateway.entity';
import { GatewayAuthorizationSchema } from 'dataLayer/entities/gatewayAuthorization.entity';
import { UserSchema } from 'dataLayer/entities/user.entity';
import { UserDataSchema } from 'dataLayer/entities/userData.entity';
import { WorkspaceSchema } from 'dataLayer/entities/workspace.entity';
import { WorkspaceMembershipSchema } from 'dataLayer/entities/workspaceMembership.entity';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { GatewayAuthorizationRepository } from 'dataLayer/repositories/gatewayAuthorization.repository';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { UserDataRepository } from 'dataLayer/repositories/userData.repository';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { WorkspaceMembershipRepository } from 'dataLayer/repositories/workspaceMembership.repository';
import { UnitOfWorkFactory } from 'dataLayer/unitOfWork';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Entities.Gateway, schema: GatewaySchema }]),
        MongooseModule.forFeature([{ name: Entities.GatewayAuthorization, schema: GatewayAuthorizationSchema }]),
        MongooseModule.forFeature([{ name: Entities.User, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Entities.UserData, schema: UserDataSchema }]),
        MongooseModule.forFeature([{ name: Entities.Workspace, schema: WorkspaceSchema }]),
        MongooseModule.forFeature([{ name: Entities.WorkspaceMembership, schema: WorkspaceMembershipSchema }]),
    ],
    providers: [
        GatewayRepository,
        GatewayAuthorizationRepository,
        UserRepository,
        UserDataRepository,
        WorkspaceRepository,
        WorkspaceMembershipRepository,
        UnitOfWorkFactory,
    ],
    exports: [
        GatewayRepository,
        GatewayAuthorizationRepository,
        UserRepository,
        UserDataRepository,
        WorkspaceRepository,
        WorkspaceMembershipRepository,
        UnitOfWorkFactory,
    ],
})
export class DataLayerModule {}
