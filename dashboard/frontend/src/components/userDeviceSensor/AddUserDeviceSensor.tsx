import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useWebSocketClient } from '../../api/webSocketClient';
import Loading from '../../common/Loading';
import { UserDeviceSensorAvailableViewModel } from 'shared/dto';
import UserDeviceSensorAvailableList from './UserDeviceSensorAvailableList';
import { useUserDeviceSensorStore } from '../../stores/userDeviceSensor.store ';

type Props = {
    deviceId: string;
};

const AddUserDeviceSensor: React.FC<Props> = ({ deviceId }) => {
    const webSocketClient = useWebSocketClient();
    const [, userDeviceSensorStore] = useUserDeviceSensorStore(deviceId);

    const [open, setOpen] = useState(false);
    const [availableDeviceSensors, setAvailableDeviceSensors] = useState<UserDeviceSensorAvailableViewModel[] | null>(
        null
    );
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setAvailableDeviceSensors(null);
    };

    useEffect(() => {
        if (open) {
            console.log(deviceId);
            webSocketClient?.queryAvailableSensors(deviceId).then((response) => setAvailableDeviceSensors(response));
        }
    }, [webSocketClient, open, deviceId]);

    const handleClick = (item: UserDeviceSensorAvailableViewModel) => {
        userDeviceSensorStore
            ?.create({
                name: item.name,
                externalId: item.identifier,
                userDeviceId: deviceId,
                valueUnit: '',
            })
            .then((x) => handleClose());
    };

    return (
        <div style={{ margin: '8px 0' }}>
            <Button onClick={handleOpen} variant="contained">
                Add device sensor
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {availableDeviceSensors && (
                        <>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Add device sensor
                            </Typography>
                            <Grid justifyContent="center" style={{ marginBottom: '10px' }}>
                                <UserDeviceSensorAvailableList data={availableDeviceSensors} onClick={handleClick} />
                            </Grid>
                        </>
                    )}
                    {!availableDeviceSensors && <Loading />}
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

export default AddUserDeviceSensor;
