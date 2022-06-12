import { UserRole } from 'dataLayer/entities/enums/role.enum';
import { TokenInfo } from './token';

export interface RegisterDto {
    firstName: string;
    lastname: string;
    email: string;
    passwordRaw: string;
}

export interface CreateUserDto {
    firstName: string;
    lastname: string;
    email: string;
    username: string;
    passwordRaw: string;
    isExternal: boolean;
    profilePhotoUrl: string;
}

export interface UpdateUserDto {
    firstName: string;
    lastname: string;
    email: string;
}

export interface UserDto {
    userId: string;
    username: string;
    firstName: string;
    lastname: string;
    email: string;
}

export interface UserInfo extends TokenInfo {
    userId: string;
    username: string;
    firstName: string;
    lastname: string;
    email: string;
    profilePhotoUrl: string;
}

export interface WorkspaceInfo {
    workspaceId: string;
    name: string;
    roles: UserRole[];
}
