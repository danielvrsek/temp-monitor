import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TOKENTYPE_KEY } from 'auth/decorator/tokenType.decorator';
import { TokenType } from 'shared/dist/authorization';

@Injectable()
export class TokenTypeGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const tokenType = this.reflector.getAllAndOverride<TokenType>(TOKENTYPE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (tokenType === undefined || tokenType === null) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        if (!user) {
            return false;
        }

        return user.tokenType === tokenType;
    }
}
