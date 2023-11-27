
interface LoadingProps {
    message: string;
}

function Loading(props: LoadingProps): JSX.Element {
    return (
        <div className="flex justify-center items-center m-4">
            <div className="flex flex-col gap-2 bg-white border-2 border-black rounded-xl p-6 items-center justify-center">
                <p>Hold on! We're loading</p>
                <strong className=""> {props.message} </strong>
                <div className="h-10 w-10 mt-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] border-indigo-400">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Loading