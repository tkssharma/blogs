
import { IsString, IsInt, isEmail, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContactDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString() readonly name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsString() readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString() readonly phone: string;
}
