import { Injectable } from '@nestjs/common';
import { ConfigurationProvider } from 'configuration/configuration';
import { Request } from 'express';

@Injectable()
export class HttpHelper {
    constructor(private readonly configurationProvider: ConfigurationProvider) {}

    getServerUrl(req: Request) {
        return this.configurationProvider.getConfiguration().apiUrl;
    }
}
