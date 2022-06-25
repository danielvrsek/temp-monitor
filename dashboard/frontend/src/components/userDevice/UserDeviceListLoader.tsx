import React, { useEffect, useState } from 'react';
import { UserDeviceViewModel } from 'shared/dto';
import ApiClient from '../../api/apiClient';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import UserDeviceList from './UserDeviceList';

type Props = {
    gatewayId: string;
};

const UserDeviceListLoader: React.FC<Props> = ({ gatewayId }) => {
    const [userDevices, setUserDevices] = useState<UserDeviceViewModel[] | null>(null);
    const [error, setError] = useState();

    useEffect(() => {
        ApiClient.getUserDevices(gatewayId)
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

    return <UserDeviceList data={userDevices} />;
};

export default UserDeviceListLoader;
