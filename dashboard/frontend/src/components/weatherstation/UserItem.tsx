import React from 'react';

import { Grid, Card, Divider, CardHeader, CardContent, IconButton, Popover, MenuList, MenuItem } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useUserContext, useWorkspaceContext } from '../../common/contexts/AuthContext';
import Line from '../../common/Line';
import ApiClient from '../../api/ApiClient';
import { UserRoleDto, UserViewModel } from 'shared/dto';

type Props = {
    data: UserViewModel;
};

const UserItem: React.FC<Props> = ({ data }) => {
    const [workspaceContext] = useWorkspaceContext();
    const [userContext] = useUserContext();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleOpenSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSettings = () => {
        setAnchorEl(null);
    };

    const handleUserRemove = () => {
        ApiClient.removeUserFromCurrentWokspace(data.id).then(() => window.location.reload());
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const popover =
        userContext?.userId !== data.id && workspaceContext?.roles.includes(UserRoleDto.Admin) ? (
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
        <Grid key={data.id} item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardHeader title={`${data.firstName} ${data.lastname}`} action={popover} />
                <Divider />
                <CardContent>
                    <Line header="User id" content={data.id} />
                    <Line header="Email" content={data.email} />
                </CardContent>
            </Card>
        </Grid>
    );
};

export default UserItem;
