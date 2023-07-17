import AuthContext from "./AuthContext";
import { useState } from "react";

const AuthProvider = ({ children }) => {
    const isTokenExist = Boolean(localStorage.getItem("userToken"))
    const [isAuthorized, setIsAuthorized] = useState(isTokenExist);

    const setAuthorized = () => setIsAuthorized(true);
    const setUnAuthorized = () => setIsAuthorized(false);

    return (
        <AuthContext.Provider value={{ isAuthorized, setAuthorized, setUnAuthorized }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
