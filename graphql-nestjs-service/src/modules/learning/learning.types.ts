import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class LoginUserInput {
  @IsString()
  @MinLength(4, {
    message: 'Your username must be at least 4 characters',
  })
  @IsNotEmpty()
  public username: string;
  @Length(1, 8, {
    message: 'Your password must be between 1 and 8 characters.',
  })
  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class CreateUserInput {
  @IsString()
  @MinLength(4, {
    message: 'Your username must be at least 4 characters',
  })
  @IsNotEmpty({ message: 'Your username can not be blank.' })
  public username: string;

  @Length(1, 8, {
    message: 'Your password must be between 1 and 8 characters.',
  })
  @IsString()
  @IsNotEmpty({ message: 'Your password can not be blank.' })
  public password: string;

  @IsEmail(undefined, { message: 'Invalid email message' })
  @IsNotEmpty({ message: 'Your email can not be blank.' })
  public email: string;
}

export class LoginResponse {
  @IsString()
  public token: string;
}

export class User {

  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
  @IsString()
  @IsNotEmpty()

  public email: string;
  @IsString()
  @IsNotEmpty()

  public role: string;
  @IsBoolean()
  @IsNotEmpty()
  public status: boolean;
}
