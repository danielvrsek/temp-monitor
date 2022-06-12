import React from 'react';
import FooterNavBar from '../components/navBars/FooterNavBar';
import MenuAppBar from '../components/navBars/MenuAppBar';

type Props = {
    children: JSX.Element;
};

const MainLayout = ({ children }: Props) => {
    return (
        <>
            <MenuAppBar />
            <div className="container">{children}</div>
            <FooterNavBar />
        </>
    );
};

export default MainLayout;
