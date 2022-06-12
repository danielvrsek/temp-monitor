import WorkspaceListReady from '../components/workspace/WorkspaceListReady';
import Error from '../components/core/Error';
import Loading from '../components/core/Loading';
import React, { useEffect, useState } from 'react';
import ApiClient from '../../api/ApiClient';
import { ApiState } from '../../components/common/apiHelper';

const WorkspaceListPage = () => {
    const [availableWorkspaces, setAvailableWorkspaces] = useState(null);
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

export default WorkspaceListPage;
