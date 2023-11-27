import { createStore } from "redux";
import jwtDecode from "jwt-decode";
import UserModel from "../Models/userModel";
import notificationService from "../Services/notificationService";

export class AuthState {
    public token: string = null;
    public user: UserModel = null;
    public constructor() {
        this.token = localStorage.getItem("sessionToken");
        if (this.token) {
            this.user = jwtDecode<{ user: UserModel }>(this.token).user;
        }
    }
}

export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout",
    SessionExpired = "SessionExpired",
}

export interface AuthAction {
    type: AuthActionType;
    payload?: string;
}

export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:
            newState.token = action.payload;
            newState.user = jwtDecode<{ user: UserModel }>(newState.token).user;
            localStorage.setItem("sessionToken", newState.token);
            break;
        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("sessionToken");
            break;
        case AuthActionType.SessionExpired:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("sessionToken");
            notificationService.info("Your session has expired, please login again")
            break;
    }

    return newState;
}

// 5. Store:
export const authStore = createStore(authReducer);
