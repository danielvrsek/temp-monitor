/* eslint-disable @typescript-eslint/no-empty-interface */
import { GatewayInfo } from 'services/dto/gateway.dto';
import { WorkspaceUserInfo } from 'services/dto/user.dto';

export interface ClientRequest<TPayload, TClientInfo> {
    payload: TPayload;
    user?: TClientInfo;
    cookies: { [name: string]: string };
}

export interface UserRequest<TPayload> extends ClientRequest<TPayload, WorkspaceUserInfo> {}

export interface GatewayRequest<TPayload> extends ClientRequest<TPayload, GatewayInfo> {}
