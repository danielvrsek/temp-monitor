import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './env';

@Injectable()
export class ConfigurationProvider {
    constructor(private readonly configService: ConfigService) {}

    getConfiguration(): Configuration {
        return {
            mongoDbUrl: this.#getString(Environment.mongoDbUrl),
            apiUrl: this.#getString(Environment.apiUrl),
            webUrl: this.#getString(Environment.webUrl),
            auth: {
                microsoft: {
                    authority: this.#getString(Environment.authMicrosoftAuthority),
                    clientId: this.#getString(Environment.authMicrosoftClientId),
                    clientSecret: this.#getString(Environment.authMicrosoftSecret),
                    requiredScopes: this.#getStringArray(Environment.authMicrosoftScopes),
                },
            },
        };
    }

    #getString(name): string {
        return this.configService.get<string>(name);
    }

    #getStringArray(name): string[] {
        return JSON.parse(this.configService.get<string>(name));
    }
}

interface Configuration {
    mongoDbUrl: string;
    apiUrl: string;
    webUrl: string;
    auth: AuthConfiguration;
}

interface AuthConfiguration {
    microsoft: MicrosoftAuthConfiguration;
}

interface MicrosoftAuthConfiguration {
    authority: string;
    clientId: string;
    clientSecret: string;
    requiredScopes: string[];
}
