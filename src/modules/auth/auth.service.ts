import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { Redis } from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { UsersService } from '../users/users.service';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

    constructor(
        @InjectRedis() private readonly redis: Redis,
        private readonly users: UsersService,
        private readonly jwtSecret = process.env.JWT_SECRET!,
    ) {}

    async requestOtp(phoneNumber: string): Promise<void> {
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6‑digit
        const key = `otp:${phoneNumber}`;
        await this.redis.set(key, otp, 'EX', 60);
        console.log(`OTP for ${phoneNumber} is ${otp}`);
    }

    async verifyOtp(
        phoneNumber: string,
        otp: string,
    ): Promise<{ token: string }> {
        const key = `otp:${phoneNumber}`;
        const foundKey = await this.redis.get(key);
        if (!foundKey || foundKey !== otp) {
            throw new UnauthorizedException('Invalid or expired OTP');
        }

        let user = await this.users.findByPhone(phoneNumber);
        if (!user) {
            user = await this.users.create({ phoneNumber });
        }
        await this.redis.del(key);

        const payload = { sub: user.id, phoneNumber: user.phoneNumber };
        const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
        return { token };
    }
}
