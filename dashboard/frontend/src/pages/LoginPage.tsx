import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, Avatar, TextField, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import ApiClient from '../api/ApiClient';
import MicrosoftLoginButton from '../components/login/MicrosoftLoginButton';
import { useUserContext } from '../components/context/AuthContext';

const LoginPage = () => {
    //Style
    const paperStyle = {
        padding: '30px 20px',
        maxWidth: '400px',
        margin: '20px auto',
    };

    // UseState
    const [state, setState] = useState({
        pswdVisibility: false,
    });
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const [, setUserContext] = useUserContext();

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { status } = await ApiClient.login({
            username,
            password,
        });
        if (status !== 200) {
            throw new Error('TODO: Handle bad login');
        }

        const { data } = await ApiClient.getUserInfo();
        setUserContext(data);

        navigate('/workspaces', { replace: true });
    };

    return (
        <Container style={{ height: '500px', paddingTop: '50px' }}>
            <Paper style={paperStyle}>
                <Grid justifyContent="center">
                    <Avatar>
                        <LoginIcon />
                    </Avatar>
                    <h2>Login</h2>
                </Grid>
                <form onSubmit={submit}>
                    <TextField
                        fullWidth
                        label="Username"
                        placeholder="Enter your username"
                        margin="normal"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        type={state.pswdVisibility ? 'text' : 'password'}
                        label="Password"
                        margin="normal"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button sx={{ mb: 2 }} type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </form>
                <MicrosoftLoginButton
                    url={'/external-auth/microsoft-login?returnUrl=' + encodeURIComponent(`https:localhost:3000/`)}
                />
            </Paper>
        </Container>
    );
};

export default LoginPage;
