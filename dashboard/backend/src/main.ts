import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from 'app.module';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import { Environment } from 'configuration/env';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
    /* const httpsOptions = {
        key: fs.readFileSync('var\\localhost.key'),
        //key: fs.readFileSync('var\\herokuapp.key'),
        cert: fs.readFileSync('var\\localhost.cert'),
        //cert: fs.readFileSync('var\\herokuapp.cert'),
    }; */

    const app = await NestFactory.create(AppModule, {
        //httpsOptions,
    });

    const configService = app.get<ConfigService>(ConfigService);

    app.use(cookieParser());
    app.enableCors({
        credentials: true,
        origin: configService.get<string>(Environment.webUrl),
    });

    await app.listen(PORT);
}

bootstrap();
