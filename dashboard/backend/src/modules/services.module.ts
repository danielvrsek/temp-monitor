import { Module } from '@nestjs/common';
import { GatewayService } from 'services/gateway.service';
import { MicrosoftAuthorizationService } from 'services/microsoftAuthorizationService';
import { MicrosoftGraphApi } from 'services/microsoftGraphApi';
import { UserService } from 'services/user.service';
import { UserDataService } from 'services/userData.service';
import { UserDataGranularityService } from 'services/userDataGranularity.service';
import { UserDataGroupService } from 'services/userDataGroup.service';
import { UserDataIndexer } from 'services/userDataIndexer.service';
import { UserDataIterator } from 'services/userDataIterator.service';
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
        UserDataService,
        UserDataGroupService,
        UserDataGranularityService,
        UserDataIndexer,
        UserDataIterator,
    ],
    exports: [
        GatewayService,
        UserService,
        WorkspaceService,
        WorkspaceMembershipService,
        MicrosoftAuthorizationService,
        MicrosoftGraphApi,
        UserDataService,
        UserDataGroupService,
        UserDataGranularityService,
        UserDataIndexer,
        UserDataIterator,
    ],
})
export class ServicesModule {}
