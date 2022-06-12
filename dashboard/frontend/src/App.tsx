import { useEffect, useState } from 'react';
import { UserContext, WorkspaceContext } from './components/context/AuthContext';
import ApiClient from './api/ApiClient';
import Loading from './admin_console/components/core/Loading';
import AppRouter from './AppRouter';

const App = () => {
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
        return <Loading />;
    }

    return (
        <UserContext.Provider value={[userContext, setUserContext]}>
            <WorkspaceContext.Provider value={[workspaceContext, setWorkspaceContext]}>
                <AppRouter />
            </WorkspaceContext.Provider>
        </UserContext.Provider>
    );
};

export default App;
