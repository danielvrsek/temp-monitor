import { atom, useAtom } from 'jotai';
import { UserInfo, WorkspaceInfo } from 'shared/dist/dto';

export const UserContext = atom<UserInfo | null>(null);
export const WorkspaceContext = atom<WorkspaceInfo | null>(null);

export const useUserContext = () => useAtom(UserContext);
export const useWorkspaceContext = () => useAtom(WorkspaceContext);

export const useClearAuth = () => {
    const [, setUserContext] = useUserContext();
    const [, setWorkspaceContext] = useWorkspaceContext();

    return () => {
        setUserContext(null);
        setWorkspaceContext(null);
    };
};
