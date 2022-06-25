import React from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserDeviceViewModel } from 'shared/dto';
import UserDeviceItem from './UserDeviceItem';
import AddUserDevice from './AddUserDevice';

type Props = {
    data: UserDeviceViewModel[];
};

const UserDeviceList: React.FC<Props> = ({ data }) => {
    const navigate = useNavigate();

    const handleItemOnClick = (item: UserDeviceViewModel) => {
        navigate(`/devices/${item.id}`);
    };

    return (
        <div>
            <AddUserDevice />
            <Grid container sx={{ pt: 4 }} spacing={2}>
                {data.length ? (
                    data.map((item) => <UserDeviceItem key={item.id} data={item} onClick={handleItemOnClick} />)
                ) : (
                    <></>
                )}
            </Grid>
        </div>
    );
};

export default UserDeviceList;
