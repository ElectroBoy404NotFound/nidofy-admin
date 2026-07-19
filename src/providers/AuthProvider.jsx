import { createContext, useContext, useEffect, useState } from "react";
import { getUserData } from "../data/Api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if(!token) {
            setLoading(false);
            return;
        }

        const userData = getUserData(token);
        if("error" in userData) {
            localStorage.removeItem("token");
            setUser(null);
            return;
        }

        setUser(userData);
        setLoading(false);
    });

    const login = (token, userData) => {
        localStorage.setItem("token", token);
        setUser(null);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isAuthenticated: !!user,
            login,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
