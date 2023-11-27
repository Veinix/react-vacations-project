import { useEffect, useState } from "react";
import notificationService from "../../Services/notificationService";
import vacationsService from "../../Services/vacationService";

export default function useFollowers(vacationId: string) {
    const [followers, setFollowers] = useState<number>()
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    useEffect(() => {
        vacationsService.readVacationFollowers(vacationId)
            .then(followers => setFollowers(followers))
            .catch(err => notificationService.error(err))
    }, [vacationId])

    return {followers, isFollowing, setIsFollowing}
}
