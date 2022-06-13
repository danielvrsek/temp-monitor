export interface WeatherDataViewModel {
    temperature: number;
    humidity: number;
    timestamp: Date;
}

export interface WeatherDataDto {
    temperature: number;
    humidity: number;
    timestamp: Date;
}

export interface InsertWeatherDataDto {
    data: WeatherDataDto[];
}

export interface InsertWeatherDataResponse {
    count: number;
}
export interface GetWeatherDataForWorkspaceResponse {
    gatewayId: string;
    gatewayName: string;
}
