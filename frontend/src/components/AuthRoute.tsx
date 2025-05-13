import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/auth.store";
import { useEffect, useState } from "react";

const AuthRoute = () => {
    const { isLoggedIn, checkLogin, hasCheckLogin } = useAuthStore();
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        checkLogin();
    }, [checkLogin]);

    useEffect(() => {
        if (hasCheckLogin && isLoggedIn) {
            setShouldRedirect(true);
        }
    }, [hasCheckLogin, isLoggedIn]);

    if (!hasCheckLogin) {
        return null; // or a loading spinner
    }

    if (shouldRedirect) {
        return <Navigate to="/exam" replace />;
    }

    return <Outlet />;
};

export default AuthRoute;
