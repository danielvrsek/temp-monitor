import React from 'react';
import WeatherstationItem from './WeatherstationItem';
import AddWeatherStation from './AddWeatherStation';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceContext } from '../../common/contexts/AuthContext';
import { GatewayViewModel, UserRoleDto } from 'shared/dto';

type Props = {
    data: GatewayViewModel[];
};

const WeatherstationList: React.FC<Props> = ({ data }) => {
    const [workspaceContext] = useWorkspaceContext();
    const navigate = useNavigate();

    const handleItemOnClick = (item: GatewayViewModel) => {
        navigate(`/weatherstations/${item.id}`);
    };

    return (
        <div>
            {workspaceContext?.roles.includes(UserRoleDto.Admin) ? <AddWeatherStation /> : <></>}
            <Grid container sx={{ pt: 4 }} spacing={2}>
                {data.length ? (
                    data.map((item) => <WeatherstationItem key={item.id} data={item} onClick={handleItemOnClick} />)
                ) : (
                    <></>
                )}
            </Grid>
        </div>
    );
};

export default WeatherstationList;
