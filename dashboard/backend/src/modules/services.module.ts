import { Module } from '@nestjs/common';
import { GatewayService } from 'services/gateway.service';
import { MicrosoftAuthorizationService } from 'services/microsoftAuthorizationService';
import { MicrosoftGraphApi } from 'services/microsoftGraphApi';
import { UserService } from 'services/user.service';
import { UserDeviceSensorValueGranularityService } from 'services/userDeviceSensorValueGranularity.service';
import { UserDeviceService } from 'services/userDevice.service';
import { UserDeviceSensorValueIndexer } from 'services/userDeviceSensorValueIndexer.service';
import { UserDeviceSensorValueIterator } from 'services/userDeviceSensorValueIterator.service';
import { UserDeviceSensorValueService } from 'services/userDeviceSensorValue.service';
import { WorkspaceService } from 'services/workspace.service';
import { WorkspaceMembershipService } from 'services/workspaceMembership.service';
import { DataLayerModule } from './dataLayer.module';
import { SharedModule } from './shared.module';

@Module({
    imports: [DataLayerModule, SharedModule],
    providers: [
        GatewayService,
        UserService,
        WorkspaceService,
        WorkspaceMembershipService,
        MicrosoftAuthorizationService,
        MicrosoftGraphApi,
        UserDeviceService,
        UserDeviceSensorValueService,
        UserDeviceSensorValueGranularityService,
        UserDeviceSensorValueIndexer,
        UserDeviceSensorValueIterator,
    ],
    exports: [
        GatewayService,
        UserService,
        WorkspaceService,
        WorkspaceMembershipService,
        MicrosoftAuthorizationService,
        MicrosoftGraphApi,
        UserDeviceService,
        UserDeviceSensorValueService,
        UserDeviceSensorValueGranularityService,
        UserDeviceSensorValueIndexer,
        UserDeviceSensorValueIterator,
    ],
})
export class ServicesModule {}
