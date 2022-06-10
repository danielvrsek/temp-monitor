import React from "react";
import { useNavigate } from "react-router-dom";
import { useClearAuth } from "../context/AuthContext";
import ApiClient from "../../api/ApiClient";

const Logout = () => {
    const clearAuth = useClearAuth();
    const navigate = useNavigate();

    const submit = () => {
        clearAuth();
        navigate("/");
        ApiClient.logout();
    };

    return (
        <div>
            <h2>Opravdu se chcete odhlásit?</h2>
            <button className="ui left floated button" onClick={submit}>
                Odhlásit se
            </button>
        </div>
    );
};

export default Logout;
