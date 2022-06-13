import { useEffect, useState } from 'react';
import { useUserContext, useWorkspaceContext } from './common/contexts/AuthContext';
import ApiClient from './api/ApiClient';
import Loading from './admin_console/components/core/Loading';
import AppRouter from './AppRouter';

const App = () => {
    const [, setUserContext] = useUserContext();
    const [, setWorkspaceContext] = useWorkspaceContext();
    const [isUserInitialized, setIsUserInitialized] = useState(false);
    const [isWorkspaceInitialized, setIsWorkspaceInitialized] = useState(false);

    useEffect(() => {
        ApiClient.getUserInfo()
            .then(({ data }) => setUserContext(data))
            .finally(() => setIsUserInitialized(true));
    }, []);

    useEffect(() => {
        ApiClient.getWorkspaceInfo()
            .then(({ data }) => setWorkspaceContext(data))
            .finally(() => setIsWorkspaceInitialized(true));
    }, []);

    if (!isUserInitialized || !isWorkspaceInitialized) {
        return <Loading />;
    }

    return <AppRouter />;
};

export default App;
