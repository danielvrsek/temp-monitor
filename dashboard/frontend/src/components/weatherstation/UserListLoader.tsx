import React, { useEffect, useState } from 'react';
import { UserViewModel } from 'shared/dto';
import ApiClient from '../../api/ApiClient';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import UserList from './UserList';

const UserListLoader: React.FC = () => {
    const [users, setUsers] = useState<UserViewModel[] | null>(null);
    const [error, setError] = useState();

    useEffect(() => {
        ApiClient.getCurrentWorkspaceUsers()
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    if (error) {
        return <Error content={error} />;
    }

    if (!users) {
        return <Loading />;
    }

    return <UserList data={users} />;
};

export default UserListLoader;
