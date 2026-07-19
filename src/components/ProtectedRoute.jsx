import { useAuth } from "../providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated) {
        return <Navigate to="/loin" replace />
    }

    return (
        <>
            <main>
                <Outlet />
            </main>
        </>
    );
}