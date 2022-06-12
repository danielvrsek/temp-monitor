import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../context/AuthContext';

const FooterNavBar = () => {
    const [userContext] = useUserContext();
    return (
        <div className="footer">
            <div className="ui center aligned container">
                <div className="ui stackable inverted divided grid">
                    <div className="four wide column">
                        <NavLink to="/in-development" id="inherit-buttom">
                            <h4>Kontakty</h4>
                        </NavLink>
                    </div>
                    <div className="four wide column">
                        <NavLink to="/in-development" id="inherit-buttom">
                            <h4>Volná pracovní místa</h4>
                        </NavLink>
                    </div>
                    <div className="four wide column">
                        <NavLink to="/in-development" id="inherit-buttom">
                            <h4>Hledáme obchodní partnery</h4>
                        </NavLink>
                    </div>
                    <div className="four wide column">
                        <NavLink to="/in-development" id="inherit-buttom">
                            <h4>E-shop</h4>
                        </NavLink>
                    </div>
                </div>
                <div className="ui inverted section divider"></div>

                <div className="ui horizontal small divided link list" style={{ marginTop: '-10px' }}>
                    {userContext === null ? (
                        <NavLink to="/login" className="item">
                            <h4>Přihlášení</h4>
                        </NavLink>
                    ) : (
                        ''
                    )}
                    <NavLink to="/in-development" className="item">
                        <div href="/" className="item">
                            Obchodní podmínky
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default FooterNavBar;
