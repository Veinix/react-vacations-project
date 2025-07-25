import axios from "axios";
import appConfig from "../Utilities/appConfig";
import UserModel from "../Models/userModel";
import CredentialsModel from "../Models/credentialsModel";
import { AuthAction, AuthActionType, authStore } from "../Redux/authState";
import jwtDecode from "jwt-decode";
import JwtToken from "../Models/jwtModels/jwtModel";
import notificationService from "./notificationService";

class AuthService {

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(appConfig.registerEndpoint, user);
        const token = response.data;
        const action: AuthAction = { type: AuthActionType.Register, payload: token };
        authStore.dispatch(action);
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(appConfig.loginEndpoint, credentials);
        const token = response.data;
        const action: AuthAction = { type: AuthActionType.Login, payload: token };
        authStore.dispatch(action);
    }

    public logout(): void {
        const action: AuthAction = { type: AuthActionType.Logout };
        authStore.dispatch(action);
    }

    public verifyToken(token: string): void {
        const decodedToken: JwtToken = jwtDecode(token)
        const hasExpired = new Date(decodedToken.exp * 1000) < new Date() ? true : false;
        if (hasExpired) {
            const action: AuthAction = { type: AuthActionType.SessionExpired };
            authStore.dispatch(action)
        }
    }

}

const authService = new AuthService();
export default authService;
