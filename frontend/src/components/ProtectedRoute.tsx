import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/auth.store";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
    const { isLoggedIn, logout, checkLogin, hasCheckLogin } = useAuthStore();
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        checkLogin();
    }, [checkLogin]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (hasCheckLogin && (!isLoggedIn || !token)) {
            logout();
            setShouldRedirect(true);
        }
    }, [hasCheckLogin, isLoggedIn, logout]);

    if (!hasCheckLogin) {
        return null; // or a loading spinner
    }

    if (shouldRedirect) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
