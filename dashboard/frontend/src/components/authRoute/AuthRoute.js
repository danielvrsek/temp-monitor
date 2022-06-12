import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/AuthContext';

const AuthRoute = (props) => {
    const [user] = useUserContext();
    const { children } = props;
    const navigate = useNavigate();

    useEffect(() => {
        if (user == null) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) {
        return <></>;
    }

    return <div>{children}</div>;
};

export default AuthRoute;
