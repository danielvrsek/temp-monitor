import { TokenInfo } from './token';

export enum GatewayStateDto {
    Created,
    Registered,
}

export enum GatewayAuthorizationTypeDto {
    Master,
    Slave,
}

export interface GatewayViewModel {
    id: string;
    name: string;
    state: GatewayStateDto;
    createdAt: Date;
}

export interface AuthenticateGatewayDto {
    secret: string;
}

export interface CreateGatewayDto {
    name: string;
}

export interface UpdateGatewayDto {
    name?: string;
    state?: GatewayStateDto;
}

export interface CreateGatewayResult {
    gateway: GatewayViewModel;
    secret: string;
}

export interface GatewayInfo extends TokenInfo {
    gatewayId: string;
    workspaceId: string;
}
