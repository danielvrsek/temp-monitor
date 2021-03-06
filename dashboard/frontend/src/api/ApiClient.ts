import axios from 'axios';
import { getBasePath } from '../utils/pathHelper';
import {
    CreateGatewayResult,
    GatewayViewModel,
    LoginDto,
    RegisterDto,
    UserDeviceSensorViewModel,
    UserDeviceViewModel,
    UserInfo,
    UserViewModel,
    WorkspaceInfo,
    WorkspaceViewModel,
} from 'shared/dto';

const ApiClient = {
    getUserInfo: async () => getMethod<UserInfo>('/auth/user-info'),
    getWorkspaceInfo: async () => getMethod<WorkspaceInfo>('/auth/workspace-info'),
    getUserAvailableWorkspaces: async () => getMethod<WorkspaceViewModel[]>('/workspaces/user'),
    setUserWorkspace: async (workspaceId: string) =>
        putMethod<void>('/workspaces/user/current', { workspaceId }, getHeaders()),
    login: async (payload: LoginDto) => postMethod<void>('/auth/login', payload),
    register: (payload: RegisterDto) => postMethod<void>('/auth/register', payload),
    logout: () => postMethod<void>('/auth/logout', null),
    createGateway: async (name: string) => postMethod<CreateGatewayResult>('/gateways', { name }),
    getGateway: async (gatewayId: string) => getMethod<GatewayViewModel>(`/gateways/${gatewayId}`),
    getGateways: async () => getMethod<GatewayViewModel[]>(`/gateways`),
    removeGatewayFromWokspace: async (gatewayId: string) => deleteMethod<void>(`/gateways/${gatewayId}/workspace`),
    getCurrentWorkspace: async () => getMethod<WorkspaceViewModel>(`/workspaces/user/current`),
    getCurrentWorkspaceUsers: async () => getMethod<UserViewModel[]>(`/workspaces/current/users`),
    addUserToCurrentWorkspace: async (username: string) => postMethod<void>(`/workspaces/current/users`, { username }),
    removeUserFromCurrentWokspace: async (userId: string) => deleteMethod<void>(`/workspaces/current/users/${userId}`),
    getUserDevice: async (userDeviceId: string) => getMethod<UserDeviceViewModel>(`/devices/${userDeviceId}`),
    getUserDevices: async (gatewayId: string) => getMethod<UserDeviceViewModel[]>(`/devices/gateway/${gatewayId}`),
    getUserDeviceSensor: async (userDeviceSensorId: string) =>
        getMethod<UserDeviceSensorViewModel>(`/device-sensors/${userDeviceSensorId}`),
    getUserDeviceSensors: async (deviceId: string) =>
        getMethod<UserDeviceSensorViewModel[]>(`/device-sensors/device/${deviceId}`),
};

type Headers = {
    [key: string]: string;
};

const getMethod = <T>(path: string, headers?: Headers) =>
    axios.get<T>(getBasePath() + path, {
        headers,
        withCredentials: true,
    });

const postMethod = <T>(path: string, payload: any, headers?: Headers) =>
    axios.post<T>(getBasePath() + path, payload, {
        headers,
        withCredentials: true,
    });

const deleteMethod = <T>(path: string, headers?: Headers) =>
    axios.delete<T>(getBasePath() + path, {
        headers,
        withCredentials: true,
    });

const putMethod = <T>(path: string, payload: any, headers?: Headers) =>
    axios.put<T>(getBasePath() + path, payload, {
        headers,
        withCredentials: true,
    });

const getHeaders: () => Headers = () => ({
    'Content-Type': 'application/json',
});

export default ApiClient;
