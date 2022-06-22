import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './navBar/NavBar';
import FooterNavBar from './navBar/FooterNavBar';

const MainLayout: React.FC = () => {
    return (
        <>
            <NavBar />
            <div className="container">
                <Outlet />
            </div>
            <FooterNavBar />
        </>
    );
};

export default MainLayout;
