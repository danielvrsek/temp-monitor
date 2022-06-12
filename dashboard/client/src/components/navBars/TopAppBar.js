import React, { useContext } from 'react';
import { useWorkspaceContext } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import UserLogedIn from '../login/UserLogedIn';

export default function MenuAppBar() {
    const [workspaceContext] = useWorkspaceContext();
    const [userContext] = useContext();

    return (
        <div>
            <div className="ui secondary pointing menu">
                <NavLink to="/" className="item">
                    <h4>Hlavní stránka</h4>
                </NavLink>

                <NavLink to="/customer-info" className="item">
                    <h4>Zákaznické prostředí</h4>
                </NavLink>

                {userContext ? (
                    <NavLink to="/workspaces" className="item">
                        <h4>Dostupné zóny</h4>
                    </NavLink>
                ) : (
                    <></>
                )}
                {workspaceContext && workspaceContext.roles.some((x) => x === 'User') ? (
                    <NavLink to="/workspace" className="item">
                        <h4>Klientská sekce</h4>
                    </NavLink>
                ) : (
                    <></>
                )}
                <div className="right menu">
                    <div className="ui item">
                        <UserLogedIn />
                    </div>
                    <div className="ui item" style={{ marginRight: '30px' }}>
                        <h2>- MeteoStanice -</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
