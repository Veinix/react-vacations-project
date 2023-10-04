import { useEffect, useState } from 'react'
import UserModel from "../../Models/userModel"
import { authStore } from "../../Redux/authState";

export default function useAuth() {
    const [user, setUser] = useState<UserModel>();
    
    useEffect(() => {
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => setUser(authStore.getState().user));
        return unsubscribe;
    }, [user]);

    return [user]
}
