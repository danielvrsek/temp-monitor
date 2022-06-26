import { atom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { CreateUserDeviceDto, UserDeviceViewModel } from 'shared/dto';
import ApiClient from '../api/apiClient';
import { useWebSocketClient } from '../api/webSocketClient';
import { EntityStore } from './entity.store';

export interface UserDeviceStore extends EntityStore<UserDeviceViewModel, CreateUserDeviceDto> {
    load(gatewayId: string): Promise<UserDeviceViewModel[]>;
}

export const UserDeviceAtom = atom<UserDeviceViewModel[] | null>(null);

export const useUserDeviceStore = (): [UserDeviceViewModel[] | null, UserDeviceStore | null] => {
    const webSocketClient = useWebSocketClient();

    const [userDevices, setUserDevices] = useAtom(UserDeviceAtom);
    const [store, setStore] = useState<UserDeviceStore | null>(null);

    useEffect(() => {
        if (!webSocketClient) {
            return;
        }

        setStore({
            load: (gatewayId) =>
                ApiClient.getUserDevices(gatewayId).then((res) => {
                    setUserDevices(res.data);
                    return res.data;
                }),
            create: (dto) =>
                webSocketClient.createUserDevice(dto).then((res) => {
                    console.log(userDevices);
                    if (userDevices) {
                        console.log(res);

                        setUserDevices([...userDevices, res]);
                    }
                    return res;
                }),
            delete: (entity) =>
                webSocketClient.deleteUserDevice(entity.id).then((res) => {
                    if (userDevices) {
                        setUserDevices(userDevices.filter((x) => x.id !== res.id));
                    }
                    return res;
                }),
        });
    }, [webSocketClient, userDevices, setUserDevices, setStore]);

    return [userDevices, store];
};
