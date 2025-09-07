'use client';
import React, { useEffect, useState } from "react";
import user_validations from "@/utils/user_validations";
import Link from "next/link";
import '../../css/base_line.css'


const LoginForm = ({
                       data,
                       error,
                       inputChange,
                       submit} :
                   {
                       data: { username:string, password:string },
                       error: { status:number, message:string }
                       inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
                       submit: (e: React.FormEvent<HTMLFormElement>) => void,

                   }) =>{
    const {} = user_validations();


    useEffect(() => {

    }, []);


    return (
        <form
            onSubmit={(e) =>{submit(e)}}
            className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
            <div>
                <label htmlFor="" className={'text-gray-900'}>Username</label>
                <input
                    name="username"
                    type="text"
                    onChange={inputChange}
                    value={data?.username}
                    className={'w-full text-gray-900 border p-2 rounded'}
                />

            </div>
            <div>
                <label htmlFor="" className={'text-gray-900'}>Password</label>
                <input type="password"
                       name={'password'}
                       onChange={inputChange}
                       value={data?.password}
                       className={'w-full text-gray-900 border p-2 rounded'}
                />

            </div>
            {error && <p className={'text-red-700 text-center capitalize'}>{error.message}</p>}
            <div>
                <button className={'submit'}>Login</button>
            </div>
            <div>
                <Link
                    className={'text-blue-900 text-center block'}
                    href={'/register'}
                >Register</Link>
            </div>
        </form>
    )


}

export default LoginForm;