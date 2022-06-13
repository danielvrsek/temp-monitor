import { Module } from '@nestjs/common';
import { GatewayService } from 'services/gateway.service';
import { MicrosoftAuthorizationService } from 'services/microsoftAuthorizationService';
import { MicrosoftGraphApi } from 'services/microsoftGraphApi';
import { UserService } from 'services/user.service';
import { WeatherDataService } from 'services/weatherData.service';
import { WeatherDataGranularityService } from 'services/weatherDataGranularity.service';
import { WeatherDataIndexer } from 'services/weatherDataIndexer.service';
import { WeatherDataIterator } from 'services/weatherDataIterator.service';
import { WorkspaceService } from 'services/workspace.service';
import { WorkspaceMembershipService } from 'services/workspaceMembership.service';
import { AuthModule } from './auth.module';
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
        WeatherDataService,
        WeatherDataGranularityService,
        WeatherDataIndexer,
        WeatherDataIterator,
    ],
    exports: [
        GatewayService,
        UserService,
        WorkspaceService,
        WorkspaceMembershipService,
        MicrosoftAuthorizationService,
        MicrosoftGraphApi,
        WeatherDataService,
        WeatherDataGranularityService,
        WeatherDataIndexer,
        WeatherDataIterator,
    ],
})
export class ServicesModule {}
