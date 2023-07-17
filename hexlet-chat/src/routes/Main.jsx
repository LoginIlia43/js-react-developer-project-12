import React, { useContext, useEffect } from "react";
import AuthContext from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

function Main() {
    const { isAuthorized } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthorized) {
            navigate("/login")
        }
    })

    return <div>main</div>
}

export default Main;
