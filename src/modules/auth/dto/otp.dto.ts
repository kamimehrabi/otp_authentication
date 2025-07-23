import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsString, Length } from 'class-validator';

export class RequestOtpDto {
    @ApiProperty({ example: '+989123456789' })
    @IsMobilePhone('fa-IR')
    phone: string;
}

export class VerifyOtpDto {
    @ApiProperty({ example: '+989123456789' })
    @IsMobilePhone('fa-IR')
    phone: string;

    @ApiProperty({ example: '123456', minLength: 6, maxLength: 6 })
    @IsString()
    @Length(6, 6)
    otp: string;
}

export class VerifyOtpResponseDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…' })
    token: string;
}
