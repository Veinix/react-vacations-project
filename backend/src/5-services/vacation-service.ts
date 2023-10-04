import { ResourceNotFoundError, ValidationError } from "../3-models/error-models";
import { IVacationModel, VacationModel } from "../3-models/vacation-model";

async function getAllVacations(): Promise<IVacationModel[]> {
    return VacationModel.find().exec();
}

async function getSingleVacation(_id: string): Promise<IVacationModel> {
    const vacation = await VacationModel.findById(_id).exec();
    if (!vacation) throw new ResourceNotFoundError(_id);
    return vacation;
}

async function getVacationFollowers(_id: string): Promise<number> {
    const followers = await VacationModel.countDocuments({ followedVacations: _id }).exec();
    return followers;
}

async function addVacation(vacation: IVacationModel): Promise<IVacationModel> {
    const errors = vacation.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return vacation.save();
}

async function updateVacation(vacation: IVacationModel): Promise<IVacationModel> {
    const errors = vacation.validateSync();
    if (errors) throw new ValidationError(errors.message)
    return VacationModel.findByIdAndUpdate(vacation._id, vacation, { returnOriginal: false }).exec();
}

async function deleteVacation(_id: string): Promise<void> {
    const deleteVacation = await VacationModel.findByIdAndDelete(_id).exec();
    if (!deleteVacation) throw new ResourceNotFoundError(_id);
    await VacationModel.findByIdAndDelete(_id).exec();
}


export default {
    getAllVacations,
    getSingleVacation,
    addVacation,
    updateVacation,
    deleteVacation,
    getVacationFollowers
}
