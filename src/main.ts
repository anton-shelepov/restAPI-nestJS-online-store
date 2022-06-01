import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true, // disable post data which is not exist in dto
    }))
    app.use('/uploads/images', express.static(join(__dirname, '..', 'uploads/images')));
    await app.listen(3001);
}

bootstrap();
