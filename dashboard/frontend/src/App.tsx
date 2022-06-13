import { useEffect, useState } from 'react';
import { useUserContext, useWorkspaceContext } from './common/contexts/AuthContext';
import ApiClient from './api/ApiClient';
import AppRouter from './AppRouter';
import Loading from './common/Loading';

const App = () => {
    const [, setUserContext] = useUserContext();
    const [, setWorkspaceContext] = useWorkspaceContext();
    const [isUserInitialized, setIsUserInitialized] = useState(false);
    const [isWorkspaceInitialized, setIsWorkspaceInitialized] = useState(false);

    useEffect(() => {
        ApiClient.getUserInfo()
            .then(({ data }) => setUserContext(data))
            .finally(() => setIsUserInitialized(true));
    }, [setUserContext]);

    useEffect(() => {
        ApiClient.getWorkspaceInfo()
            .then(({ data }) => setWorkspaceContext(data))
            .finally(() => setIsWorkspaceInitialized(true));
    }, [setWorkspaceContext]);

    if (!isUserInitialized || !isWorkspaceInitialized) {
        return <Loading />;
    }

    return <AppRouter />;
};

export default App;
