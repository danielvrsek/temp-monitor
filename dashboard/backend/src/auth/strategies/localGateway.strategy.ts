import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'services/auth.service';
import { Guards } from 'auth/common/guards';
import { GatewayInfo } from 'shared/src/dto';

@Injectable()
export class LocalGatewayStrategy extends PassportStrategy(Strategy, Guards.LocalGateway) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'workspaceId', passwordField: 'secret' });
    }

    async validate(workspaceId: string, secret: string): Promise<GatewayInfo> {
        const gateway = await this.authService.validateGatewayAsync(workspaceId, secret);
        if (!gateway) {
            throw new UnauthorizedException();
        }
        return gateway;
    }
}
