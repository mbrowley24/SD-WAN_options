
'use client'

import React, { useReducer, useState } from "react";
import {useRouter} from "next/navigation";
import UserForm from "@/components/userForm/UserForm";
import { userFormReducer, initialState } from "@/components/reducers/userFormReducer";
import useHttp from "@/hooks/useHttp";


const Page = (props) => {
    const [state, dispatch] = useReducer(userFormReducer, initialState);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const {data, request} = useHttp();
    const router = useRouter();
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target;

        dispatch({type: name, payload: value});
    }

    const submit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const applyData = async (res:Promise<Response>) =>{

            if(res.ok){
                 router.push('/')
            }else{
                //toDo
                //need refine and handle more complex errors and feedback from t he server
                console.log(res);
                const json = await res.json();
                console.log(json)
            }

        }

        const userData = JSON.stringify(state);

        const result = await request('auth/register', applyData, {
            method: 'POST',
            body: userData
        })




    }

    return (
        <div>
            <h1 className={'text-2xl text-center py-5'}>Registration</h1>
            <UserForm
                inputChange={inputChange}
                data={state}
                handleSubmit={submit}
            />
        </div>
    )
}

export default Page;