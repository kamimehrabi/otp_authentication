import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { AuthService } from './modules/auth/auth.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/User';

@Module({
    imports: [
        RedisModule.forRoot({
            type: 'single',
            url: process.env.REDIS_URL,
        }),
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT) || 3306,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            models: [User],
            autoLoadModels: true,
            logging: false,
        }),
        AuthModule,
        UsersModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AppModule {}
