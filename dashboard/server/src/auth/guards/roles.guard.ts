import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Role } from 'dataLayer/entities/enums/role.enum';
import { JwtAuthGuard } from './jwt.guard';

const RoleGuard = (role: Role): Type<CanActivate> => {
    class RoleGuardMixin extends JwtAuthGuard {
        async canActivate(context: ExecutionContext) {
            await super.canActivate(context);
            const request = context.switchToHttp().getRequest<any>();
            const user = request.user.payload;
            return user?.role.includes(role);
        }
    }
    return mixin(RoleGuardMixin);
};

export default RoleGuard;
