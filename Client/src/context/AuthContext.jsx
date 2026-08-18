import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const[token, setToken] = useState(null);
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[user, setUser] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");

        if(savedToken) {
            setToken(savedToken);
            setIsLoggedIn(true);
        }
    },[]);

    useEffect(() => {
        if(token){
            getUser();
        }
    },[token]);

    const getUser = async(savedToken) => {
        try{
            const response = await axios.get('http://localhost:3000/user/profile', 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setUser(response.data.user);
            console.log(response.data.user);
        }
        catch(e){
            console.log(e.message);
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setIsLoggedIn(false);
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{token, isLoggedIn, user, getUser, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
