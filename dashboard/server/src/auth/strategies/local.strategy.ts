import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'services/auth.service';
import { Guards } from 'auth/common/guards';
import { Logger } from '@nestjs/common';
import { UserInfo } from 'services/dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, Guards.Local) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<UserInfo> {
        const user = await this.authService.validateUserAsync(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
