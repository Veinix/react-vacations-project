import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../../Services/authService";
import { SubmitHandler, useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message";
import CredentialsModel from "../../../Models/credentialsModel";
import notificationService from "../../../Services/notificationService";

function LoginForm() {
    
    type FormInputs = {
        email: {required: "Email is required"},
        password: { 
            required: "Password is required",
            minLength: { value: 4, message: "Password must be at least 4 characters"}
        },
    }

    class FormOptions {
        public static email = {
            required: "Email is a required field. Please enter your email",
            pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Entered email is not valid. Please check that you have typed it correctly" }
        }
        public static password = {
            required: "Password is a required field. Please enter a password",
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs & FormOptions>();

    const navigate = useNavigate();
    async function onSubmit(credentials: CredentialsModel) {
        try {
            await authService.login(credentials)
            notificationService.success("Logged in successfully")
            navigate("/vacations")
        } catch (err: any) {
            notificationService.error(err);
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-2 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 p-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 bg-white ring-1 ring-gray-300 rounded-lg">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input {...register("email", { required: FormOptions.email.required, pattern: FormOptions.email.pattern })} type="email" className="block w-full rounded-t-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="text-indigo-600 text-sm pt-2 bg-white rounded-b-lg ring-1 ring-gray-300 px-2.5 py-1.5 ring-inset">{message}</p>} />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input {...register("password", { required: FormOptions.password.required})} type="password" className="block w-full rounded-t-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage errors={errors} name="password" render={({ message }) => <p className="text-indigo-600 text-sm pt-2 bg-white rounded-b-lg ring-1 ring-gray-300 px-2.5 py-1.5 ring-inset">{message}</p>} />
                        </div>
                    </div>
                    
                    <div className="flex justify-center pb-5">
                        <button className="flex w-full justify-center min-w-[100px] items-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-black bg-white ring-1 ring-gray-300 shadow-sm hover:bg-gray-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                            Sign in
                        </button>
                    </div>

                </form>

                <p className="text-center text-sm text-gray-500 bg-white ring-1 ring-gray-300 rounded-lg p-1">
                    Haven't signed up yet?
                    <NavLink to="/register" className="font-semibold px-2 leading-6 text-gray-900 hover:text-gray-600">Register here</NavLink>
                </p>
            </div>
        </div>
    )
}

export default LoginForm