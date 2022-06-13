import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ApiClient from '../../api/ApiClient';
import { CreateGatewayResult } from 'shared/dto';

const AddWeatherStation: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [createdGateway, setCreatedGateway] = useState<CreateGatewayResult | null>(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setCreatedGateway(null);
    };

    const submit = () => {
        ApiClient.createGateway(name).then(({ data }) => {
            setCreatedGateway(data);
        });
    };

    return (
        <div style={{ margin: '8px 0' }}>
            <Button onClick={handleOpen} variant="contained">
                Vytvořit stanici
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {!createdGateway ? (
                        <>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Přidání stanice pro měření
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ marginBottom: '20px' }}>
                                Právě přidáváte další meteostanici pro tento workspace <br />
                                <br />
                                Kliknutím na tlačítko vygenerujte stanici a v ní můžete uživatelům přiřadit práva pro
                                zobrazení.
                            </Typography>
                            <Grid justifyContent="center" style={{ marginBottom: '10px' }}>
                                <TextField
                                    fullWidth
                                    label="Název stanice"
                                    placeholder="Enter your username"
                                    margin="normal"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Button type="submit" variant="contained" color="primary" onClick={submit}>
                                Vytvořit stanici
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                style={{ marginBottom: '10px' }}
                            >
                                Úspěšně jste vytvořili další měřící stanici
                            </Typography>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Než okno zavřete zapiště si vytvořené údaje!
                                <br />Z bezpečnostních důvodů udaje nikde neukládáme.
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ marginBottom: '20px' }}>
                                WorkspaceID: <strong>{createdGateway.gateway.id}</strong> <br />
                                Secret: <strong>{createdGateway.secret}</strong>
                            </Typography>
                        </>
                    )}
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
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
};

export default AddWeatherStation;
