import { createContext, useEffect, useState } from "react";
import shared from "../utils/shared";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutePath } from "../utils/enum";
import { toast } from "react-toastify";

const initialUserValues ={
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    roleId: 0,
    role: "",
    password: "",
};

const initialValues = {
    setUser: () =>{},
    user: initialUserValues,
    logOut: () =>{}
};

export const authContext = createContext(initialValues)

export const AuthWrapper = ({children}) =>{
    const [user,_setUser] = useState(initialUserValues);
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const setUser = (userDetails) =>{
        localStorage.setItem(shared.LocalStorageKeys.USER, JSON.stringify(userDetails));
        _setUser(userDetails);
    }

    useEffect(()=>{
        const existingUser = JSON.parse(localStorage.getItem(shared.LocalStorageKeys.USER)) || initialUserValues
        if(!existingUser.id)
        {
            navigate(RoutePath.Login);
        }
        _setUser(existingUser);
    },[])

    useEffect(()=>{
        if (pathname === RoutePath.Login && user.id) {
            navigate(RoutePath.Home);
          }
        if(!user.id){
            //navigate(RoutePath.Login);
            return;
        }
        else{
            const hasAccess = shared.hasAccess(pathname, user)
            if(!hasAccess){
                navigate(RoutePath.Home);
                toast.error("You do not have access to this module..");
                return;
            }
        }
    },[pathname,user])

    const logOut =()=>{
        setUser(initialUserValues);
        localStorage.removeItem(shared.LocalStorageKeys.USER)
        navigate(RoutePath.Login);
    }

    return <authContext.Provider value={{
        user,
        setUser,
        logOut
    }}>{children}</authContext.Provider>
}

export const useAuthContext = () =>{
    return useContext(authContext)
}

