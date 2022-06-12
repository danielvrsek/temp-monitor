import React, { useEffect, useState } from 'react';
import Error from '../admin_console/components/core/Error';
import Loading from '../admin_console/components/core/Loading';
import WorkspaceListReady from '../admin_console/components/workspace/WorkspaceListReady';
import ApiClient from '../api/ApiClient';
import { ApiState } from '../components/common/apiHelper';

const AvailableWorkspaceListPage = () => {
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

export default AvailableWorkspaceListPage;
