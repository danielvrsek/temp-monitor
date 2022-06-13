import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { UserRole } from 'dataLayer/entities/enums/userRole.enum';
import { JwtAuthGuard } from './jwt.guard';

const RoleGuard = (role: UserRole): Type<CanActivate> => {
    class RoleGuardMixin extends JwtAuthGuard {
        async canActivate(context: ExecutionContext) {
            await super.canActivate(context);
            const request = context.switchToHttp().getRequest<any>();
            const user = request.user.payload;
            return user?.roles.includes(role);
        }
    }
    return mixin(RoleGuardMixin);
};

export default RoleGuard;
