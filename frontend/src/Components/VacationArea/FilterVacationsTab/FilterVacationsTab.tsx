import { IFilterOptions } from "../../../Hooks/VacationHooks/useFilter";

interface FilterVacationsTabProps {
    activeFilters: Set<string>,
    updateFilters: (filter:string) => void
}

function FilterVacationsTab({activeFilters, updateFilters}: FilterVacationsTabProps) {

    return (
        <>
            <span className="pr-4 hidden sm:inline">Filter by:</span>
            <div className="flex flex-row gap-2">
                <button onClick={() => updateFilters(IFilterOptions.All)}
                className={`border border-gray-300 rounded-md shadow-sm  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1 
                ${activeFilters.has(IFilterOptions.All) ? 'bg-indigo-500 text-white hover:bg-indigo-700' : 'bg-white hover:bg-gray-100 '}`} 
                >All</button>

                <button onClick={() => updateFilters(IFilterOptions.Following)}
                className={`border border-gray-300 rounded-md shadow-sm  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1 
                ${activeFilters.has(IFilterOptions.Following) ? 'bg-indigo-500 text-white hover:bg-indigo-700' : 'bg-white hover:bg-gray-100 '}`} 
                >Following</button>

                <button onClick={() => updateFilters(IFilterOptions.Unbegun)}
                className={`border border-gray-300 rounded-md shadow-sm  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1 
                ${activeFilters.has(IFilterOptions.Unbegun) ? 'bg-indigo-500 text-white hover:bg-indigo-700' : 'bg-white hover:bg-gray-100 '}`} 
                >Haven't Started Yet</button>

                <button onClick={() => updateFilters(IFilterOptions.Started)}
                className={`border border-gray-300 rounded-md shadow-sm  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1 
                ${activeFilters.has(IFilterOptions.Started) ? 'bg-indigo-500 text-white hover:bg-indigo-700' : 'bg-white hover:bg-gray-100 '}`} 
                >Ongoing</button>
            </div>
            
        </>
    )
}

export default FilterVacationsTab