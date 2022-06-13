import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useWorkspaceContext } from '../../../common/contexts/AuthContext';
import UserItem from './UserItem';
import AddUser from './AddUser';
import ApiClient from '../../../api/ApiClient';

const UserListReady = () => {
    const [workspaceContext] = useWorkspaceContext();

    const [users, setUsers] = useState(null);

    useEffect(() => {
        ApiClient.getCurrentWorkspaceUsers().then(({ data }) => setUsers(data));
    }, []);

    if (!users) {
        return <></>;
    }

    return (
        <div>
            {workspaceContext.roles.includes('Admin') ? <AddUser /> : <></>}
            <Grid container sx={{ pt: 4 }} spacing={2}>
                {users.length ? users.map((item) => <UserItem key={item._id} data={item} />) : <></>}
            </Grid>
        </div>
    );
};

export default UserListReady;
