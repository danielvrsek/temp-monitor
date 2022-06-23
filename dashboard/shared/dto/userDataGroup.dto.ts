export interface UserDataGroupViewModel {
    id: string;
    name: string;
    createdAt: Date;
}

export interface CreateUserDataGroupDto {
    gatewayId: string;
    name: string;
}

export interface UpdateUserDataGroupDto {
    name?: string;
}
