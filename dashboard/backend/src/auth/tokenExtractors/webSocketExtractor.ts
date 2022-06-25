import { Cookies } from 'common/cookies';

export class WebSocketExtractor {
    public static extractFromHandshakeCookie() {
        return (request: any) => {
            const cookies = this.parseCookies(request?.handshake?.headers?.cookie);
            return cookies && cookies[Cookies.AuthCookie];
        };
    }

    public static extractFromHandshakeBearer() {
        return (request: any) => {
            return this.parseBearer(request?.handshake?.headers?.authorization);
        };
    }

    static parseCookies(cookies: string) {
        let rx = /([^;=\s]*)=([^;]*)/g;
        let obj = {};
        for (let m; (m = rx.exec(cookies)); ) obj[m[1]] = decodeURIComponent(m[2]);
        return obj;
    }

    static parseBearer(cookies: string) {
        let rx = /Bearer\ (.*)/g;
        const m = rx.exec(cookies);
        return m && m[1];
    }
}
