export interface UserDeviceSensorViewModel {
    id: string;
    name: string;
    valueUnit: string;
    createdAt: Date;
}

export interface CreateUserDeviceSensorDto {
    userDeviceId: string;
    name: string;
    valueUnit: string;
}

export interface UpdateUserDeviceSensorDto {
    name?: string;
    valueUnit: string;
}
