import { Document, Schema, model, Types } from "mongoose";

export interface IUserModel extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: number;
    vacationsFollowed: Types.ObjectId[];
}

const UserSchema = new Schema<IUserModel>({
    firstName: {
        type: String,
        required: [true, "Missing first name"],
        maxlength: [100, "First name is too long"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Missing last name"],
        maxlength: [100, "Last name is too long"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Missing email"],
        maxlength: [100, "Email is too long"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Missing password"],
        minlength: [4, "Password is too short"],
    },
    roleId: {
        type: Number,
        required: [true, "Missing user role"]
    },
    vacationsFollowed: {
        type: [Types.ObjectId],
    }
}, { versionKey: false, toJSON: { virtuals: true }, toObject: { virtuals: true } })


const UserModel = model<IUserModel>("UserModel", UserSchema, "users")
export default UserModel