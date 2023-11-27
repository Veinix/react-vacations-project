import FilterVacationsTab from "../FilterVacationsTab/FilterVacationsTab";
import PaginationBar from "../Pagination/PaginationBar";
import VacationsList from "../VacationsList/VacationsList";
import { useState, useEffect } from "react";
import VacationModel from "../../../Models/vacationModel";
import notificationService from "../../../Services/notificationService";
import vacationsService from "../../../Services/vacationService";
import useFilter from "../../../Hooks/VacationHooks/useFilter";

// First get all the vacations, and store them
// Then if there are filters, filter and only show those
// Finally, seperate into pages

export default function VacationsPage() {
    console.log("Mounted")

    // Get all the vacations
    const [vacations, setVacations] = useState<VacationModel[]>([])

    useEffect(() => {
        vacationsService.readAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => notificationService.error(err));
    }, [])

    // Add filters
    const { activeFilters, updateFilters, filterVacations } = useFilter();
    const filteredVacations = filterVacations(vacations);

    // Seperate into pages
    const vacationsPerPage = 9
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredVacations.length / vacationsPerPage); i++) { pageNumbers.push(i) }

    const [currentPage, setCurrentPage] = useState(1)
    const indexOfLastVacation = currentPage * vacationsPerPage
    const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage
    const vacationsInView = filteredVacations.slice(indexOfFirstVacation, indexOfLastVacation)

    const [showingRange, setShowingRange] = useState({ first: 0, last: 0 })
    const currentFirst = currentPage > 1 ? (currentPage * vacationsPerPage) - vacationsPerPage + 1 : 1
    const currentLast = currentPage > 1 || vacationsInView.length > 9 ? (currentPage * vacationsPerPage - vacationsPerPage + vacationsInView.length) : vacationsInView.length

    useEffect(() => {
        setShowingRange({ first: currentFirst, last: currentLast })
    }, [filteredVacations, currentPage])

    return (
        <>
            <h2 className="text-3xl md:text-5xl mb-4 font-extrabold w-fit"> Quick! <i>React</i> to these deals!</h2>
            <div className="flex flex-col sm:flex-row w-full border items-center justify-center border-black rounded-xl bg-white p-4 mb-4 sm:px-6">
                <div className="flex items-center">
                    <FilterVacationsTab
                        activeFilters={activeFilters}
                        updateFilters={updateFilters}
                    />
                </div>
                <div className="flex items-center sm:ml-auto sm:m-0 mt-2">
                    <PaginationBar
                        showingRange={showingRange}
                        totalVacationsAmount={filteredVacations.length}
                        pageNumbers={pageNumbers}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
            <div className="flex gap-5 flex-wrap flex-row justify-center">
                <VacationsList
                    vacations={filteredVacations}
                    setVacations={setVacations}
                    currentVacations={vacationsInView}
                />
            </div>
            <div className="flex items-center justify-center mx-auto border border-solid border-black rounded-xl bg-white py-4 sm:m-4 mt-4">
                <button
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                    className="bg-indigo-600 text-white rounded px-5 py-2 hover:bg-indigo-900">
                    Back to top
                </button>
            </div>
        </>

    )
}