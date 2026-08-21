import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({children}) => {
    const{isLoggedIn, user, authLoading} = useContext(AuthContext);

    console.log("AdminRoute:", isLoggedIn, user);

    if(authLoading){
        return <p className="text-center mt-5">Checking authentication...</p>;
    }

    if(!isLoggedIn){
        return <Navigate to="/login" replace />
    }
    if(user?.role !== "admin" ){
        return <Navigate to='/' replace />
    }
    return children;
}

export default AdminRoute;