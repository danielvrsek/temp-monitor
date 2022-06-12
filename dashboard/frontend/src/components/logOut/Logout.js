import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useClearAuth } from '../context/AuthContext';
import ApiClient from '../../api/ApiClient';
import Button from '@mui/material/Button';

const Logout = () => {
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

export default Logout;
