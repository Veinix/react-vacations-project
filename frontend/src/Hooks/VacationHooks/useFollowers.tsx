import { useEffect, useState } from "react";
import notificationService from "../../Services/notificationService";
import vacationsService from "../../Services/vacationService";

export default function useFollowers(vacationId: string): number {
    const [followers, setFollowers] = useState<number>()

    useEffect(() => {
        vacationsService.getAmountOfFollowers(vacationId)
            .then(followers => setFollowers(followers))
            .catch(err => notificationService.error(err))
    }, [vacationId])

    return followers
}
