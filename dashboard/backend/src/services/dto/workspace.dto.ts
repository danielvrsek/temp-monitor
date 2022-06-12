export interface AddUserToWorkspaceDto {
    username: string;
}

export interface CreateWorkspaceDto {
    name: string;
}

export interface SetCurrentWorkspaceDto {
    workspaceId: string;
}

export interface CurrentWorkspaceViewModel {
    id?: string;
    name?: string;
}
