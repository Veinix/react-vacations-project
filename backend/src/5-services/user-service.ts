import { ResourceNotFoundError } from "../3-models/error-models";
import UserModel, { IUserModel } from "../3-models/user-model";

async function getAllUsers(): Promise<IUserModel[]> {
    return UserModel.find().exec();
}

async function getUser(_id: string): Promise<IUserModel> {
    const user = await UserModel.findById(_id).exec();
    if(!user) throw new ResourceNotFoundError(_id);
    return user;
}

export default {
    getUser,
    getAllUsers,
}