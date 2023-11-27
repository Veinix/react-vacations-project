import Navbar from "./Navbar/Navbar"
import Footer from "./Footer/Footer"
import "./layout.css"
import Aside from "./Aside/Aside"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Dot from "../Common/CircleGrid/Dot"
import useAuth from "../../Hooks/AuthHooks/useAuth"
import useMousePos from "../../Hooks/useMousePos"


export default function Layout(): JSX.Element {
    const user = useAuth()
    const [mousePos] = useMousePos();
    
    return (
        <>
            {/* Required to render the ToastContainer once in app in order for the React-Tostify notifications to work */}
            <ToastContainer />

            <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
                
                <div className="w-fixed w-full flex-shrink flex-grow-0 px-4">
                    <div className="sticky top-0 p-2 w-full h-full">
                        <nav className="sticky top-0 p-2 border-2 border-solid border-black rounded-xl w-full h-full bg-[#FAF9F6]">
                            <Navbar user={user} />
                        </nav>
                    </div>
                </div>

                <main className="w-full flex-grow pt-1 px-3">
                    <Outlet />
                </main>

                <div className="w-fixed w-full flex-shrink flex-grow-0 px-2">
                    <aside className="flex sm:flex-col px-2 ">
                        <Aside user={user} />
                    </aside>
                </div>

            </div>

            <footer className="bg-black mt-auto p-5">
                <Footer />
            </footer>

            <div className="fixed top-6 left-14 sm:flex hidden flex-wrap w-full gap-32 mx-auto p-14 z-[-1] overflow-hidden">
                {Array.from({ length: 100 }, (_, i) => {
                    return <Dot key={i} mousePos={mousePos}></Dot>
                })}
            </div>
        </>
    )
}
