export interface UserDeviceViewModel {
    id: string;
    name: string;
    createdAt: Date;
}

export interface CreateDeviceDto {
    gatewayId: string;
    name: string;
}

export interface UpdateUserDeviceDto {
    name?: string;
}
