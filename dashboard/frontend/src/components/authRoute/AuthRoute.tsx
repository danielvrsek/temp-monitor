import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../common/contexts/AuthContext';

type Props = {
    children: JSX.Element;
};

const AuthRoute: React.FC<Props> = ({ children }) => {
    const [user] = useUserContext();
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
