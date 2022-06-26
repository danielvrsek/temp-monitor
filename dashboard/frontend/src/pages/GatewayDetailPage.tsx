import { Box, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ApiClient from '../api/apiClient';
import Error from '../common/Error';
import Loading from '../common/Loading';
import { GatewayViewModel, UserRoleDto } from 'shared/dto';
import GatewayDetailReady from '../components/gateway/GatewayDetailReady';
import UserDeviceListLoader from '../components/userDevice/UserDeviceListLoader';
import AddUserDevice from '../components/userDevice/AddUserDevice';
import { useWorkspaceContext } from '../common/contexts/AuthContext';

const GatewayDetailPage = () => {
    const { id } = useParams();

    const [workspaceContext] = useWorkspaceContext();

    const [data, setData] = useState<GatewayViewModel | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('Bad request');
            return;
        }

        ApiClient.getGateway(id)
            .then(({ data }) => setData(data))
            .catch((e) => setError(e));
    }, [id]);

    if (error) {
        return <Error content="Error" />;
    }

    if (!data) {
        return <Loading />;
    }

    return (
        <Container sx={{ pt: '32px' }}>
            <GatewayDetailReady data={data} />
            <Box>
                {workspaceContext?.roles.some((role) => role === UserRoleDto.Admin) && (
                    <AddUserDevice gatewayId={data.id} />
                )}
                <UserDeviceListLoader gatewayId={data.id} />
            </Box>
        </Container>
    );
};

export default GatewayDetailPage;
