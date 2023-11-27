import cyber from "../2-utils/cyber";
import { UnauthorizedError, ValidationError } from "../3-models/error-models";
import RoleModel from "../3-models/role-model";
import UserModel, { IUserModel } from "../3-models/user-model";
import CredentialsModel from "../3-models/credential-model";

async function register(user: IUserModel): Promise<string> {

    user.validateSync();
    user.roleId = RoleModel.User;

    if (await isEmailTaken(user.email)) throw new ValidationError(`Email "${user.email}" has been taken.`);

    const data = await user.save()
    user._id = data._id;

    const token = cyber.getNewToken(user);
    return token;
}

async function login({ email, password }: CredentialsModel): Promise<string> {

    const users = await UserModel.find({ email: email, password: password }).exec()
    const user = users[0];

    if (!user) throw new UnauthorizedError("Incorrect email or password.");

    const token = cyber.getNewToken(user);
    return token;
}

async function isEmailTaken(email: string): Promise<boolean> {
    const data = await UserModel.find({ email: email }).exec()
    const count = data.length;
    console.log(count);
    return count > 0;
}

async function makeAdmin(): Promise<boolean> {
    return false;
}

export default {
    register,
    login
};
