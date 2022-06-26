import { UserDeviceSensorValueQuery, UserDeviceSensorValueViewModel } from 'shared/dto';
import { useUserContext } from '../common/contexts/AuthContext';
import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Events } from 'shared/websockets';
import { getBasePath } from '../utils/pathHelper';

export type WebSocketClient = {
    querySensorData: (query: UserDeviceSensorValueQuery) => Promise<UserDeviceSensorValueViewModel[]>;
    queryAvailableSensors: (gatewayId: string) => Promise<any>;
};

export function useWebSocketClient() {
    const [userContext] = useUserContext();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [webSocketClient, setWebSocketClient] = useState<WebSocketClient | null>(null);

    useEffect(() => {
        socket?.disconnect();
        setWebSocketClient(null);
        setSocket(io(getBasePath(), { withCredentials: true, extraHeaders: { 'x-client-type': 'dashboard' } }));
    }, [userContext]);

    useEffect(() => {
        socket?.on(Events.Connect, () => {
            setWebSocketClient({
                querySensorData: (query: UserDeviceSensorValueQuery) =>
                    emit<UserDeviceSensorValueQuery, UserDeviceSensorValueViewModel[]>(
                        socket,
                        Events.QueryUserDeviceSensorValueData,
                        query
                    ),
                queryAvailableSensors: (gatewayId: string) =>
                    emit<string, any>(socket, Events.QueryAvailableSensors, gatewayId),
            });
        });
    }, [socket]);

    return webSocketClient;
}

const emit = <TRequest, TResponse>(socket: Socket, event: string, data: TRequest): Promise<TResponse> => {
    return new Promise<TResponse>((resolve, reject) => {
        socket.emit(event, data, (response: TResponse) => {
            resolve(response);
        });
    });
};
