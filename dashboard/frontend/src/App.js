import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext, WorkspaceContext } from './components/context/AuthContext';
import FooterNavBar from './components/navBars/FooterNavBar';

import AuthRoute from './components/authRoute/AuthRoute';
import TopAppBar from './components/navBars/TopAppBar';

import routes from './components/routes/Routes';
import ApiClient from './api/ApiClient';

function App() {
    const [userContext, setUserContext] = useState(null);
    const [workspaceContext, setWorkspaceContext] = useState(null);
    const [isUserInitialized, setIsUserInitialized] = useState(false);
    const [isWorkspaceInitialized, setIsWorkspaceInitialized] = useState(false);

    useEffect(() => {
        ApiClient.getUserInfo()
            .then(({ data }) => {
                setUserContext(data);
                setIsUserInitialized(true);
            })
            .catch(() => setIsUserInitialized(true));
    }, []);

    useEffect(() => {
        ApiClient.getWorkspaceInfo()
            .then(({ data }) => {
                setWorkspaceContext(data);
                setIsWorkspaceInitialized(true);
            })
            .catch(() => setIsWorkspaceInitialized(true));
    }, []);

    if (!isUserInitialized || !isWorkspaceInitialized) {
        return <div></div>;
    }

    return (
        <UserContext.Provider value={[userContext, setUserContext]}>
            <WorkspaceContext.Provider value={[workspaceContext, setWorkspaceContext]}>
                <BrowserRouter>
                    <TopAppBar />
                    <Routes>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                element={
                                    route.protected ? (
                                        <AuthRoute>
                                            <route.component />
                                        </AuthRoute>
                                    ) : (
                                        <route.component />
                                    )
                                }
                            ></Route>
                        ))}
                    </Routes>
                    <div style={{ minHeight: '100px' }}></div>
                    <FooterNavBar />
                </BrowserRouter>
            </WorkspaceContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
