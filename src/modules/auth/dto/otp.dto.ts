import { IsMobilePhone, IsString, Length } from 'class-validator';

export class RequestOtpDto {
  @IsMobilePhone('fa-IR')
  phone: string;
}

export class VerifyOtpDto {
  @IsMobilePhone('fa-IR')
  phone: string;

  @IsString()
  @Length(6, 6)
  otp: string;
}
