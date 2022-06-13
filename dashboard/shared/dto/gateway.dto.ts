import { TokenInfo } from './token';

export enum GatewayState {
    Created,
    Registered,
}

export enum GatewayAuthorizationType {
    Master,
    Slave,
}

export interface GatewayViewModel {
    id: string;
    name: string;
    state: GatewayState;
}

export interface AuthenticateGatewayDto {
    secret: string;
}

export interface CreateGatewayDto {
    name: string;
}

export interface UpdateGatewayDto {
    name?: string;
    state?: GatewayState;
}

export interface CreateGatewayResult {
    gateway: GatewayViewModel;
    secret: string;
}

export interface GatewayInfo extends TokenInfo {
    gatewayId: string;
    workspaceId: string;
}
