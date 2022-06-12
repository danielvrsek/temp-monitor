import { CookieOptions } from 'express';

export class Cookies {
    public static AuthCookie = 'auth-cookie';
    public static CurrentWorkspace = 'workspace';
}

export const cookieOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
};
