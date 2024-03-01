import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { PUBLIC_KEY } from 'src/constants/key-decorators';
import { IUseToken } from 'src/interface/auth.interface';
import { UsersService } from 'src/users/services/users.service';
import { useToken } from 'src/utils/use.toke';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    try {
      const isPublic = this.reflector.get<boolean>(
        PUBLIC_KEY,
        context.getHandler(),
      );

      if (isPublic) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];
      //console.log(token);

      if (!token || Array.isArray(token)) {
        throw new UnauthorizedException('Invalid token');
      }

      const manageToken: IUseToken | string = useToken(token);

      if (typeof manageToken === 'string') {
        throw new UnauthorizedException(manageToken);
      }

      if (manageToken.isExpired) {
        throw new UnauthorizedException('Token expired');
      }

      const { username } = manageToken;
      const user = await this.userService.findUserByUsername(username);

      if (!user || user.isDelete) {
        throw new UnauthorizedException('Invalid user');
      }

      request.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException(error.message);
    }

    return true;
  }
}
