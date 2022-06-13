import axios from 'axios';
import { getBasePath } from '../components/utils/pathHelper';
import { LoginDto, RegisterDto } from 'shared/dto';

const ApiClient = {
    getUserInfo: async () => getMethod('/auth/user-info'),
    getWorkspaceInfo: async () => getMethod('/auth/workspace-info'),
    getUserAvailableWorkspaces: async () => getMethod('/workspaces/user'),
    setUserWorkspace: async (workspaceId: string) =>
        putMethod('/workspaces/user/current', { workspaceId }, getHeaders()),
    login: async (payload: LoginDto) => postMethod('/auth/login', payload),
    register: (payload: RegisterDto) => postMethod('/auth/register', payload),
    logout: () => postMethod('/auth/logout', null),
    getWeatherData: async (gatewayId: string, dateFrom: Date, dateTo: Date, granularity: number) =>
        getMethod(
            `/weather-data/gateway/${gatewayId}?dateFrom=${dateFrom.toISOString()}&dateTo=${dateTo.toISOString()}&granularity=${granularity}`
        ),
    createGateway: async (name: string) => postMethod('/gateways', { name }),
    getGateway: async (gatewayId: string) => getMethod(`/gateways/${gatewayId}`),
    getGateways: async () => getMethod(`/gateways`),
    removeGatewayFromWokspace: async (gatewayId: string) => deleteMethod(`/gateways/${gatewayId}/workspace`),
    getCurrentWorkspace: async () => getMethod(`/workspaces/user/current`),
    getCurrentWorkspaceUsers: async () => getMethod(`/workspaces/current/users`),
    addUserToCurrentWorkspace: async (username: string) => postMethod(`/workspaces/current/users`, { username }),
    removeUserFromCurrentWokspace: async (userId: string) => deleteMethod(`/workspaces/current/users/${userId}`),
};

type Headers = {
    [key: string]: string;
};

const getMethod = (path: string, headers?: Headers) =>
    axios.get(getBasePath() + path, {
        headers,
        withCredentials: true,
    });

const postMethod = (path: string, payload: any, headers?: Headers) =>
    axios.post(getBasePath() + path, payload, {
        headers,
        withCredentials: true,
    });

const deleteMethod = (path: string, headers?: Headers) =>
    axios.delete(getBasePath() + path, {
        headers,
        withCredentials: true,
    });

const putMethod = (path: string, payload: any, headers?: Headers) =>
    axios.put(getBasePath() + path, payload, {
        headers,
        withCredentials: true,
    });

const getHeaders: () => Headers = () => ({
    'Content-Type': 'application/json',
});

export default ApiClient;
