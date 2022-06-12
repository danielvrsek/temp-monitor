import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth.module';
import { GatewayModule } from './modules/gateway.module';
import { UserModule } from './modules/user.module';
import { WeatherDataModule } from './modules/weatherData.module';
import { WorkspaceModule } from './modules/workspace.module';
import { CommandModule } from 'nestjs-command';
import { SeedCommand } from 'seed/seed.command';
import { SharedModule } from 'modules/shared.module';
import { ConfigurationProvider } from 'configuration/configuration';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule, SharedModule],
            useFactory: async (configProvider: ConfigurationProvider) => {
                return { uri: configProvider.getConfiguration().mongoDbUrl };
            },
            inject: [ConfigurationProvider],
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        SharedModule,
        AuthModule,
        UserModule,
        WeatherDataModule,
        WorkspaceModule,
        GatewayModule,
        CommandModule,
    ],
    providers: [SeedCommand, ConfigurationProvider],
    exports: [ConfigurationProvider],
})
export class AppModule {}
