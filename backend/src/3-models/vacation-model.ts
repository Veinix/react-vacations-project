import { Document, Schema, model } from "mongoose";
import { IUserModel } from "./user-model";

export interface IVacationModel extends Document {
    destination: string;
    description: string;
    startDate: Date;
    endDate: Date;
    price: number;
    imageName: string;
}

export const VacationSchema = new Schema<IVacationModel>({
    destination: {
        type: String,
        required: [true, "Missing destination."],
        minlength: [2, "Destination must be a minimum of 2 chars."],
        maxlength: [100, "Destination cannot exceed 100 chars"],
    },
    description: {
        type: String,
        required: [true, "Missing description."],
        minlength: [10, "Description must be a minimum of 10 chars."],
        maxlength: [500, "Description cannot exceed 500 chars"],
    },
    startDate: {
        type: Date,
        required: [true, "Missing start date."],
    },
    endDate: {
        type: Date,
        required: [true, "Missing end date."],
    },
    price: {
        type: Number,
        required: [true, "Missing price."],
        min: [0, "Price cannot be negative."],
    },
    imageName: {
        type: String,
        required: [true, "Missing image name."],
    },
}, { versionKey: false, toJSON: { virtuals: true }, toObject: { virtuals: true } });

export const VacationModel = model<IVacationModel>("VacationModel", VacationSchema, "vacations");
