import { createContext, useContext } from 'react';

export const UserContext = createContext();
export const WorkspaceContext = createContext();

export const useUserContext = () => useContext(UserContext);
export const useWorkspaceContext = () => useContext(WorkspaceContext);

export const useClearAuth = () => {
    const [, setUserContext] = useUserContext();
    const [, setWorkspaceContext] = useWorkspaceContext();

    return () => {
        setUserContext(null);
        setWorkspaceContext(null);
    };
};
