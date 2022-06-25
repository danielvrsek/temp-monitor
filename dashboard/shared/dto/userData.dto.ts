export interface UserDataViewModel {
    value: number;
    timestamp: number;
}

export interface UserDataDto {
    value: number;
    timestamp: number;
}

export interface InsertUserDataDto {
    userDataGroupId: string;
    data: UserDataDto[];
}

export interface InsertUserDataResponse {
    count: number;
}

export interface UserDataQuery {
    gatewayId: string;
    dateFrom?: string;
    dateTo?: string;
    granularity?: number;
}
