import accountImage from "../../../Assets/images/accountIcon.png";
import homeImage from "../../../Assets/images/homeIcon.png"
import vacationImage from "../../../Assets/images/vacationIcon.png"
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/userModel";

interface INavBarProps {
    user: UserModel
}

function Navbar(props: INavBarProps): JSX.Element {
    const user = props.user;
    return (
        <ul className="flex sm:flex-col overflow-hidden content-center justify-center">
            {user && <li className="py-2 sm:py-4">
                <NavLink to={`/account`} className={({ isActive }) => isActive? "active" : ""}>
                    <img src={accountImage} alt="Home" width="500" height="500" className="w-7 sm:mx-2 mx-4 inline" />
                    <span className="hidden sm:inline">{`${user.firstName}`}</span>
                </NavLink>
            </li>}
            {!user && <li className="py-2 sm:py-4">
                <NavLink to={`/login`} className={({ isActive }) => isActive? "active" : ""}>
                    <img src={accountImage} alt="Home" width="500" height="500" className="w-7 sm:mx-2 mx-4 inline" />
                    <span className="hidden sm:inline">Login</span>
                </NavLink>
            </li>}
            <li className="py-2">
                <NavLink to="/" className={({ isActive }) => isActive? "active" : ""}>
                    <img src={homeImage} alt="Home" width="500" height="500" className="w-7 sm:mx-2 mx-4 inline" />
                    <span className="hidden sm:inline">Home</span>
                </NavLink>
            </li>
            <li className="py-2">
                <NavLink to="/vacations" className={({ isActive }) => isActive? "active" : ""}>
                    <img src={vacationImage} alt="Home" width="500" height="500" className="w-7 sm:mx-2 mx-4 inline" />
                    <span className="hidden sm:inline">Vacations</span>
                </NavLink>
            </li>
        </ul>
    )
}

export default Navbar