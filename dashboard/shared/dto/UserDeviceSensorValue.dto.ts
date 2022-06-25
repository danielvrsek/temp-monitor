export interface UserDeviceSensorValueViewModel {
    value: number;
    timestamp: number;
}

export interface UserDeviceSensorValueDto {
    value: number;
    timestamp: number;
}

export interface InsertUserDeviceSensorDataDto {
    userDeviceSensorId: string;
    data: UserDeviceSensorValueDto[];
}

export interface InsertUserDeviceSensorDataResponse {
    count: number;
}

export interface UserDeviceSensorValueQuery {
    sensorId: string;
    dateFrom?: number;
    dateTo?: number;
    granularity?: number;
}
