import Loading from "../../Common/Loading/Loading"

function Homepage() {

    return (
        <>
            <div>
                <h2 className="text-3xl md:text-5xl mb-4 font-extrabold">React Vacations, where you need to <i>React</i> quickly</h2>
                <div className="sm:max-w-xl bg-white border-2 border-solid border-black rounded-xl p-6 flex flex-col">
                    <p> To see what vacations we offer, click the vacations button on the navbar.</p>
                    <p> Currently, only logged in users can see vacations. Registration is so easy, my grandma can do it!</p>
                </div>
            </div>
            
        </>
    )
}

export default Homepage