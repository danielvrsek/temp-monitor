import { Atom, atom, SetStateAction, useAtom, WritableAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { CreateUserDeviceSensorDto, UserDeviceSensorViewModel } from 'shared/dto';
import ApiClient from '../api/apiClient';
import { useWebSocketClient } from '../api/webSocketClient';
import { EntityStore } from './entity.store';

export interface UserDeviceSensorStore extends EntityStore<UserDeviceSensorViewModel, CreateUserDeviceSensorDto> {
    load(): Promise<UserDeviceSensorViewModel[]>;
}

type UserDeviceSensorCache = { [deviceId: string]: UserDeviceSensorViewModel[] | null };

const UserDeviceSensorAtom = atom<UserDeviceSensorCache>({});

export const useUserDeviceSensorStore = (
    deviceId: string
): [UserDeviceSensorViewModel[] | null, UserDeviceSensorStore | null] => {
    const webSocketClient = useWebSocketClient();

    const [userDeviceSensorsCache, setUserDeviceSensorsCache] = useAtom(UserDeviceSensorAtom);
    const [store, setStore] = useState<UserDeviceSensorStore | null>(null);

    useEffect(() => {
        if (!webSocketClient) {
            return;
        }

        setStore({
            load: () =>
                ApiClient.getUserDeviceSensors(deviceId).then((res) => {
                    setUserDeviceSensorsCache({ ...userDeviceSensorsCache, [deviceId]: res.data });
                    return res.data;
                }),
            create: (dto) =>
                webSocketClient.createUserDeviceSensor(dto).then((res) => {
                    const sensors = userDeviceSensorsCache[deviceId];
                    if (sensors) {
                        console.log(res);
                        setUserDeviceSensorsCache({ ...userDeviceSensorsCache, [deviceId]: [...sensors, res] });
                    }
                    return res;
                }),
            delete: (entity) =>
                webSocketClient.deleteUserDeviceSensor(entity.id).then((res) => {
                    const sensors = userDeviceSensorsCache[deviceId];
                    if (sensors) {
                        setUserDeviceSensorsCache({
                            ...userDeviceSensorsCache,
                            [deviceId]: sensors.filter((x) => x.id !== res.id),
                        });
                    }
                    return res;
                }),
        });
    }, [deviceId, webSocketClient, userDeviceSensorsCache, setUserDeviceSensorsCache, setStore]);

    return [userDeviceSensorsCache[deviceId], store];
};
