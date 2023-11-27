import React from 'react'
import authService from "../../Services/authService";
import notificationService from "../../Services/notificationService";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/AuthHooks/useAuth";

function Account() {
    const user = useAuth();
    const navigate = useNavigate();

    function logoutUser(): void {
        authService.logout();
        notificationService.success("You have been logged out");
        navigate("/")
    }

    function forgotPassword() {
        alert("Forgot password")
    }

    return (
        <>
            <h2 className="text-3xl md:text-5xl mb-4 font-extrabold"> Account Area</h2>
            <div className="sm:max-w-lg bg-white border-2 border-solid border-black rounded-xl py-4 pl-2 pr-6 flex flex-col">
                <table>
                    <tbody>
                        <tr className="py-4">
                            <td className="px-4 py-2"> First Name </td>
                            <td className="bg-slate-50 border-zinc-100 border-2 px-4 py-2"> {user?.firstName} </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2"> Last Name </td>
                            <td className="bg-slate-50 border-zinc-100 border-2 px-4 py-2"> {user?.lastName} </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2"> Email </td>
                            <td className="bg-slate-50 border-zinc-100 border-2 px-4 py-2"> {user?.email} </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex gap-16 justify-center pt-4">
                    <button onClick={forgotPassword} className="flex items-center justify-center bg-yellow-300 hover:bg-yellow-400 font-semibold text-black hover:text-white mt-4 mb-2 mx-2 py-2 px-4 w-44 h-10 border-yellow-400 border-2 rounded-lg "> Forgot Password? </button>
                    <button onClick={logoutUser} className="flex items-center justify-center bg-white hover:bg-black font-semibold text-black hover:text-white mt-4 mb-2 mx-2 py-2 px-4 w-28 h-10 border border-black rounded-lg "> Logout </button>
                </div>
            </div>
        </>
    )
}

export default Account