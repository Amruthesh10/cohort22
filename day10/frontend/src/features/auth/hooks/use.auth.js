import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {login,register,getMe} from "../services/auth.api";

export const useAuth=()=>{
    const context=useContext(AuthContext)
    const {user,loading,setuser,setloading}=context

    const handlelogin=async(username,password)=>{
        setloading(true)
        const response=await login(username,password)
        setuser(response.user)
        setloading(false)
    }
    const handleregister=async(username,email,password)=>{
        setloading(true)
        const response=await register(username,email,password)
        setuser(response.user)
        setloading(false)
    }
    return {
        user,
        loading,
        handlelogin,
        handleregister
    }
}   