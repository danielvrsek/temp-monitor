import React, { useEffect, useState } from 'react';
import { UserDeviceSensorViewModel } from 'shared/dto';
import ApiClient from '../../api/apiClient';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import UserDeviceSensorList from './UserDeviceSensorList';

type Props = {
    userDeviceId: string;
};

const UserDeviceSensorListLoader: React.FC<Props> = ({ userDeviceId }) => {
    const [userDevices, setUserDevices] = useState<UserDeviceSensorViewModel[] | null>(null);
    const [error, setError] = useState();

    useEffect(() => {
        ApiClient.getUserDeviceSensors(userDeviceId)
            .then((response) => {
                setUserDevices(response.data);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    if (error) {
        return <Error content={error} />;
    }

    if (!userDevices) {
        return <Loading />;
    }

    return <UserDeviceSensorList data={userDevices} />;
};

export default UserDeviceSensorListLoader;
