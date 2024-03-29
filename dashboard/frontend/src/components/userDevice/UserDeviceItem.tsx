import React, { MouseEvent } from 'react';

import {
    Grid,
    Card,
    CardActionArea,
    Divider,
    CardHeader,
    CardContent,
    IconButton,
    Popover,
    MenuList,
    MenuItem,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useWorkspaceContext } from '../../common/contexts/AuthContext';
import ApiClient from '../../api/apiClient';
import Line from '../../common/Line';
import { UserDeviceViewModel, UserRoleDto } from 'shared/dto';
import { useWebSocketClient } from '../../api/webSocketClient';
import { useUserDeviceStore } from '../../stores/userDevice.store';

type Props = {
    data: UserDeviceViewModel;
    onClick: (item: UserDeviceViewModel) => void;
};

const UserDeviceItem: React.FC<Props> = ({ data, onClick }) => {
    const [workspaceContext] = useWorkspaceContext();
    const [, userDeviceStore] = useUserDeviceStore();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleOpenSettings = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSettings = () => {
        setAnchorEl(null);
    };

    const handleRemove = () => {
        userDeviceStore?.delete(data);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const popover = workspaceContext?.roles.includes(UserRoleDto.Admin) ? (
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
                    <MenuItem onClick={handleRemove}>Remove device</MenuItem>
                </MenuList>
            </Popover>
        </div>
    ) : (
        <></>
    );

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardHeader title={data.name} action={popover} />
                <Divider />
                <CardActionArea onClick={() => onClick(data)}>
                    <CardContent>
                        <Line header="Id" content={data.id} />
                        <Line header="Přidáno" content={new Date(data.createdAt).toLocaleString()} />
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default UserDeviceItem;
