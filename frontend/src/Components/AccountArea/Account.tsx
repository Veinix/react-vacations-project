import React from 'react'
import authService from "../../Services/authService";
import notificationService from "../../Services/notificationService";
import { useNavigate } from "react-router-dom";

function Account() {

    const navigate = useNavigate();
    function logoutUser(): void {
        authService.logout();
        notificationService.success("You have been logged out");
        navigate("/")
    }
    
    return (
        <>
            <h2 className="text-3xl md:text-5xl mb-4 font-extrabold"> Account Area</h2>
            <button onClick={logoutUser} className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded w-20 h-10 flex items-center justify-center"> Logout </button>
        </>
    )
}

export default Account