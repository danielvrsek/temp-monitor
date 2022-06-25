import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Guards } from 'auth/common/guards';
import { CookieExtractor } from 'auth/tokenExtractors/cookieExtractor';
import { WebSocketExtractor } from 'auth/tokenExtractors/webSocketExtractor';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GatewayInfo, UserInfo } from 'shared/dto';
import { objectId } from 'utils/schemaHelper';
import { AuthConstants } from '../common/authConstants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, Guards.Jwt) {
    constructor(private readonly userRepository: UserRepository) {
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

    async validate(payload: UserInfo & GatewayInfo) {
        if (payload === null) {
            throw new UnauthorizedException();
        }

        if (payload.userId) {
            if (!(await this.userRepository.findByIdAsync(objectId(payload.userId)))) {
                throw new UnauthorizedException('Invalid login information');
            }
        }

        return payload;
    }
}
