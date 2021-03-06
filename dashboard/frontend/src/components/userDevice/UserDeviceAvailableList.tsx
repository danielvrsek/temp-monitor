import React from 'react';
import { Grid } from '@mui/material';
import { UserDeviceAvailableViewModel } from 'shared/dto';
import UserDeviceSensorAvailableItem from './UserDeviceAvailableItem';

type Props = {
    data: UserDeviceAvailableViewModel[];
    onClick: (item: UserDeviceAvailableViewModel) => void;
};

const UserDeviceSensorAvailableList: React.FC<Props> = ({ data, onClick }) => {
    return (
        <div>
            <Grid container sx={{ pt: 4 }} spacing={2}>
                {data.length ? (
                    data.map((item) => (
                        <UserDeviceSensorAvailableItem key={item.identifier} data={item} onClick={onClick} />
                    ))
                ) : (
                    <></>
                )}
            </Grid>
        </div>
    );
};

export default UserDeviceSensorAvailableList;
