import { createStore } from "redux";

export class PaginationState {
    public currentPage: number = 1;
}

export enum PaginationActionType {
    SetCurrentPage = "SetCurrentPage",
}

export interface PaginationAction {
    type: PaginationActionType; 
    payload?: any;
}

export function paginationReducer(currentState = new PaginationState(), action: PaginationAction): PaginationState {

    const newState = { ...currentState };

    switch (action.type) {

        case PaginationActionType.SetCurrentPage: 
            newState.currentPage = action.payload; 
            break;

    }

    return newState;
}

export const paginationStore = createStore(paginationReducer);
