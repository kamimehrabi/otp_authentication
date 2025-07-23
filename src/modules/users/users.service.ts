// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserFields } from 'src/models/User';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
    ) {}

    findByPhone(phone: string) {
        return this.userModel.findOne({ where: { phoneNumber: phone } });
    }

    create(data: Partial<UserFields>) {
        return this.userModel.create(data as UserFields);
    }
}
