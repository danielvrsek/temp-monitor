import React from 'react';
import { Grid, Card, Divider, CardHeader, CardContent, Button } from '@mui/material';
import Line from '../../common/Line';
import { UserDeviceAvailableViewModel } from 'shared/dto';

type Props = {
    data: UserDeviceAvailableViewModel;
    onClick: (item: UserDeviceAvailableViewModel) => void;
};

const UserDeviceAvailableItem: React.FC<Props> = ({ data, onClick }) => {
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
                    <Line header="Device type" content={data.deviceType} />
                    <Grid container justifyContent="flex-end">
                        <Button onClick={handleClick}>Add</Button>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default UserDeviceAvailableItem;
