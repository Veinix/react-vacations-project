import { Navigate, Outlet, useLoaderData } from "react-router-dom"
import useAuth from "../../../Hooks/AuthHooks/useAuth";
import PleaseLogIn from "../../Common/PleaseLogIn/PleaseLogIn";

interface IPrivateRoutes {
    children?: JSX.Element
}

export default function PrivateRoutesHandler({ children }: IPrivateRoutes) {
    const user = useAuth();
    
    if (!children) {
        return !user ?  <PleaseLogIn/> : <Outlet/>
    } else {
        return !user ?  <PleaseLogIn/> : children
    }
}
