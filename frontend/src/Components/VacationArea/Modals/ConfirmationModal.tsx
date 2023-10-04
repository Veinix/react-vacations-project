interface ConfirmationModalProps {
    title: string;
    information: string;
    buttonStyle: {
        color: string;
        text: string;
        textColor: string;
    };
    cancel: () => void;
    confirm: (variable?:any) => any;
}

function ConfirmationModal({ title, information, buttonStyle, cancel, confirm }: ConfirmationModalProps): JSX.Element {
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                {title}
                            </h3>
                        </div>
                        <div className="relative p-6 flex-auto">
                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                {information}
                            </p>
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button className="text-black border-black border-2 rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm mr-1 mb-1"
                                onClick={cancel}>
                                Cancel
                            </button>
                            <button className={`${buttonStyle.color} ${buttonStyle.textColor} font-bold uppercase text-sm px-6 py-3 rounded-lg mr-1 mb-1`}
                                onClick={confirm}>
                                {buttonStyle.text}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default ConfirmationModal;