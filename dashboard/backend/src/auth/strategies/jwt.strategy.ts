import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Guards } from 'auth/common/guards';
import { Cookies } from 'common/cookies';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthConstants } from '../common/authConstants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, Guards.Jwt) {
    constructor() {
        super({
            ignoreExpiration: true,
            secretOrKey: AuthConstants.JwtSecret,
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                (request: Request) => request?.cookies[Cookies.AuthCookie],
            ]),
        });
    }

    async validate(payload: any) {
        if (payload === null) {
            throw new UnauthorizedException();
        }
        return payload;
    }
}
