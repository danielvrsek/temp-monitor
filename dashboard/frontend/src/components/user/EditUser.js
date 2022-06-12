import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiClient from '../../api/ApiClient';

const EditUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [userEdit, setUserEdit] = useState({
        name: '',
        surname: '',
        role: '',
        email: '',
    });

    useEffect(() => {
        ApiClient.getUser(id).then((res) => {
            setUserEdit(res.data);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value, email, surname, role } = e.target;
        setUserEdit((prevState) => ({
            ...prevState,
            [name]: value,
            [surname]: value,
            [email]: value,
            [role]: value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();

        ApiClient.editUser(id, {
            email: userEdit.email,
            name: userEdit.name,
            role: userEdit.role,
            surname: userEdit.surname,
        }).then(() => navigate('/'));
    };

    return (
        <div className="ui middle aligned container" style={{ width: '600px' }}>
            {userEdit === undefined ? (
                <div> Nenašeli jsme uživatele, kterého hledáte.</div>
            ) : (
                <form className="ui form" style={{ marginTop: '50px' }}>
                    <h4 className="ui dividing header">Editovat uživatele</h4>
                    <div className="field">
                        <label>Jméno</label>
                        <div className="two fields">
                            <div className="field">
                                <input type="text" name="name" onChange={handleChange} value={userEdit.name} />
                            </div>
                            <div className="field">
                                <input type="text" name="surname" value={userEdit.surname} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label>Přihlašovací údaje</label>
                        <div className="fields">
                            <div className="twelve wide field">
                                <input type="text" name="email" value={userEdit.email} onChange={handleChange} />
                            </div>
                            <div className="four wide field">
                                <select onChange={handleChange}>
                                    <option value="role">{userEdit.role}</option>
                                    <option value="role">User</option>
                                    <option value="role">Admin</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/*  <div className="field">
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
        </div> */}

                    <div className="ui button" onClick={submit}>
                        Potvrdit
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditUser;
