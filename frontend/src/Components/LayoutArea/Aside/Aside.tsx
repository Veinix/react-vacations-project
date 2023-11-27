import accountImage from "../../../Assets/images/accountIcon.png";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/userModel";

interface IAsideProps {
    user: UserModel
}
function Aside({ user }: IAsideProps) {
    return (
        <>
            
            <div className="bg-gray-50 rounded-xl border-2 border-black mb-3 w-full hidden sm:inline">
                <div className="max-w-7xl mx-auto sm:px-6 lg:py-6 lg:px-8 lg:flex lg:items-center lg:justify-between">

                    {user && <div>
                        <NavLink to={`/account`} className={({ isActive }) => isActive ? "active" : ""}>
                            <img src={accountImage} alt="Home" width="500" height="500" className="w-7 sm:mx-2 mx-4 inline" />
                            <span className="hidden sm:inline">{`${user.firstName}`}</span>
                        </NavLink>
                    </div>}
                    {!user && <div>
                        <NavLink to={`/login`} className={({ isActive }) => isActive ? "active" : ""}>
                            <img src={accountImage} alt="Home" width="500" height="500" className="w-7 sm:mx-2 mx-4 inline" />
                            <span className="hidden sm:inline">Login</span>
                        </NavLink>
                    </div>}
                </div>
            </div>

            <div className="bg-gray-50 rounded-xl border-2 border-black mb-3 w-full sm:my-0 my-4">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">

                    <h2 className="text-xl font-extrabold tracking-tight text-center text-indigo-600 ">
                        {(process.env.NODE_ENV).toUpperCase()}
                    </h2>

                </div>
            </div>

        </>
    )
}

export default Aside