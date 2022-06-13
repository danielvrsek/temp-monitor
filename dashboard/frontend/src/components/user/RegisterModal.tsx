import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FieldValues, useForm } from 'react-hook-form';
import FormInputText from '../form/FormInputText';
import ApiClient from '../../api/ApiClient';

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
    '& .MuiTextField-root': { m: 1 },
};

const RegisterModal = () => {
    const [open, setOpen] = useState(false);
    const { control, handleSubmit } = useForm();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submit = (data: FieldValues) => {
        ApiClient.register({
            firstName: data['firstName'],
            lastname: data['lastname'],
            email: data['email'],
            passwordRaw: data['password'],
        }).then();
    };

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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Registrace
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, marginBottom: '20px' }}></Typography>
                    <Grid justifyContent="center">
                        <Box sx={{ '& .MuiTextField-root': { width: '25ch' } }}>
                            <FormInputText
                                control={control}
                                name="firstName"
                                label="First name"
                                placeholder="Enter your first name"
                                margin="normal"
                            />
                            <FormInputText
                                control={control}
                                name="lastname"
                                label="Last name"
                                placeholder="Enter your last name"
                                margin="normal"
                            />
                        </Box>

                        <Box sx={{ '& .MuiTextField-root': { width: '52ch' } }}>
                            <FormInputText
                                control={control}
                                name="email"
                                fullWidth
                                label="Email"
                                placeholder="Enter your email"
                                margin="normal"
                            />
                        </Box>

                        <Box sx={{ '& .MuiTextField-root': { width: '25ch' } }}>
                            <FormInputText
                                control={control}
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="Enter your password"
                                margin="normal"
                            />
                            <FormInputText
                                control={control}
                                name="password-verify"
                                type="password"
                                label="Password verify"
                                placeholder="Retype your password"
                                margin="normal"
                            />
                        </Box>
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(submit)}>
                        Registrovat
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default RegisterModal;
