export interface UserDeviceViewModel {
    id: string;
    name: string;
    createdAt: Date;
}

export interface CreateUserDeviceDto {
    gatewayId: string;
    name: string;
}

export interface UpdateUserDeviceDto {
    name?: string;
}
