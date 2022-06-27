import React from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserDeviceSensorViewModel } from 'shared/dto';
import UserDeviceSensorItem from './UserDeviceSensorItem';

type Props = {
    data: UserDeviceSensorViewModel[];
};

const UserDeviceSensorList: React.FC<Props> = ({ data }) => {
    const navigate = useNavigate();

    const handleItemOnClick = (item: UserDeviceSensorViewModel) => {
        navigate(`/device-sensors/${item.id}`);
    };

    return (
        <div>
            <Grid container sx={{ pt: 4 }} spacing={2}>
                {data.length ? (
                    data.map((item) => <UserDeviceSensorItem key={item.id} data={item} onClick={handleItemOnClick} />)
                ) : (
                    <></>
                )}
            </Grid>
        </div>
    );
};

export default UserDeviceSensorList;
