import React from 'react';
import GatewayItem from './GatewayItem';
import AddWeatherStation from './AddGateway';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceContext } from '../../common/contexts/AuthContext';
import { GatewayViewModel, UserRoleDto } from 'shared/dto';

type Props = {
    data: GatewayViewModel[];
};

const GatewayList: React.FC<Props> = ({ data }) => {
    const [workspaceContext] = useWorkspaceContext();
    const navigate = useNavigate();

    const handleItemOnClick = (item: GatewayViewModel) => {
        navigate(`/gateways/${item.id}`);
    };

    return (
        <div>
            {workspaceContext?.roles.includes(UserRoleDto.Admin) ? <AddWeatherStation /> : <></>}
            <Grid container sx={{ pt: 4 }} spacing={2}>
                {data.length ? (
                    data.map((item) => <GatewayItem key={item.id} data={item} onClick={handleItemOnClick} />)
                ) : (
                    <></>
                )}
            </Grid>
        </div>
    );
};

export default GatewayList;
