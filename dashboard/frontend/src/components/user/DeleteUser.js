import React from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import ApiClient from '../../api/ApiClient';

const DeleteUser = () => {
    const { id } = useParams();

    const deleteUser = async () => ApiClient.deleteUser(id);

    return (
        <div className="ui middle aligned container" style={{ marginTop: '50px', width: '400px' }}>
            <div className="ui negative message">
                <div className="header">Opravdu chcete smazat tento účet?</div>
                <p>Budou vymazána všechna data.</p>
            </div>
            <div className="extra content">
                <div className="ui two buttons">
                    <div className="ui basic green button" onClick={deleteUser}>
                        ANO
                    </div>
                    <NavLink to="/admin" className="ui basic red button">
                        NE
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default DeleteUser;
