import axios from "axios";
import VacationModel from "../Models/vacationModel";
import appConfig from "../Utilities/appConfig";
import { VacationsAction, VacationsActionType, vacationStore } from "../Redux/vacationState";

class VacationService {

    public async readAllVacations(): Promise<VacationModel[]> {
        let vacations = vacationStore.getState().vacations;

        if (vacations.length === 0) {
            
            const response = await axios.get<VacationModel[]>(appConfig.vacationsEndpoint);
            vacations = response.data

            const action: VacationsAction = { type: VacationsActionType.SetVacations, payload: vacations };
            vacationStore.dispatch(action)
        }

        return vacations;
    }

    public async readSingleVacation(_id: string): Promise<VacationModel> {
        const vacations = vacationStore.getState().vacations;
        let singleVacation = vacations.find(p => p._id === _id);

        if (!singleVacation) {
            const response = await axios.get<VacationModel>(appConfig.vacationsEndpoint + _id)
            singleVacation = response.data
        }

        return singleVacation
    }



    public async createVacation(vacation: VacationModel): Promise<void> {
        const options = {
            headers: { "Content-Type": "multipart/form-data" }
        }

        const response = await axios.post<VacationModel>(appConfig.vacationsEndpoint, vacation, options);
        const addedVacation = response.data;

        const action: VacationsAction = { type: VacationsActionType.AddVacations, payload: addedVacation };
        vacationStore.dispatch(action);
    }


    public async updateVacation(vacation: VacationModel): Promise<void> {
        const options = {
            headers: { "Content-Type": "multipart/form-data" }
        }

        const response = await axios.put<VacationModel>(appConfig.vacationsEndpoint + vacation._id, vacation, options);
        const updatedVacation = response.data;

        const action: VacationsAction = { type: VacationsActionType.UpdateVacation, payload: updatedVacation };
        vacationStore.dispatch(action);
    }

    public async deleteVacation(_id: string): Promise<void> {
        await axios.delete(appConfig.vacationsEndpoint + _id);

        const action: VacationsAction = { type: VacationsActionType.DeleteVacation, payload: _id };
        vacationStore.dispatch(action);
    }

    public async readVacationFollowers(_id: string): Promise<number> {
        const response = await axios.get<number>(appConfig.vacationsEndpoint + "followers/" + _id)
        const followers = response.data
        return followers
    }

    public async updateUsersFollowedVacations(vacationId: string) {
        const response = await axios.put(appConfig.vacationsEndpoint + vacationId)
        const data = response.data
        return data;
    }

}

const vacationsService = new VacationService();

export default vacationsService;

