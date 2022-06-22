import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationProvider } from 'configuration/configuration';
import { AssetService } from 'services/assetService';
import { CookieHelper } from 'utils/cookieHelper';
import { CryptoHelper } from 'utils/cryptoHelper';
import { HttpHelper } from 'utils/httpHelper';

@Module({
    imports: [ConfigModule],
    providers: [CookieHelper, CryptoHelper, HttpHelper, AssetService, ConfigurationProvider],
    exports: [CookieHelper, CryptoHelper, HttpHelper, AssetService, ConfigurationProvider],
})
export class SharedModule {}
