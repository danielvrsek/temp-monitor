import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../../api/ApiClient';

const CreateUser = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    function matchPassword() {
        if (verifyPassword !== password) {
            return <div style={{ color: 'red' }}>"Zadané hesla se neshodují"</div>;
        }
    }
    const submit = (e) => {
        e.preventDefault();
        ApiClient.register({ firstName, lastname, email, passwordRaw: password }).then(() => {
            window.location.reload();
        });
    };

    return (
        <div>
            <form className="ui form" style={{ marginTop: '10px' }}>
                <h4 className="ui dividing header">Registrovat</h4>
                <div className="field">
                    <label>Jméno</label>
                    <div className="two fields">
                        <div className="field">
                            <input
                                type="text"
                                name="shipping[first-name]"
                                placeholder="Jméno"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <input
                                type="text"
                                name="shipping[last-name]"
                                placeholder="Příjmení"
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label>Přihlašovací údaje</label>
                    <div className="fields">
                        <div className="twelve wide field">
                            <input
                                type="text"
                                name="shipping[address]"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label>Heslo</label>
                    <div className="fields">
                        <div className="field">
                            <input
                                type="password"
                                name="shipping[first-name]"
                                placeholder="Heslo"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <input
                                type="password"
                                name="password2"
                                placeholder="Ověření hesla"
                                onChange={(e) => setVerifyPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {matchPassword()}
                </div>

                <div className="ui button" onClick={submit}>
                    Registrovat
                </div>
            </form>
        </div>
    );
};

export default CreateUser;
