import React from 'react';
import { Outlet } from 'react-router-dom';

const LoginLayout: React.FC = () => {
    return (
        <div className="container">
            <Outlet />
        </div>
    );
};

export default LoginLayout;
