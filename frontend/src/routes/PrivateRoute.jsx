import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../components/Spinner";

const PrivateRoute = (props) => {
    const { auth } = useSelector((state) => state.auths);
    const {user}=useSelector((state)=>state.users);

    console.log(`${auth}`)
    // if it user not admin
    return (auth && user.role === 0)?<Outlet /> : <Spinner />
};

export default PrivateRoute;
