import * as msal from '@azure/msal-node';
import { Injectable } from '@nestjs/common';
import { ConfigurationProvider } from 'configuration/configuration';

@Injectable()
export class MicrosoftAuthorizationService {
    constructor(private configurationProvider: ConfigurationProvider) {}

    isInitialized = false;
    cca: msal.ConfidentialClientApplication = null;

    getAuthCodeUrl(authCodeUrlParameters) {
        if (!this.isInitialized) {
            this.initialize();
        }

        return this.cca.getAuthCodeUrl(authCodeUrlParameters);
    }

    acquireTokenByCode(tokenRequest): Promise<msal.AuthenticationResult> {
        if (!this.isInitialized) {
            this.initialize();
        }

        return this.cca.acquireTokenByCode(
            tokenRequest /*, {
            code: tokenRequest.code,
            state: JSON.stringify({ returnUrl: 'https://localhost:3000' }),
            client_info: '{}',
        }*/
        );
    }

    initialize() {
        const { auth } = this.configurationProvider.getConfiguration();

        this.cca = new msal.ConfidentialClientApplication({
            auth: {
                authority: auth.microsoft.authority,
                clientId: auth.microsoft.clientId,
                clientSecret: auth.microsoft.clientSecret,
            },
            system: {
                loggerOptions: {
                    loggerCallback(loglevel, message, containsPii) {
                        console.log(message);
                    },
                    piiLoggingEnabled: false,
                    logLevel: msal.LogLevel.Verbose,
                },
            },
        });
    }
}
