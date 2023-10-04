import { NavLink } from "react-router-dom"

function PleaseLogIn() {
    return (
        <>
            <div className="flex min-h-full justify-center items-center flex-col">
                <div className="bg-white ring-1 ring-gray-300 rounded-lg p-10">

                    <h2 className="p-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"> It seems you're not logged in!</h2>
                    <h3> Please <NavLink to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-400">login</NavLink> or <NavLink to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-400">register</NavLink> to view this content</h3>
                </div>
            </div>
        </>
    )
}

export default PleaseLogIn