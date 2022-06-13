import { UserRoleDto } from './user.dto';

export enum WorkspaceTypeDto {
    Admin,
    Private,
}

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

export interface WorkspaceInfo {
    workspaceId: string;
    name: string;
    roles: UserRoleDto[];
}
