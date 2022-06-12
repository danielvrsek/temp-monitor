import React from 'react';
import WeatherstationItem from './WeatherstationItem';
import AddWeatherStation from './AddWeatherStation';
import { Grid } from '@mui/material';
import { useWorkspaceContext } from '../../../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const WeatherstationListReady = ({ data }) => {
    const [workspaceContext] = useWorkspaceContext();

    const navigate = useNavigate();

    const handleItemOnClick = (item) => {
        navigate(`/weatherstations/${item._id}`);
    };

    return (
        <div>
            {workspaceContext.roles.includes('Admin') ? <AddWeatherStation /> : <></>}
            <Grid container sx={{ pt: 4 }} spacing={2}>
                {data.length ? (
                    data.map((item) => <WeatherstationItem key={item._id} data={item} onClick={handleItemOnClick} />)
                ) : (
                    <></>
                )}
            </Grid>
        </div>
    );
};

export default WeatherstationListReady;
