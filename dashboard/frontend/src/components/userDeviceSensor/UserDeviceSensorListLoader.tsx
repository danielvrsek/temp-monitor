import React, { useEffect, useState } from 'react';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import { useUserDeviceSensorStore } from '../../stores/userDeviceSensor.store ';
import UserDeviceSensorList from './UserDeviceSensorList';

type Props = {
    deviceId: string;
};

const UserDeviceSensorListLoader: React.FC<Props> = ({ deviceId }) => {
    const [userDeviceSensors, userDeviceSensorStore] = useUserDeviceSensorStore(deviceId);
    const [error, setError] = useState();

    useEffect(() => {
        if (!userDeviceSensors) {
            userDeviceSensorStore?.load().catch((e) => setError(e));
        }
    }, [userDeviceSensors, userDeviceSensorStore]);

    if (error) {
        return <Error content={error} />;
    }

    if (!userDeviceSensors) {
        return <Loading />;
    }

    return <UserDeviceSensorList data={userDeviceSensors} />;
};

export default UserDeviceSensorListLoader;
