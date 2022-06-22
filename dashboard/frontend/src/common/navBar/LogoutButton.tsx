import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useClearAuth } from '../contexts/AuthContext';
import ApiClient from '../../api/ApiClient';

const LogoutButton = () => {
    const clearAuth = useClearAuth();
    const navigate = useNavigate();

    const submit = () => {
        ApiClient.logout();
        clearAuth();
        navigate('/');
    };

    return (
        <div>
            <Button variant="contained" size="small" onClick={submit}>
                Odhlásit se
            </Button>
        </div>
    );
};

export default LogoutButton;
