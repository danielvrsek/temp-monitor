import React from 'react';
import { Outlet } from 'react-router-dom';
import FooterNavBar from '../components/navBars/FooterNavBar';
import MenuAppBar from '../components/navBars/MenuAppBar';

const MainLayout: React.FC = () => {
    return (
        <>
            <MenuAppBar />
            <div className="container">
                <Outlet />
            </div>
            <FooterNavBar />
        </>
    );
};

export default MainLayout;
