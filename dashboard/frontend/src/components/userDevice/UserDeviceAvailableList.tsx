import React from 'react';
import { Grid } from '@mui/material';
import { UserDeviceAvailableViewModel } from 'shared/dto';
import UserDeviceAvailableItem from './UserDeviceAvailableItem';

type Props = {
    data: UserDeviceAvailableViewModel[];
    onClick: (item: UserDeviceAvailableViewModel) => void;
};

const UserDeviceAvailableList: React.FC<Props> = ({ data, onClick }) => {
    return (
        <div>
            <Grid container sx={{ pt: 4 }} spacing={2}>
                {data.length ? (
                    data.map((item) => <UserDeviceAvailableItem key={item.identifier} data={item} onClick={onClick} />)
                ) : (
                    <></>
                )}
            </Grid>
        </div>
    );
};

export default UserDeviceAvailableList;
