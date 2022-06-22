import * as graph from '@microsoft/microsoft-graph-client';
import { MicrosoftAuthorizationService } from './microsoftAuthorizationService';
import { ConfigurationProvider } from 'configuration/configuration';
import { Injectable } from '@nestjs/common';
import 'isomorphic-fetch';

@Injectable()
export class MicrosoftGraphApi {
    constructor(
        private configurationProvider: ConfigurationProvider,
        private microsoftAuthorizationService: MicrosoftAuthorizationService
    ) {}

    async getUserDetailsAsync(userId) {
        const client = this.getAuthenticatedClient(userId);
        return await client.api('/me').select('givenName,surname,mail').get();
    }

    async getUserPhotoAsync(userId) {
        const client = this.getAuthenticatedClient(userId);
        return await client.api('/me/photo/$value').get();
    }

    getAuthenticatedClient(userId) {
        const msalClient = this.microsoftAuthorizationService.cca;

        if (!msalClient || !userId) {
            throw new Error(
                `Invalid MSAL state. Client: ${msalClient ? 'present' : 'missing'}, User ID: ${
                    userId ? 'present' : 'missing'
                }`
            );
        }

        // Initialize Graph client
        const client = graph.Client.init({
            // Implement an auth provider that gets a token
            // from the app's MSAL instance
            authProvider: async (done) => {
                try {
                    // Get the user's account
                    const account = await msalClient.getTokenCache().getAccountByHomeId(userId);

                    if (account) {
                        // Attempt to get the token silently
                        // This method uses the token cache and
                        // refreshes expired tokens as needed
                        const config = this.configurationProvider.getConfiguration();
                        const response = await msalClient.acquireTokenSilent({
                            scopes: config.auth.microsoft.requiredScopes,
                            account: account,
                        });

                        // First param to callback is the error,
                        // Set to null in success case
                        done(null, response.accessToken);
                    }
                } catch (err) {
                    console.log(JSON.stringify(err, Object.getOwnPropertyNames(err)));
                    done(err, null);
                }
            },
        });

        return client;
    }
}
