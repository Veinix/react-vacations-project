import { Outlet, createBrowserRouter } from "react-router-dom";
import Layout from "../LayoutArea/Layout";
import GeneralErrors from "../Common/GeneralErrors/GeneralErrors";
import VacationsPage from "../VacationArea/VacationsPage/VacationsPage";
import Homepage from "../LayoutArea/Homepage/Homepage";
import LoginForm from "../AuthArea/LoginForm/LoginForm";
import RegisterForm from "../AuthArea/RegisterForm/RegisterForm";
import Account from "../AccountArea/Account";
import EditVacation from "../VacationArea/EditVacation/EditVacation";
import PrivateRoutes from "./PrivateRouters/PrivateRoutes";
import PrivateAdminRoutes from "./PrivateRouters/PrivateAdminRoutes";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <GeneralErrors />,
        children: [{
            element: <Outlet />,
            errorElement: <GeneralErrors />,
            children: [
                { index: true, element: <Homepage /> },
                {
                    path: "vacations",
                    element: <PrivateRoutes/>,
                    children: [
                        {
                            index: true,
                            element: <VacationsPage />
                        },
                        {
                            path: "edit/:vacationId",
                            element:
                                <PrivateAdminRoutes redirectPath={"/vacations"}>
                                    <EditVacation />
                                </PrivateAdminRoutes>
                        },
                    ]
                },
                { path: "login", element: <LoginForm /> },
                { path: "register", element: <RegisterForm /> },
                {
                    path: "account",
                    element:
                        <PrivateRoutes>
                            <Account />
                        </PrivateRoutes>
                },
            ]
        }],
    },
]);