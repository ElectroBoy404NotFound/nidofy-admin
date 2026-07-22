import { createContext, useContext, useEffect, useState } from "react";
import { getUserData } from "../data/Api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function doCheck() {
            const token = localStorage.getItem("authToken");
            if(!token) {
                setLoading(false);
                return;
            }

            const userData = await getUserData(token);
            if("error" in userData) {
                localStorage.removeItem("token");
                setUser(null);
                setLoading(false);
                return;
            }

            setUser(userData);
            setLoading(false);
        }
        doCheck();
    });

    const authLoginFunc = async (token) => {
        localStorage.setItem("authToken", token);
        const userData = await getUserData(token);
        if("error" in userData) {
            localStorage.removeItem("token");
            setUser(null);
            return;
        }

        setUser(userData);
    };

    const authLogoutFunc = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isAuthenticated: !!user,
            authLoginFunc,
            authLogoutFunc
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
