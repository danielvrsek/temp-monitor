import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './navBar/NavBar';

const MainLayout: React.FC = () => {
    return (
        <>
            <NavBar />
            <div className="container">
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;
