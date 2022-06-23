import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from 'app.module';
import * as cookieParser from 'cookie-parser';
import { Environment } from 'configuration/env';
import { WebSocketAdapter } from 'websockets/webSocket.adapter';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get<ConfigService>(ConfigService);

    app.use(cookieParser());
    app.enableCors({
        credentials: true,
        origin: configService.get<string>(Environment.webUrl),
    });

    app.useWebSocketAdapter(new WebSocketAdapter(configService, app));

    await app.listen(PORT);
}

bootstrap();
