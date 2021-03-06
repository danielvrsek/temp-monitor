import React, { useEffect, useState } from 'react';
import { GatewayViewModel } from 'shared/dto';
import ApiClient from '../../api/apiClient';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import GatewayList from './GatewayList';

const GatewayListLoader: React.FC = () => {
    const [gateways, setGateways] = useState<GatewayViewModel[] | null>(null);
    const [error, setError] = useState();

    useEffect(() => {
        ApiClient.getGateways()
            .then((response) => {
                setGateways(response.data);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    if (error) {
        return <Error content={error} />;
    }

    if (!gateways) {
        return <Loading />;
    }

    return <GatewayList data={gateways} />;
};

export default GatewayListLoader;
