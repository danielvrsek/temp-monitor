import axios from 'axios';
import { getBasePath } from '../components/utils/pathHelper';

const getMethod = (path, headers?) => axios.get(getBasePath() + path, { headers, withCredentials: true });
const postMethod = (path, payload, headers?) =>
    axios.post(getBasePath() + path, payload, {
        headers,
        withCredentials: true,
    });
const deleteMethod = (path, headers?) => axios.delete(getBasePath() + path, { headers, withCredentials: true });
const putMethod = (path, payload, headers?) =>
    axios.put(getBasePath() + path, payload, {
        headers,
        withCredentials: true,
    });

const getHeaders = () => ({
    'Content-type': 'application/json',
});

const ApiClient = {
    getUserInfo: async () => getMethod('/auth/user-info'),
    getWorkspaceInfo: async () => getMethod('/auth/workspace-info'),
    getUserAvailableWorkspaces: async () => getMethod('/workspaces/user'),
    setUserWorkspace: async (workspaceId) => putMethod('/workspaces/user/current', { workspaceId }, getHeaders()),
    login: async (credentials) => postMethod('/auth/login', credentials),
    register: (payload) => postMethod('/auth/register', payload),
    logout: () => postMethod('/auth/logout'),
    getWeatherData: async (gatewayId, dateFrom, dateTo, granularity) =>
        getMethod(
            `/weather-data/gateway/${gatewayId}?dateFrom=${dateFrom.toISOString()}&dateTo=${dateTo.toISOString()}&granularity=${granularity}`
        ),
    createGateway: async (name) => postMethod('/gateways', { name }),
    getGateway: async (id) => getMethod(`/gateways/${id}`),
    getGateways: async () => getMethod(`/gateways`),
    removeGatewayFromWokspace: async (gatewayId) => deleteMethod(`/gateways/${gatewayId}/workspace`),
    getCurrentWorkspace: async () => getMethod(`/workspaces/user/current`),
    getCurrentWorkspaceUsers: async () => getMethod(`/workspaces/current/users`),
    addUserToCurrentWorkspace: async (username) => postMethod(`/workspaces/current/users`, { username }),
    removeUserFromCurrentWokspace: async (userId) => deleteMethod(`/workspaces/current/users/${userId}`),
};

export default ApiClient;
