"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { NavLink, redirect, useNavigate } from "react-router-dom"
import authService from "../../../Services/authService"
import UserModel from "../../../Models/userModel"
import notificationService from "../../../Services/notificationService"

export default function RegisterForm(): JSX.Element {

    type FormInputs = {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        keepLoggedIn: boolean,
    }

    class FormOptions {
        public static firstName = {
            required: "First name is a required field. Please enter your first name",

        }
        public static lastName = {
            required: "Last name is a required field. Please enter your last name",
        }
        public static email = {
            required: "Email is a required field. Please enter your email",
            pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Entered email is not valid. Please check that you have typed it correctly" }
        }
        public static password = {
            required: "Password is a required field. Please enter a password",
            minLength: { value: 4, message: "Password is too short. Please enter a longer password" }
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs & FormOptions>();

    const navigate = useNavigate();
    async function onSubmit(user: UserModel) {
        try {
            await authService.register(user)
            notificationService.success("You have registed! Yay!")
            navigate("/vacations")
        } catch(err:any) {
            notificationService.error(err)
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-2 pb-10 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="sm:mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-2 sm:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                            <div className="mt-2">
                                <input {...register("firstName", { required: FormOptions.firstName.required })} type="text" className="block w-full rounded-t-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <ErrorMessage errors={errors} name="firstName" render={({ message }) => <p className="text-indigo-600 text-sm pt-2 bg-white rounded-b-lg ring-1 ring-gray-300 px-2.5 py-1.5 ring-inset">{message}</p>} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                            <div className="mt-2">
                                <input {...register("lastName", { required: FormOptions.lastName.required })} type="text" className="block w-full rounded-t-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <ErrorMessage errors={errors} name="lastName" render={({ message }) => <p className="text-indigo-600 text-sm pt-2 bg-white rounded-b-lg ring-1 ring-gray-300 px-2.5 py-1.5 ring-inset">{message}</p>} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input {...register("email", { required: FormOptions.email.required, pattern: FormOptions.email.pattern })} type="email" className="block w-full rounded-t-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                                <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="text-indigo-600 text-sm pt-2 bg-white rounded-b-lg ring-1 ring-gray-300 px-2.5 py-1.5 ring-inset">{message}</p>} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input {...register("password", { required: FormOptions.password.required, minLength: FormOptions.password.minLength })} type="password" className="block w-full rounded-t-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <ErrorMessage errors={errors} name="password" render={({ message }) => <p className="text-indigo-600 text-sm pt-2 bg-white rounded-b-lg ring-1 ring-gray-300 px-2.5 py-1.5 ring-inset">{message}</p>} />
                            </div>
                        </div>

                        <div className="flex justify-center pb-5">
                            <button className="flex w-full justify-center min-w-[100px] items-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-black bg-white ring-1 ring-gray-300 shadow-sm hover:bg-gray-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                Register
                            </button>
                        </div>

                    </form>

                    <p className="text-center text-sm text-gray-500 bg-white ring-1 ring-gray-300 rounded-lg p-1">
                        Already a member?
                        <NavLink to="/login" className="font-semibold px-2 leading-6 text-gray-900 hover:text-gray-600">Login here</NavLink>
                    </p>
                </div>
            </div>
        </>
    )
}