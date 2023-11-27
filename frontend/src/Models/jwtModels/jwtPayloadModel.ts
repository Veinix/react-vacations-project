import UserModel from "../userModel";
import JwtToken from "./jwtModel";

export default class JwtPayload {
    user: UserModel
    token: JwtToken
}
