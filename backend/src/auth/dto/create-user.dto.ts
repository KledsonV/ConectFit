import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  telephone: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  neighborhood: string;

  @IsNotEmpty()
  @IsDateString()
  birthdate: string;

  @IsOptional()
  cref?: string;
}
