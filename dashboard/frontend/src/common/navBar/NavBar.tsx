import React from 'react';
import { NavLink } from 'react-router-dom';
import { useWorkspaceContext } from '../contexts/AuthContext';
import NavUser from './NavUser';

const NavBar = () => {
    const [workspaceContext] = useWorkspaceContext();

    return (
        <div>
            <div className="ui secondary pointing menu">
                <NavLink to="/" className="item">
                    <h4>Hlavní stránka</h4>
                </NavLink>

                {workspaceContext ? (
                    <NavLink to="/workspace" className="item">
                        <h4>Klientská sekce</h4>
                    </NavLink>
                ) : (
                    <></>
                )}
                <div className="right menu">
                    <div className="ui item">
                        <NavUser />
                    </div>
                    <div className="ui item" style={{ marginRight: '30px' }}>
                        <h2>- MeteoStanice -</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
