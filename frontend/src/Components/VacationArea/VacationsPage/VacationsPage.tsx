import VacationsList from "../VacationsList/VacationsList";

export default function VacationsPage() {

    return (
        <>
            <h2 className="text-3xl md:text-5xl mb-4 font-extrabold w-fit"> Quick! <i>React</i> to these deals!</h2>

            <div className="border-2 border-solid border-black rounded-xl p-2 my-2 mx-10">
                <ul className="flex flex-row gap-10 justify-center">
                    <li><input type="checkbox" /> Liked</li>
                    <li><input type="checkbox" /> Haven't Started Yet</li>
                    <li><input type="checkbox" /> Ongoing</li>
                </ul>
            </div>
            <div className="flex gap-5 flex-wrap flex-row justify-center">
                <VacationsList/>
            </div>
        </>

    )
}