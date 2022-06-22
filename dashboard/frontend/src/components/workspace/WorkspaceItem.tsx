import { Grid, Card, CardActionArea, CardHeader, CardContent, Divider } from '@mui/material';
import { WorkspaceViewModel } from 'shared/dto';
import Line from '../../common/Line';

type Props = {
    data: WorkspaceViewModel;
    onClick: (item: WorkspaceViewModel) => void;
};

const WorkspaceItem: React.FC<Props> = ({ data, onClick }) => {
    const created = new Date(data.createdAt).toLocaleString();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardHeader title={data.name} />
                <Divider />
                <CardActionArea onClick={() => onClick(data)}>
                    <CardContent>
                        <Line header="Id" content={data.id} />
                        <Line header="Vytvořeno" content={created} />
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default WorkspaceItem;
