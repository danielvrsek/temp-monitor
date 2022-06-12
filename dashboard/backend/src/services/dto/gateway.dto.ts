import { GatewayState } from 'dataLayer/entities/enums/gatewayState.enum';
import { Gateway } from 'dataLayer/entities/gateway.entity';
import { TokenInfo } from './token';

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
    gateway: Gateway;
    secret: string;
}

export interface GatewayInfo extends TokenInfo {
    gatewayId: string;
    workspaceId: string;
}
