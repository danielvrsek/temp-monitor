import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, Avatar, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ApiClient from '../api/ApiClient';
import MicrosoftLoginButton from '../components/login/MicrosoftLoginButton';
import { useUserContext } from '../components/context/AuthContext';

const Login = () => {
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

    // Functionality
    const handleClickShowPassword = () => {
        setState({
            ...state,
            pswdVisibility: !state.pswdVisibility,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //LogIn

    const submit = async (e) => {
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
                <Grid align="center">
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
                        endadornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {state.pswdVisibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        }
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

export default Login;
