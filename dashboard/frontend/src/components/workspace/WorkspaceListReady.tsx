import WorkspaceItem from './WorkspaceItem';

import { Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceContext } from '../../common/contexts/AuthContext';
import ApiClient from '../../api/ApiClient';
import { WorkspaceViewModel } from 'shared/src/dto';

type Props = {
    data: WorkspaceViewModel[];
};

const WorkspaceListReady: React.FC<Props> = ({ data }) => {
    const navigate = useNavigate();
    const [, setWorkspaceContext] = useWorkspaceContext();

    const handleItemOnClick = (item: WorkspaceViewModel) => {
        ApiClient.setUserWorkspace(item.id)
            .then(() => ApiClient.getWorkspaceInfo().then(({ data }) => setWorkspaceContext(data)))
            .then(() => navigate('/workspace'));
    };

    return (
        <Container sx={{ pt: 4 }}>
            <Typography variant="h3" mb={3}>
                Seznam dostupných zón
            </Typography>
            <Grid container spacing={2}>
                {data.length ? (
                    data.map((item) => <WorkspaceItem key={item.id} data={item} onClick={handleItemOnClick} />)
                ) : (
                    <div>Žádná dostupná zóna</div>
                )}
            </Grid>
        </Container>
    );
};

export default WorkspaceListReady;
