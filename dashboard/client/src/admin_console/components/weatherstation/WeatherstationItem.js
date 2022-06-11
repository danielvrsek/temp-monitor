import React from 'react';

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
import Line from '../core/Line';
import { useWorkspaceContext } from '../../../components/context/AuthContext';

const WeatherstationItem = ({ data }) => {
    const [workspaceContext] = useWorkspaceContext();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpenSettings = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSettings = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardHeader
                    title={data.name}
                    action={
                        (workspaceContext.roles.includes('Admin')) ? (<div>
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
                                    <MenuItem>Odebrat stanici</MenuItem>
                                </MenuList>
                            </Popover>
                        </div>) : <></>
                    }
                />
                <Divider />
                <CardActionArea href={`/weatherstations/${data._id}`}>
                    <CardContent>
                        <Line header="Id" content={data._id}/>
                        <Line header="Přidáno" content={new Date(data.createdAt).toLocaleString()}/>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default WeatherstationItem;
