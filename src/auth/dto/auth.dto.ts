import { IAuthBody } from 'src/interface/auth.interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO implements IAuthBody {
  @IsNotEmpty()
  usuario: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
