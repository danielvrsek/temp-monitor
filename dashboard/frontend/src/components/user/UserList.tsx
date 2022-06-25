import React from 'react';
import { Grid } from '@mui/material';
import UserItem from './UserItem';
import AddUser from './AddUser';
import { useWorkspaceContext } from '../../common/contexts/AuthContext';
import { UserRoleDto, UserViewModel } from 'shared/dto';

type Props = {
    data: UserViewModel[];
};

const UserList: React.FC<Props> = ({ data }) => {
    const [workspaceContext] = useWorkspaceContext();

    return (
        <div>
            {workspaceContext?.roles.includes(UserRoleDto.Admin) ? <AddUser /> : <></>}
            <Grid container sx={{ pt: 4 }} spacing={2}>
                {data.length ? data.map((item) => <UserItem key={item.id} data={item} />) : <></>}
            </Grid>
        </div>
    );
};

export default UserList;
