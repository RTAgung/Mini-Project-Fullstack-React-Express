import { Outlet } from "react-router-dom";
import useAuthStore from "../stores/auth.store";
import { useEffect } from "react";

const PublicRoute = () => {
    const { checkLogin } = useAuthStore();

    useEffect(() => {
        checkLogin();
    }, [checkLogin]);

    return <Outlet />;
};

export default PublicRoute;
