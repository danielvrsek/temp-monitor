import React from 'react';
import { useRoutes } from 'react-router-dom';
import AvailableWorkspaceListPage from './pages/AvailableWorkspaceListPage';
import CustomerInfoPage from './pages/CustomerInfoPage';
import HomePage from './pages/HomePage';
import InDevelopmentPage from './pages/InDevelopmentPage';
import LoginPage from './pages/LoginPage';
import WeatherstationDetailPage from './pages/WeatherstationDetailPage';
import WorkspaceDetailPage from './pages/WorkspaceDetailPage';

const routes = [
    { path: '/', element: <HomePage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/customer-info', element: <CustomerInfoPage /> },
    { path: '/in-development', element: <InDevelopmentPage /> },
    { path: '/workspaces', element: <AvailableWorkspaceListPage /> },
    { path: '/workspace', element: <WorkspaceDetailPage /> },
    { path: '/weatherstations/:id', element: <WeatherstationDetailPage /> },
];

const Router = () => {
    return useRoutes(routes) || <h1>Not found</h1>;
};

export default Router;
