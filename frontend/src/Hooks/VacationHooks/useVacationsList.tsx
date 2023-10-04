import { useEffect, useState } from "react";
import VacationModel from "../../Models/vacationModel";
import vacationsService from "../../Services/vacationService";
import notificationService from "../../Services/notificationService";

export default function useVacationsList() {
    const [vacations, setVacations] = useState<VacationModel[]>([])

    useEffect(() => {
        vacationsService.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => notificationService.error(err));
    }, [vacations])

    return {vacations, setVacations};
}
