import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('OTP-Authentication API')
        .setDescription('OTP‑and‑JWT auth, Users.')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            stopAtFirstError: true,
        }),
    );
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
