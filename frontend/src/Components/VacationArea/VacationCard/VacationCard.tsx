import moment from "moment";
import VacationModel from "../../../Models/vacationModel"
import { NavLink } from "react-router-dom";
import useFollowers from "../../../Hooks/VacationHooks/useFollowers";

interface IVacationCardProps {
    vacationData: VacationModel;
    isAdmin: boolean;
    initModal?: (vacationData:VacationModel) => void;
}

export default function VacationCard({vacationData, isAdmin, initModal}: IVacationCardProps): JSX.Element {
    const {followers, isFollowing, setIsFollowing} = useFollowers(vacationData._id);
    
    function formatDate(date: Date) {
        if (!date) return "";
        else {
            const formattedDate = moment(date).format("Do [of] MMM YYYY");
            return formattedDate
        }
    }

    function toggleFollow() {
        setIsFollowing(!isFollowing)
    }

    return (
        <>
            <div className="block py-4 px-6 max-w-sm rounded-lg border border-gray-200 bg-white">

                <p className="mb-2 text-3xl font-bold text-gray-800">{vacationData.destination}</p>
                <p className="mb-2 font-bold text-indigo-600">${vacationData.price.toLocaleString()}</p>
                <p className="font-normal">{vacationData.description}</p>
                <p className="my-2"> <b>Starts</b> {formatDate(vacationData.startDate)}</p>
                <p className="my-2"> <b>Ends</b> {formatDate(vacationData.endDate)}</p>
                {!isAdmin &&
                    <div className="flex w-full">
                        <button onClick={toggleFollow} className="w-9/12 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-l">
                            {isFollowing ? "Following" : "Follow"}
                        </button>
                        <div className="w-3/12 border-indigo-500 border-2 text-gray-800 text-center font-bold py-2 px-4 rounded-r">
                            {followers ? followers : <p>...</p>}
                        </div>
                    </div>
                }
                {isAdmin &&
                    <div className="flex w-full">
                        <NavLink to={`edit/${vacationData._id}`} className="w-1/2 bg-green-500 hover:bg-green-700 text-white text-center font-bold py-2 px-4 rounded-l">
                            Edit
                        </NavLink>
                        <button onClick={() => initModal(vacationData)} className="w-1/2 bg-red-500 hover:bg-red-700 text-white text-center font-bold py-2 px-4 rounded-r"
                            data-te-toggle="modal"
                            data-te-target="#staticBackdrop">
                            Delete
                        </button>
                    </div>

                }
            </div>
        </>
    )
}

