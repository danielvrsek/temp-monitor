import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Entities } from 'dataLayer/common/entities';
import { GatewaySchema } from 'dataLayer/entities/gateway.entity';
import { GatewayAuthorizationSchema } from 'dataLayer/entities/gatewayAuthorization.entity';
import { UserSchema } from 'dataLayer/entities/user.entity';
import { UserDeviceSchema } from 'dataLayer/entities/userDevice.entity';
import { WorkspaceSchema } from 'dataLayer/entities/workspace.entity';
import { WorkspaceMembershipSchema } from 'dataLayer/entities/workspaceMembership.entity';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { GatewayAuthorizationRepository } from 'dataLayer/repositories/gatewayAuthorization.repository';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { UserDeviceRepository } from 'dataLayer/repositories/userDevice.repository';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { WorkspaceMembershipRepository } from 'dataLayer/repositories/workspaceMembership.repository';
import { UnitOfWorkFactory } from 'dataLayer/unitOfWork';
import { UserDeviceSensorSchema } from 'dataLayer/entities/userDeviceSensor.entity';
import { UserDeviceSensorValueSchema } from 'dataLayer/entities/userDeviceSensorValue.entity';
import { UserDeviceSensorRepository } from 'dataLayer/repositories/userDeviceSensor.repository';
import { UserDeviceSensorValueRepository } from 'dataLayer/repositories/userDeviceSensorValue.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Entities.Gateway, schema: GatewaySchema }]),
        MongooseModule.forFeature([{ name: Entities.GatewayAuthorization, schema: GatewayAuthorizationSchema }]),
        MongooseModule.forFeature([{ name: Entities.User, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Entities.UserDevice, schema: UserDeviceSchema }]),
        MongooseModule.forFeature([{ name: Entities.UserDeviceSensor, schema: UserDeviceSensorSchema }]),
        MongooseModule.forFeature([{ name: Entities.UserDeviceSensorValue, schema: UserDeviceSensorValueSchema }]),
        MongooseModule.forFeature([{ name: Entities.Workspace, schema: WorkspaceSchema }]),
        MongooseModule.forFeature([{ name: Entities.WorkspaceMembership, schema: WorkspaceMembershipSchema }]),
    ],
    providers: [
        GatewayRepository,
        GatewayAuthorizationRepository,
        UserRepository,
        UserDeviceRepository,
        UserDeviceSensorRepository,
        UserDeviceSensorValueRepository,
        WorkspaceRepository,
        WorkspaceMembershipRepository,
        UnitOfWorkFactory,
    ],
    exports: [
        GatewayRepository,
        GatewayAuthorizationRepository,
        UserRepository,
        UserDeviceRepository,
        UserDeviceSensorRepository,
        UserDeviceSensorValueRepository,
        WorkspaceRepository,
        WorkspaceMembershipRepository,
        UnitOfWorkFactory,
    ],
})
export class DataLayerModule {}
