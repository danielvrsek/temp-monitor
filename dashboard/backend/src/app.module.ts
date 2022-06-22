import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedCommand } from 'seed/seed.command';
import { SharedModule } from 'modules/shared.module';
import { ConfigurationProvider } from 'configuration/configuration';
import { DataLayerModule } from 'modules/dataLayer.module';
import { ServicesModule } from 'modules/services.module';
import { ControllersModule } from 'modules/controllers.module';
import { AuthModule } from 'modules/auth.module';

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
        DataLayerModule,
        ServicesModule,
        AuthModule,
        ControllersModule,
        SharedModule,
    ],
    providers: [SeedCommand],
})
export class AppModule {}
