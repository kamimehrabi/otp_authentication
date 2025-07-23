import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 1, description: 'Unique identifier for the user' })
  id: number;

  @ApiProperty({ example: '+989123456789', description: 'Phone number associated with the user' })
  phoneNumber: string;

  @ApiProperty({ example: 'John', description: 'First name of the user', required: false, nullable: true })
  firstName?: string | null;

  @ApiProperty({ example: 'William', description: 'Middle name of the user', required: false, nullable: true })
  middleName?: string | null;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user', required: false, nullable: true })
  lastName?: string | null;

  @ApiProperty({ example: 'johndoe', description: 'Username for login or display', required: false, nullable: true })
  username?: string | null;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
