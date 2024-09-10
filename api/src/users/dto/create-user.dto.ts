import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { errorConstants as userErrors } from 'src/users/constants';

export class CreateUserDto {
  @IsNotEmpty({ message: userErrors.name.required })
  @IsString({ message: userErrors.name.type })
  @MinLength(2, { message: userErrors.name.minLength })
  @MaxLength(70, { message: userErrors.name.maxLength })
  name: string;

  @IsEmail({}, { message: userErrors.email.valid })
  @IsNotEmpty({ message: userErrors.email.required })
  email: string;

  @IsNotEmpty({ message: userErrors.username.required })
  @IsString({ message: userErrors.username.type })
  @MinLength(2, { message: userErrors.username.minLength })
  @MaxLength(20, { message: userErrors.username.maxLength })
  username: string;

  photo: string;

  @IsNotEmpty({ message: userErrors.password.required })
  password: string;

  @IsNotEmpty({ message: userErrors.passwordConfirmation.required })
  passwordConfirmation: string;

  @IsNotEmpty({ message: userErrors.birthdate.required })
  @IsDate({ message: userErrors.birthdate.type })
  birthdate: Date;

  @IsNotEmpty({ message: userErrors.gender.required })
  @IsString({ message: userErrors.gender.type })
  gender: string;
}
