export interface UserDeviceSensorViewModel {
    id: string;
    name: string;
    valueUnit: string;
    externalId: string;
    createdAt: Date;
}

export interface UserDeviceSensorAvailableViewModel {
    identifier: string;
    name: string;
    sensorType: string;
}

export interface UserDeviceSensorRegisteredViewModel {
    id: string;
    name: string;
    externalId: string;
}

export interface CreateUserDeviceSensorDto {
    userDeviceId: string;
    name: string;
    valueUnit: string;
    externalId: string;
}

export interface UpdateUserDeviceSensorDto {
    name?: string;
    valueUnit: string;
}
