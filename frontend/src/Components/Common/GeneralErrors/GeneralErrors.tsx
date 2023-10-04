import { NavLink, useRouteError } from "react-router-dom";

export default function GeneralErrors(): JSX.Element {
    const error: any = useRouteError();
    console.log(error);

    return (
        <div className="flex justify-center items-center min-w-screen min-h-screen">
            <div className="flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl mb-4 font-extrabold">Next Vacations</h2>
                <p>Oops!</p>
                <p>Sorry, an unexpected error has occurred.</p>
                <p className="my-5 py-2 w-full text-center border-t-gray-300 border-t-2 border-b-gray-300 border-b-2">
                    <i>{error.statusText || error.message}</i>
                </p>
                <NavLink to={`/`}
                    className="my-2 block w-full rounded border-2 border-black px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-center text-black transition duration-150 ease-in-out hover:bg-black  hover:text-white">
                    Return to homepage
                </NavLink>
            </div>
        </div>
    );
}
