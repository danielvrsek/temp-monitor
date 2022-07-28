import React from 'react';
import { Grid } from '@mui/material';
import { UserDeviceSensorViewModel } from 'shared/dto';
import UserDeviceSensorItem from './UserDeviceSensorItem';

type Props = {
    data: UserDeviceSensorViewModel[];
};

const UserDeviceSensorList: React.FC<Props> = ({ data }) => {
    return (
        <div>
            <Grid container sx={{ pt: 4 }} spacing={2}>
                {data.length ? data.map((item) => <UserDeviceSensorItem key={item.id} data={item} />) : <></>}
            </Grid>
        </div>
    );
};

export default UserDeviceSensorList;
