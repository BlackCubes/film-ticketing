import { IsEmail, IsNotEmpty } from 'class-validator';
import { errorConstants as userErrors } from 'src/users/constants';

export class LoginDto {
  @IsEmail({}, { message: userErrors.email.valid })
  @IsNotEmpty({ message: userErrors.email.required })
  email: string;

  @IsNotEmpty({ message: userErrors.password.required })
  password: string;
}
