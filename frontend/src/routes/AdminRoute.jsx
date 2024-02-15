import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Spinner from "../components/Spinner";

const AdminRoute = () => {
    const { auth } = useSelector((state) => state.auths);
    const { user } = useSelector((state) => state.users);

    // when user is admin(user.role === 1)
    return auth && user.role === 1 ? <Outlet /> : <Spinner />;
};

export default AdminRoute;
