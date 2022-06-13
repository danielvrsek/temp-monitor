import React, { useEffect, useState } from 'react';
import { WorkspaceViewModel } from 'shared/dto';
import ApiClient from '../api/ApiClient';
import Error from '../common/Error';
import Loading from '../common/Loading';
import { ApiState } from '../components/common/apiHelper';
import WorkspaceListReady from '../components/workspace/WorkspaceListReady';

const AvailableWorkspaceListPage: React.FC = () => {
    const [availableWorkspaces, setAvailableWorkspaces] = useState<WorkspaceViewModel[]>([]);
    const [status, setStatus] = useState(ApiState.Loading);

    useEffect(() => {
        ApiClient.getUserAvailableWorkspaces().then((result) => {
            if (result.status !== 200) {
                setStatus(ApiState.Error);
                return;
            }

            setAvailableWorkspaces(result.data);
            setStatus(ApiState.Success);
        });
    }, []);

    switch (status) {
        case ApiState.Success:
            return <WorkspaceListReady data={availableWorkspaces} />;
        case ApiState.Error:
            return <Error content="Error" />;
        default:
            return <Loading />;
    }
};

export default AvailableWorkspaceListPage;
