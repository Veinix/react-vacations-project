import vacationsService from "../../../Services/vacationService";
import notificationService from "../../../Services/notificationService";
import VacationCard from "../VacationCard/VacationCard";
import Loading from "../../Common/Loading/Loading";
import ConfirmationModal from "../Modals/ConfirmationModal";
import useModal from "../../../Hooks/useModal";
import VacationModel from "../../../Models/vacationModel";
import useAdmin from "../../../Hooks/AuthHooks/useAdmin";

interface VacationsListProps {
    vacations: VacationModel[],
    setVacations: React.Dispatch<React.SetStateAction<VacationModel[]>>,
    currentVacations: VacationModel[]
}

function VacationsList({  vacations, setVacations, currentVacations }: VacationsListProps): JSX.Element {
    const { showModal, toggleModal, initModal, modalVacation } = useModal()
    const isAdmin = useAdmin();

    async function handleDelete(_id: string) {
        toggleModal()
        await vacationsService.deleteVacation(_id);
        setVacations(prevVacations => prevVacations.filter(v => v._id !== _id));
        notificationService.success("Deleted Vacation")
    }

    return (
        <>
            {vacations.length === 0 && <Loading message="Getting info" />}
            {currentVacations.length !== 0 && currentVacations.map(v =>
                <VacationCard 
                key={v._id} 
                vacationData={v} 
                isAdmin={isAdmin} 
                initModal={() => initModal(v)} 
                />)}

            {showModal && <ConfirmationModal
                title={"Are you sure?"}
                information={`Deleting this vacation will be permanent and the data cannot and will not be recovered. \n Selected Vacation: ${modalVacation.destination} `}
                buttonStyle={{
                    color: "bg-red-500 hover:bg-red-700",
                    text: "Delete",
                    textColor: "text-white"
                }}
                cancel={() => toggleModal()}
                confirm={() => handleDelete(modalVacation._id)}
            />}
        </>
    );
}

export default VacationsList;