import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

const AddUser = () => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        username: '',
        prijmeni: '',
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submit = () => {};
    return (
        <div style={{ marginBottom: '10px' }}>
            <Button onClick={handleOpen} variant="contained" size="large">
                Registrace
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
Registrace                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2 }}
                        style={{ marginBottom: '20px' }}
                    ></Typography>
                    <Grid align="center" style={{ marginBottom: '10px' }}>
                        <TextField
                            fullWidth
                            label="Uživatelské jméno"
                            placeholder="Enter your username"
                            margin="normal"
                            onChange={(e) => setUser.username(e.target.value)}
                        />
                    </Grid>
                    <Grid align="center" style={{ marginBottom: '10px' }}>
                        <TextField
                            fullWidth
                            label="Jméno"
                            placeholder="Enter your username"
                            margin="normal"
                            onChange={(e) => setUser.name(e.target.value)}
                        />
                    </Grid>
                    <Grid align="center" style={{ marginBottom: '10px' }}>
                        <TextField
                            fullWidth
                            label="Příjmení"
                            placeholder="Enter your username"
                            margin="normal"
                            onChange={(e) => setUser.lastname(e.target.value)}
                        />
                    </Grid>
                    <Grid align="center" style={{ marginBottom: '10px' }}>
                        <TextField
                            fullWidth
                            label="Email"
                            placeholder="Enter your username"
                            margin="normal"
                            onChange={(e) => setUser.email(e.target.value)}
                        />
                    </Grid>
                    <Grid align="center" style={{ marginBottom: '10px' }}>
                        <TextField
                            fullWidth
                            label="Heslo"
                            placeholder="Enter your username"
                            margin="normal"
                            onChange={(e) => setUser.password(e.target.value)}
                        />
                    </Grid>
                    <Grid align="center" style={{ marginBottom: '10px' }}>
                        <TextField
                            fullWidth
                            label="Ověření hesla"
                            placeholder="Enter your username"
                            margin="normal"
                        />
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={submit}
                    >
                        Registrovat
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default AddUser;
