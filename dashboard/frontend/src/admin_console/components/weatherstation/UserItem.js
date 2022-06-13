import React from 'react';

import { Grid, Card, Divider, CardHeader, CardContent, IconButton, Popover, MenuList, MenuItem } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useUserContext, useWorkspaceContext } from '../../../common/contexts/AuthContext';
import ApiClient from '../../../api/ApiClient';
import Line from '../../../common/Line';

const UserItem = ({ data }) => {
    const [workspaceContext] = useWorkspaceContext();
    const [userContext] = useUserContext();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpenSettings = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSettings = () => {
        setAnchorEl(null);
    };

    const handleUserRemove = () => {
        ApiClient.removeUserFromCurrentWokspace(data.userId).then(() => window.location.reload());
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const popover =
        userContext.userId !== data.userId && workspaceContext.roles.includes('Admin') ? (
            <div>
                <IconButton onClick={handleOpenSettings} aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleCloseSettings}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuList>
                        <MenuItem onClick={handleUserRemove}>Odebrat uživatele</MenuItem>
                    </MenuList>
                </Popover>
            </div>
        ) : (
            <></>
        );

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={data.userId}>
            <Card>
                <CardHeader title={`${data.firstName} ${data.lastname}`} action={popover} />
                <Divider />
                <CardContent>
                    <Line header="User id" content={data.userId} />
                    <Line header="Email" content={data.email} />
                    <Line header="Username" content={data.username} />
                </CardContent>
            </Card>
        </Grid>
    );
};

export default UserItem;
