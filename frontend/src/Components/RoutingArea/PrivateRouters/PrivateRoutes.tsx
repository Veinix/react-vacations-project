import { Navigate, Outlet, useLoaderData } from "react-router-dom"
import useAuth from "../../../Hooks/AuthHooks/useAuth";
import Loading from "../../Common/Loading/Loading";
import PleaseLogIn from "../../Common/PleaseLogIn/PleaseLogIn";

interface IPrivateRoutes {
    children?: JSX.Element
}

export default function PrivateRoutesHandler({ children }: IPrivateRoutes) {
    const [user] = useAuth();
    
    if (user === undefined) {
        return <Loading message={"Hold up while find our vacations"}/>
    }

    if (!children) {
        return !user ?  <PleaseLogIn/> : <Outlet/>
    } else {
        return !user ?  <PleaseLogIn/> : children
    }
}
