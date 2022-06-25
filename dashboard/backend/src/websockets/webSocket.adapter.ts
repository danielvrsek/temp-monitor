import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { Environment } from 'configuration/env';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export class WebSocketAdapter extends IoAdapter {
    constructor(private readonly configService: ConfigService, app: INestApplicationContext) {
        super(app);
    }

    createIOServer(port: number, options?: ServerOptions) {
        options.cors = {
            credentials: true,
            origin: this.configService.get<string>(Environment.webUrl),
        };
        return super.createIOServer(port, options);
    }

    create(
        port: number,
        options?: ServerOptions & { namespace?: string; server?: any }
    ): Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> {
        const server = super.create(port, options);
        return server;
    }
}
