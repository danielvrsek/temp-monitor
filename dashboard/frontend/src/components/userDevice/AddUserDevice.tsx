import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useWebSocketClient } from '../../api/webSocketClient';
import Loading from '../../common/Loading';
import UserDeviceAvailableList from './UserDeviceAvailableList';
import { UserDeviceAvailableViewModel } from 'shared/dto';
import { useUserDeviceStore } from '../../stores/userDevice.store';

type Props = {
    gatewayId: string;
};

const AddUserDevice: React.FC<Props> = ({ gatewayId }) => {
    const webSocketClient = useWebSocketClient();
    const [, userDeviceStore] = useUserDeviceStore();

    const [open, setOpen] = useState(false);
    const [availableDevices, setAvailableDevices] = useState<UserDeviceAvailableViewModel[] | null>(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setAvailableDevices(null);
    };

    useEffect(() => {
        if (open) {
            webSocketClient?.queryAvailableDevices(gatewayId).then((response) => setAvailableDevices(response));
        }
    }, [webSocketClient, open, gatewayId]);

    const handleClick = (item: UserDeviceAvailableViewModel) => {
        console.log(userDeviceStore);
        userDeviceStore
            ?.create({
                name: item.name,
                externalId: item.identifier,
                gatewayId: gatewayId,
            })
            .then((x) => handleClose());
    };

    return (
        <div style={{ margin: '8px 0' }}>
            <Button onClick={handleOpen} variant="contained">
                Add device
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {availableDevices && (
                        <>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Add device
                            </Typography>
                            <Grid justifyContent="center" style={{ marginBottom: '10px' }}>
                                <UserDeviceAvailableList data={availableDevices} onClick={handleClick} />
                            </Grid>
                        </>
                    )}
                    {!availableDevices && <Loading />}
                </Box>
            </Modal>
        </div>
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
};

export default AddUserDevice;
