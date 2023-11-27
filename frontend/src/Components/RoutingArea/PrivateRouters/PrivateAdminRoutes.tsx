import { Navigate, Outlet } from "react-router-dom"
import useAdmin from "../../../Hooks/AuthHooks/useAdmin"
import Loading from "../../Common/Loading/Loading"

interface IPrivateAdminRoutes {
    redirectPath: string,
    children?: JSX.Element,
}

function PrivateAdminRoutes({redirectPath, children}: IPrivateAdminRoutes) {
    const isAdmin = useAdmin();

    if (isAdmin === undefined) {
        return <Loading message={"Just loading a couple things"}/>
    }

    if (!children) {
        return !isAdmin ? <Navigate to={redirectPath}/> :  <Outlet/> 
        
    } else {
        return !isAdmin ? <Navigate to={redirectPath}/> :  children
    }

}

export default PrivateAdminRoutes