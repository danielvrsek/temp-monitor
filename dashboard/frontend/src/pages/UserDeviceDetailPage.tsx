import { Box, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ApiClient from '../api/apiClient';
import Error from '../common/Error';
import Loading from '../common/Loading';
import { UserDeviceViewModel } from 'shared/dto';
import UserDeviceDetailReady from '../components/userDevice/UserDeviceDetailReady';
import UserDeviceSensorListLoader from '../components/userDeviceSensor/UserDeviceSensorListLoader';

const UserDeviceDetailPage = () => {
    const { id } = useParams();

    const [data, setData] = useState<UserDeviceViewModel | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('Bad request');
            return;
        }

        ApiClient.getUserDevice(id)
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
        <Container sx={{ pt: 4 }}>
            <div style={{ marginBottom: '20px' }}>
                <UserDeviceDetailReady data={data} />
            </div>
            <Box>
                <UserDeviceSensorListLoader userDeviceId={data.id} />
            </Box>
        </Container>
    );
};

export default UserDeviceDetailPage;
