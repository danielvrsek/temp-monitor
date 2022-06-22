import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useUserContext } from './common/contexts/AuthContext';
import LoginLayout from './common/LoginLayout';
import MainLayout from './common/MainLayout';
import AvailableWorkspaceListPage from './pages/AvailableWorkspaceListPage';
import InDevelopmentPage from './pages/InDevelopmentPage';
import LoginPage from './pages/LoginPage';
import WeatherstationDetailPage from './pages/WeatherstationDetailPage';
import WorkspaceDetailPage from './pages/WorkspaceDetailPage';

const AppRouter: React.FC = () => {
    const [userContext] = useUserContext();

    if (!userContext) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route element={<LoginLayout />}>
                        <Route path="*" element={<LoginPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<AvailableWorkspaceListPage />} />
                    <Route path="/in-development" element={<InDevelopmentPage />} />
                    <Route path="/workspace" element={<WorkspaceDetailPage />} />
                    <Route path="/weatherstations/:id" element={<WeatherstationDetailPage />} />
                    <Route path="*" element={<div>Not found</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
