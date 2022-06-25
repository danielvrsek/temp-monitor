import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Guards } from 'auth/common/guards';
import { CookieExtractor } from 'auth/tokenExtractors/cookieExtractor';
import { WebSocketExtractor } from 'auth/tokenExtractors/webSocketExtractor';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthConstants } from '../common/authConstants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, Guards.Jwt) {
    constructor() {
        super({
            ignoreExpiration: true,
            secretOrKey: AuthConstants.JwtSecret,
            jwtFromRequest: ExtractJwt.fromExtractors([
                WebSocketExtractor.extractFromHandshakeCookie(),
                WebSocketExtractor.extractFromHandshakeBearer(),
                CookieExtractor.extractFromAuthCookie(),
                ExtractJwt.fromAuthHeaderAsBearerToken(),
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
