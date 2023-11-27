import { ResourceNotFoundError, ValidationError } from "../3-models/error-models";
import UserModel, { IUserModel } from "../3-models/user-model";
import { IVacationModel, VacationModel } from "../3-models/vacation-model";
import mongoose, { Types } from "mongoose";
import jwtDecode from "jwt-decode";

async function readVacations(): Promise<IVacationModel[]> {
    return VacationModel.find().exec();
}

async function readSingleVacation(_id: string): Promise<IVacationModel> {
    const vacation = await VacationModel.findById(_id).exec();
    if (!vacation) throw new ResourceNotFoundError(_id);
    return vacation;
}

async function readSingleVacationsFollowers(_id: string): Promise<any> {

    const aggregationPipeline = [
        {
            $unwind: "$vacationsFollowed",
        },
        {
            $group: {
                _id: null, // Group all results into a single group
                count: {
                    $sum: {
                        $cond: [{ $eq: ["$vacationsFollowed", new mongoose.Types.ObjectId(_id)] }, 1, 0],
                    },
                },
            },
        },
        {
            $project: {
                _id: 0,
                count: 1,
            },
        },
    ];

    const followerArray = await UserModel.aggregate(aggregationPipeline).exec();
    return followerArray[0].count;
}

async function readAllVacationsFollowers(): Promise<{ vacationId: string, vacationInfo: string, vacationFollowers: number }[]> {
    const aggregationPipeline = [
        {
            $unwind: "$vacationsFollowed"
        },
        {
            $group: {
                _id: "$_id",
                uniqueValues: {
                    $addToSet: "$vacationsFollowed",
                },
            },
        },
        {
            $project: {
                _id: 1,
                count: { $size: "$uniqueValues" },
            },
        },
    ];


    const vacationFollowers = await UserModel.aggregate(aggregationPipeline).exec();
    return vacationFollowers
}

async function createVacation(vacation: IVacationModel): Promise<IVacationModel> {
    const errors = vacation.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return vacation.save();
}

async function updateVacation(vacation: IVacationModel): Promise<IVacationModel> {
    const errors = vacation.validateSync();
    if (errors) throw new ValidationError(errors.message)
    return VacationModel.findByIdAndUpdate(vacation._id, vacation, { returnOriginal: false }).exec();
}

async function updateUsersFollowedVacations(vacationId: string, userToken: string): Promise<void> {
    const userId = jwtDecode<{ user: IUserModel }>(userToken).user.id;
    const objectId = new Types.ObjectId(vacationId);
    const user = await UserModel.findById(userId).exec();
    if (user.vacationsFollowed.includes(objectId)) {
        await UserModel.findByIdAndUpdate(userId, { $pull: { vacationsFollowed: objectId } }).exec();
        return
    };
    await UserModel.findByIdAndUpdate(userId, { $push: { vacationsFollowed: objectId } }).exec();
}

async function deleteVacation(_id: string): Promise<void> {
    const deleteVacation = await VacationModel.findByIdAndDelete(_id).exec();
    if (!deleteVacation) throw new ResourceNotFoundError(_id);
    await VacationModel.findByIdAndDelete(_id).exec();
}

export default {
    createVacation,
    readVacations,
    readSingleVacation,
    readSingleVacationsFollowers,
    readAllVacationsFollowers,
    updateVacation,
    updateUsersFollowedVacations,
    deleteVacation,
}
