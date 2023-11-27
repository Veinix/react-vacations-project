import { useState } from 'react'
import VacationModel from "../../Models/vacationModel";

export enum IFilterOptions {
    All = "all",
    Following = "following",
    Unbegun = "unbegun",
    Started = "started"
}

export default function useFilter() {
    // Intialization
    const initialSet = new Set<string>()
    initialSet.add(IFilterOptions.All)
    const [activeFilters, setActiveFilters] = useState(initialSet);

    function updateFilters(filter: string) {
        const newActiveFilters = new Set(activeFilters);

        // Toggle logic
        if (newActiveFilters.has(filter)) {
            newActiveFilters.delete(filter);
        } else {
            newActiveFilters.add(filter);
        }

        // Deactive Unbegun/Started if the other has been selected
        filter === IFilterOptions.Started ? newActiveFilters.delete(IFilterOptions.Unbegun) : null;
        filter === IFilterOptions.Unbegun ? newActiveFilters.delete(IFilterOptions.Started) : null;

        // Deactive All option if any other option is selected
        if (newActiveFilters.has(IFilterOptions.All) && filter !== IFilterOptions.All) {
            newActiveFilters.delete(IFilterOptions.All)
        }

        // Deactive other options if All option is selected
        if (newActiveFilters.has(IFilterOptions.All)) {
            newActiveFilters.delete(IFilterOptions.Following);
            newActiveFilters.delete(IFilterOptions.Unbegun);
            newActiveFilters.delete(IFilterOptions.Started);
        }

        // Activate all if there are no other options selected
        if (newActiveFilters.size === 0) {
            newActiveFilters.add(IFilterOptions.All)
        }

        // Setting filters
        setActiveFilters(newActiveFilters);
    }

    function filterVacations(vacations: VacationModel[]) {
        if (activeFilters.has(IFilterOptions.All)) {
            return vacations
        }

        const filteredVacations = vacations
        if (activeFilters.has(IFilterOptions.Following)) {
            
        }

        if (activeFilters.has(IFilterOptions.Unbegun)) {

        }

        if (activeFilters.has(IFilterOptions.Started)) {

        }

        return filteredVacations
    }

    return { activeFilters, updateFilters, filterVacations }
}
