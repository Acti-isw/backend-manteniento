import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorators';
import { ROLES } from 'src/constants/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const roles: string[] = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    ); //Recupera los roles ingresados en el decorador

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request; //Este user se seteo en el guard de authentication, viene el token

    if (user.role === 'ADMIN') return true;

    const hasRole = roles.includes(user.role);

    return user && user.role && hasRole;
    //Verifica si hay un usuario, si el role existe y si tiene el rol el usuario
  }
}
