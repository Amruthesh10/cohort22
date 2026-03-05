import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../auth.context";
import { register,login,logout,getme} from "../services/auth.api";

export const useAuth=()=>{
    const context=useContext(AuthContext)
    const {user,setUser,loading,setLoading}=context

    async function handleRegister({username,email,password}) {
        setLoading(true)
        const data=await register({username,email,password})
        setUser(data.user)
        setLoading(false) 
    }
      async function handleLogin({username,email,password}) {
        setLoading(true)
        const data=await login({username,email,password})
        setUser(data.user)
        setLoading(false) 
    }
     async function handlegetme() {
        setLoading(true)
        const data=await getme()
        setUser(data.user)
        setLoading(false) 
    }
    
      async function handleLogout() {
        setLoading(true)
        const data=await logout()
        setUser(null)
        setLoading(false) 
    }
return({
    user,loading,handleLogin,handleRegister,handleLogout,handlegetme
})
}