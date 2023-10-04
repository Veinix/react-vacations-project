import { createStore } from "redux";
import VacationModel from "../Models/vacationModel";

export class VacationState {
    public vacations: VacationModel[] = [];
}

export enum VacationsActionType {
    SetVacations = "SetVacations",
    AddVacations = "AddVacations",
    UpdateVacation = "UpdateProduct",
    DeleteVacation = "DeleteProduct",
}

export interface VacationsAction {
    type: VacationsActionType; 
    payload?: any;
}

export function vacationsReducer(currentState = new VacationState(), action: VacationsAction): VacationState {

    const newState = { ...currentState };

    switch (action.type) {

        case VacationsActionType.SetVacations: 
            newState.vacations = action.payload; 
            break;

        case VacationsActionType.AddVacations: 
            newState.vacations.push(action.payload); 
            break;

        case VacationsActionType.UpdateVacation: 
            const indexToUpdate = newState.vacations.findIndex(v => v._id === action.payload._id);
            if (indexToUpdate >= 0) newState.vacations[indexToUpdate] = action.payload;
            break;

        case VacationsActionType.DeleteVacation:
            const indexToDelete = newState.vacations.findIndex(v => v._id === action.payload);
            if (indexToDelete >= 0) newState.vacations.splice(indexToDelete, 1);
            break;
    }

    return newState;
}

export const vacationStore = createStore(vacationsReducer);
