export interface InsertWeatherDataDto {
    data: WeatherDataDto[];
}

export interface InsertWeatherDataResponse {
    count: number;
}

export interface WeatherDataDto {
    temperature: number;
    humidity: number;
    timestamp: Date;
}

export interface GetWeatherDataForWorkspaceResponse {
    gatewayId: string;
    gatewayName: string;
}
