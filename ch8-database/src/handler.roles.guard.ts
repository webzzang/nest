import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class HandlerRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
      context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = 'user-id'; // JWT를 검증해서 얻은 유저ID라고 가정. request.user 객체에서 얻음.
    const userRole = this.getUserRole(userId);

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    return roles?.includes(userRole) ? true : false;
  }

  private getUserRole(userId: string): string {
    return 'admin';
  }
}