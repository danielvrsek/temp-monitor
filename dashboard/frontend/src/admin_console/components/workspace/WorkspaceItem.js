import Line from '../core/Line';

import { Grid, Card, CardActionArea, CardHeader, CardContent, Divider } from '@mui/material';

const WorkspaceItem = ({ data, onClick }) => {
    const created = new Date(data.createdAt).toLocaleString();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardHeader title={data.name} />
                <Divider />
                <CardActionArea onClick={() => onClick(data)}>
                    <CardContent>
                        <Line header="Id" content={data._id} />
                        <Line header="Vytvořeno" content={created} />
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default WorkspaceItem;
