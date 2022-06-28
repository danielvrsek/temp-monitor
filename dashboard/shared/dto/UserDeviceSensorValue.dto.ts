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

export interface UserDeviceSensorValueDataDto {
    value: number;
    valueMin: number;
    valueMax: number;
}

export interface UserDeviceSensorValueQuery {
    sensorId: string;
    dateFrom?: number;
    dateTo?: number;
    granularity?: number;
}
