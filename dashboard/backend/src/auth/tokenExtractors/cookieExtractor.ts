import { Cookies } from 'common/cookies';
import { Request } from 'express';

export class CookieExtractor {
    public static extractFromAuthCookie() {
        return (request: Request) => {
            return request?.cookies && request.cookies[Cookies.AuthCookie];
        };
    }
}
