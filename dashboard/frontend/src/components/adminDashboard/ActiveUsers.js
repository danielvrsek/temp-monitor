import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ApiClient from '../../api/ApiClient';

const ActiveUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        ApiClient.getUsers().then((res) => {
            setUsers(res.data);
        });
    }, []);

    return (
        <div className="ui cards" style={{ marginTop: '50px' }}>
            {users.length === 0 ? (
                <div> Relace vypršela prosím přihlašte se znovu</div>
            ) : (
                users.map((user, i) => {
                    return (
                        <div className="card" key={i}>
                            <div className="content">
                                <img
                                    className="right floated mini ui image"
                                    src="https://semantic-ui.com/images/avatar/large/elliot.jpg"
                                    alt="avatar"
                                />
                                <div className="header">{user.name}</div>
                                <div className="meta">{user.email}</div>
                                <div className="description">
                                    <p>
                                        Tento učet je v režimu: <b>TODO</b>
                                    </p>
                                </div>
                            </div>
                            <div className="extra content">
                                <div className="ui two buttons">
                                    <NavLink to={`/edit/${user._id}`} className="ui basic green button">
                                        Editovat
                                    </NavLink>
                                    <NavLink to={`/delete/${user._id}`} className="ui basic red button">
                                        Odstranit
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default ActiveUsers;
