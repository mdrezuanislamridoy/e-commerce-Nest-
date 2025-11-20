import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role_Str } from '../decorator/roles.decorator';
import { Role } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const reflectedData = this.reflector.getAllAndOverride<Role[]>(Role_Str, [
      context.getHandler(),
      context.getClass(),
    ]);

    const user = context.switchToHttp().getRequest().user;
    const isRole = reflectedData.some((role) => user.role === role);
    if (isRole) {
      return true;
    }
    return false;
  }
}
