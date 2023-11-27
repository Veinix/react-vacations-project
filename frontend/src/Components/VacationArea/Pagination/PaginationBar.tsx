import { useEffect, useState } from "react";
import paginationService from "../../../Services/paginationService";

interface PaginationBarProps {
    showingRange?: {first: number, last: number},
    totalVacationsAmount: number,
    pageNumbers: number[],
    currentPage: number,
    setCurrentPage: (pageNumber: number) => void
}
function PaginationBar({ showingRange, totalVacationsAmount, pageNumbers, currentPage, setCurrentPage }: PaginationBarProps) {

    function previousPage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
            paginationService.updatePageNumber(currentPage - 1)
        }
    }

    function nextPage() {
        if (currentPage !== pageNumbers.length) {
            setCurrentPage(currentPage + 1)
            paginationService.updatePageNumber(currentPage + 1)
        }
    }

    
    

    return (
        <>
            <div className="flex flex-1 gap-2 sm:hidden">
                <button
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Previous
                </button>
                <button
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div className="sm:pr-4">
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{showingRange.first}</span> to <span className="font-medium">{showingRange.last}</span> of{' '}
                        <span className="font-medium">{totalVacationsAmount}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" >
                        <button
                            onClick={previousPage}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <strong className="h-5 w-5 flex items-center justify-center"> {"<"} </strong>
                        </button>

                        {pageNumbers.map(numbers => {
                            return (
                                <button
                                    onClick={() => {
                                        setCurrentPage(numbers)
                                        paginationService.updatePageNumber(numbers)
                                    }}
                                    key={numbers}
                                    className={
                                        `relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold
                                        ${currentPage === numbers ? `bg-indigo-600 text-white` : `bg-white text-black ring-1 ring-inset ring-gray-300`}`
                                    }>
                                    {numbers}

                                </button>
                            )
                        })}

                        <button
                            onClick={nextPage}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <strong className="h-5 w-5 flex items-center justify-center"> {">"} </strong>
                        </button>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default PaginationBar