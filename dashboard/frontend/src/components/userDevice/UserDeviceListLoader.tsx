import React, { useEffect, useState } from 'react';
import ApiClient from '../../api/apiClient';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import { useUserDeviceStore } from '../../stores/userDevice.store';
import UserDeviceList from './UserDeviceList';

type Props = {
    gatewayId: string;
};

const UserDeviceListLoader: React.FC<Props> = ({ gatewayId }) => {
    const [userDevices, userDeviceStore] = useUserDeviceStore();
    const [error, setError] = useState();

    useEffect(() => {
        console.log(userDevices);

        if (!userDevices) {
            userDeviceStore?.load(gatewayId).catch((e) => setError(e));
        }
    }, [userDevices, userDeviceStore, gatewayId]);

    if (error) {
        return <Error content={error} />;
    }

    if (!userDevices) {
        return <Loading />;
    }

    return <UserDeviceList data={userDevices} />;
};

export default UserDeviceListLoader;
