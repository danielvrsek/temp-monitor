import React from 'react';
import { Grid } from '@mui/material';
import { UserDeviceSensorAvailableViewModel } from 'shared/dto';
import UserDeviceSensorAvailableItem from './UserDeviceSensorAvailableItem';

type Props = {
    data: UserDeviceSensorAvailableViewModel[];
    onClick: (item: UserDeviceSensorAvailableViewModel) => void;
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
