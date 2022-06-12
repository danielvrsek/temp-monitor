import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/AuthContext';
import Logout from '../logOut/Logout';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { getBasePath } from '../utils/pathHelper';

const UserLogedIn = () => {
    const [userContext] = useUserContext();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastname, setLastname] = useState();
    const [profilePhotoUrl, setProfilePhotoUrl] = useState();

    useEffect(() => {
        if (!userContext) {
            setIsAuthenticated(false);
            return;
        }

        setFirstName(userContext.firstName);
        setLastname(userContext.lastname);
        setProfilePhotoUrl(`${getBasePath()}/users/profile-photo/${userContext.profilePhotoUrl}`);
        setIsAuthenticated(true);
    }, [userContext]);

    return (
        <>
            {isAuthenticated ? (
                <div>
                    <Stack direction="row" spacing={2}>
                        <Avatar alt="Profile photo" src={profilePhotoUrl} />

                        <h3 style={{ marginTop: '8px' }}>
                            {firstName} {lastname}
                        </h3>
                        <div style={{ marginTop: '5px' }}>
                            <Logout />
                        </div>
                    </Stack>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default UserLogedIn;
