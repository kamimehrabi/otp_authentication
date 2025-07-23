import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        RedisModule.forRoot({
            config: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT),
                password: process.env.REDIS_PASSWORD || undefined,
            },
        }),
    ],
})
export class AppModule {}
