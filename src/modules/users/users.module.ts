import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { User } from 'src/models/User';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
