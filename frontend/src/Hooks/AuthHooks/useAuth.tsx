import { useEffect, useState } from 'react'
import UserModel from "../../Models/userModel"
import { authStore } from "../../Redux/authState";
import authService from "../../Services/authService";

export default function useAuth() {
    const [user, setUser] = useState<UserModel>();
    
    useEffect(() => {
        const token = authStore.getState().token
        if (token) authService.verifyToken(token)
        
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => setUser(authStore.getState().user));
        return unsubscribe;
    }, [user]);

    return user
}
