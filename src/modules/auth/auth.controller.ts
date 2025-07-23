import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestOtpDto, VerifyOtpDto, VerifyOtpResponseDto } from './dto/otp.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @Post('otp/request')
    @ApiOperation({ summary: 'Request a one‑time SMS code' })
    @ApiResponse({ status: 200, description: 'OTP logged to server console.' })
    async requestOtp(@Body() dto: RequestOtpDto) {
        await this.auth.requestOtp(dto.phone);
        return { message: 'OTP sent (check logs)' };
    }

    @Post('otp/verify')
    @ApiOperation({ summary: 'Verify OTP and get back a JWT' })
    @ApiResponse({ status: 201, type: VerifyOtpResponseDto })
    async verifyOtp(@Body() dto: VerifyOtpDto) {
        return this.auth.verifyOtp(dto.phone, dto.otp);
    }
}
