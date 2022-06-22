export interface UserDataViewModel {
    value: number;
    timestamp: Date;
}

export interface UserDataDto {
    value: number;
    timestamp: Date;
}

export interface InsertUserDataDto {
    data: UserDataDto[];
}

export interface InsertUserDataResponse {
    count: number;
}

export interface GetUserDataForWorkspaceResponse {
    gatewayId: string;
    gatewayName: string;
}
