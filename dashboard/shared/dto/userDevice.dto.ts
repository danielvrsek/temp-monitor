import { UserDeviceSensorViewModel } from './userDeviceSensor.dto';

export interface UserDeviceViewModel {
    id: string;
    name: string;
    createdAt: Date;
}

export interface UserDeviceAvailableViewModel {
    identifier: string;
    name: string;
    deviceType: string;
}

export interface UserDeviceRegisteredViewModel {
    id: string;
    name: string;
    externalId: string;
    createdAt: Date;
    sensors: UserDeviceSensorViewModel[];
}

export interface CreateUserDeviceDto {
    gatewayId: string;
    name: string;
    externalId: string;
}

export interface UpdateUserDeviceDto {
    name?: string;
}
