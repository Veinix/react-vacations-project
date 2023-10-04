import React from 'react'
import VacationCard from "../VacationCard/VacationCard"
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";


function EditVacation() {
    const { vacationId } = useParams()

    const { register, watch } = useForm();
    const inputDestination = watch("destination")
    const inputDescription = watch("description")
    const inputStartDate = watch("startDate")
    const inputEndDate = watch("endDate")
    const inputPrice = watch("price")
    const inputFollowers = watch("followers")

    const vacationData = {
        _id: vacationId,
        destination: inputDestination ?? "Lorem Ipsum, dolor sit",
        description: inputDescription ?? "Amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
        startDate: inputStartDate ?? new Date(),
        endDate: inputEndDate ?? new Date(),
        price: inputPrice ?? 3000,
        imageName: "aliquamurna.png"
    };
    const followers = inputFollowers ?? 0

    return (
        <>
            <h2 className="text-3xl md:text-5xl mb-4 font-extrabold"> Edit Vacation</h2>
            <div className="flex flex-col sm:flex-row">
                <div className="flex flex-col w-full sm:w-1/2 sm:px-16 py-2 px-0">
                    <label className="font-bold text-base mb-2">Destination</label>
                    <input type="text" {...register("destination")} className="border-gray-400 border-2 mb-4 p-2" />

                    <label className="font-bold text-base mb-2">Description</label>
                    <input type="text" {...register("description")} className="border-gray-400 border-2 mb-4 p-2" />

                    <label className="font-bold text-base mb-2 ">Start Date</label>
                    <input type="date" {...register("startDate")} className="border-gray-400 border-2 mb-4 p-2 col-span-3" />

                    <label className="font-bold text-base mb-2 ">End Date</label>
                    <input type="date" {...register("endDate")} className="border-gray-400 border-2 mb-4 p-2 col-span-3" />

                    <label className="font-bold text-base mb-2 pr-5 ">Price</label>
                    <input type="number" {...register("price")} className="border-gray-400 border-2 mb-4 p-2 col-span-3" />

                    <label className="font-bold text-base mb-2 pr-5 ">Number of followers</label>
                    <input type="number" {...register("followers")} className="border-gray-400 border-2 mb-4 p-2 col-span-3" />

                </div>
                <div className="w-full sm:w-1/2 border-2 flex justify-center items-center border-black">
                    <VacationCard vacationData={vacationData} isAdmin={false} followers={followers}/>
                </div>
            </div>
        </>
    )
}

export default EditVacation