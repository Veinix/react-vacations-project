import { useState, useEffect } from "react";
import { authStore } from "../../Redux/authState";
import RoleModel from "../../Models/rolesModel";

export default function useAdmin() {
    const [isAdmin, setIsAdmin] = useState<boolean>();

    useEffect(() => {
        const user = authStore.getState().user;
        user.roleId === RoleModel.Admin ? setIsAdmin(true) : setIsAdmin(false);
    }, []);

    return [isAdmin]
}
