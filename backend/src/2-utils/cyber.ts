import { ForbiddenError, UnauthorizedError } from "../3-models/error-models";
import RoleModel from "../3-models/role-model";
import { IUserModel } from "../3-models/user-model";
import jwt from "jsonwebtoken";
import appConfig from "./app-config";

const tokenSecretKey = appConfig.tokenKey

function getNewToken(user): string {
    const payload = user.toJSON()
    const container = { user: payload }
    const options = { expiresIn: "3h" };
    const token = jwt.sign(container, tokenSecretKey, options);
    return token;
}

function verifyToken(token: string): void {
    if (!token) throw new UnauthorizedError("Missing JWT token.");

    try {
        jwt.verify(token, tokenSecretKey);
    }
    catch (err: any) {
        throw new UnauthorizedError(err.message);
    }
}

function verifyAdmin(token: string): void {
    verifyToken(token);

    const payload = jwt.verify(token, tokenSecretKey) as { user: IUserModel };
    const user = payload.user;

    if(user.roleId !== RoleModel.Admin) throw new ForbiddenError("You are not an admin");
}

export default {
    getNewToken,
    verifyToken,
    verifyAdmin
};