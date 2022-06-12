import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../context/AuthContext';

const Profile = () => {
    const [userContext] = useUserContext();

    return (
        <div className="card">
            <div className="content">
                <img
                    className="right floated mini ui image"
                    src="https://semantic-ui.com/images/avatar/large/elliot.jpg"
                    alt="avatar"
                />
                <div className="header">
                    {userContext.name} {userContext.surname}
                </div>
                <div className="meta">{userContext.email}</div>
                <div className="description">
                    <p>
                        Tento učet je v režimu: <b>TODO</b>
                    </p>
                </div>
            </div>
            <div className="extra content">
                <div className="ui two buttons">
                    <NavLink to={`/edit/${userContext.userId}`} className="ui basic green button">
                        Editovat
                    </NavLink>
                    <NavLink to={`/delete/${userContext.userId}`} className="ui basic red button">
                        Odstranit
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Profile;
