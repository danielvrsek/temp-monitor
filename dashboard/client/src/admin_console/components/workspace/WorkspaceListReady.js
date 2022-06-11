import WorkspaceItem from './WorkspaceItem';

import { Container, Grid, Typography } from '@mui/material';
import ApiClient from '../../../api/ApiClient';
import { useAuth } from '../../../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const WorkspaceListReady = ({ data }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    const handleItemOnClick = (item) => {
        ApiClient.setUserWorkspace(item._id).then(() =>
            ApiClient.getWorkspaceInfo().then(({ data }) => setAuth({ ...auth, workspace: data }))
        );
        navigate('/');
    };

    return (
        <Container sx={{ pt: 4 }}>
            <Typography variant="h3" mb={3}>
                Seznam workspace
            </Typography>
            <Grid container spacing={2}>
                {data.length ? (
                    data.map((x) => <WorkspaceItem key={x} data={x} onClick={handleItemOnClick} />)
                ) : (
                    <div>Žádný dostupný workspace</div>
                )}
            </Grid>
        </Container>
    );
};

export default WorkspaceListReady;
