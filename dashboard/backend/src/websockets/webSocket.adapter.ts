import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { Environment } from 'configuration/env';

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
}
