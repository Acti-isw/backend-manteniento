import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';
import { TransformDataInterceptor } from 'src/interceptors/transform-data.interceptor';
import { AuthResponseDTO } from '../dto/authResponse.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(new TransformDataInterceptor(AuthResponseDTO))
  @Post('login')
  async login(@Body() { usuario, password }: AuthDTO) {
    const userValidate = await this.authService.validateUser(usuario, password);

    if (!userValidate) {
      throw new UnauthorizedException('Data not valid');
    }

    const jwt = await this.authService.generateJWT(userValidate);

    return jwt;
  }
}
