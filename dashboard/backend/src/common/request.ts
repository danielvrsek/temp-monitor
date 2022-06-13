/* eslint-disable @typescript-eslint/no-empty-interface */
import { GatewayInfo, UserInfo } from 'shared/src/dto';

export interface ClientRequest<TPayload, TClientInfo> {
    payload: TPayload;
    user?: TClientInfo;
    cookies: { [name: string]: string };
}

export interface UserRequest<TPayload> extends ClientRequest<TPayload, UserInfo> {}

export interface GatewayRequest<TPayload> extends ClientRequest<TPayload, GatewayInfo> {}
