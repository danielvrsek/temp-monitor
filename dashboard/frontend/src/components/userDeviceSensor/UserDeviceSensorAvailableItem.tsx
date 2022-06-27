import React from 'react';
import { Grid, Card, Divider, CardHeader, CardContent, Button } from '@mui/material';
import Line from '../../common/Line';
import { UserDeviceSensorAvailableViewModel } from 'shared/dto';

type Props = {
    data: UserDeviceSensorAvailableViewModel;
    onClick: (item: UserDeviceSensorAvailableViewModel) => void;
};

const UserDeviceSensorAvailableItem: React.FC<Props> = ({ data, onClick }) => {
    const handleClick = () => {
        onClick(data);
    };

    return (
        <Grid item>
            <Card>
                <CardHeader title={data.name} />
                <Divider />
                <CardContent>
                    <Line header="Identifier" content={data.identifier} />
                    <Line header="Sensor type" content={data.sensorType} />
                    <Grid container justifyContent="flex-end">
                        <Button onClick={handleClick}>Add</Button>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default UserDeviceSensorAvailableItem;
