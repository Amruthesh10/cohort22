import {createBrowserRouter} from "react-router"
import Login from "./features/auth/Pages/Login"
import Register from "./features/auth/Pages/Register"
import Protected  from "./features/auth/Component/Protected"
import Home from "./features/home/pages/Home"
import SongPage from "./features/home/pages/songpage"

export const router=createBrowserRouter([
    {
        path:'/',
        element:<Home/>//<Protected><Home/></Protected>
    },
     {
        path:'/create',
        element:<Protected><SongPage/></Protected>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    }
])