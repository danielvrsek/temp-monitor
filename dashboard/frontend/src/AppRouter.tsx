import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './common/MainLayout';
import AvailableWorkspaceListPage from './pages/AvailableWorkspaceListPage';
import CustomerInfoPage from './pages/CustomerInfoPage';
import HomePage from './pages/HomePage';
import InDevelopmentPage from './pages/InDevelopmentPage';
import LoginPage from './pages/LoginPage';
import WeatherstationDetailPage from './pages/WeatherstationDetailPage';
import WorkspaceDetailPage from './pages/WorkspaceDetailPage';

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="/customer-info" element={<CustomerInfoPage />} />
                <Route path="/in-development" element={<InDevelopmentPage />} />
                <Route path="/workspaces" element={<AvailableWorkspaceListPage />} />
                <Route path="/workspace" element={<WorkspaceDetailPage />} />
                <Route path="/weatherstations/:id" element={<WeatherstationDetailPage />} />
                <Route path="*" element={<div>Not found</div>} />
            </Route>
        </Routes>
    </BrowserRouter>
);
export default AppRouter;
