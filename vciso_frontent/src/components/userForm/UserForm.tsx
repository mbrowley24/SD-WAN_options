'use client'

import {useEffect , useState} from 'react'
import {useRouter} from "next/navigation";
import Input from '../generic/Input'
import user_validations from '../../utils/user_validations'

import '../../app/register/register.css'
import '../../css/base_line.css'

type ErrorDictionary = {
    [key:string]: string;
}

const UserForm = (props: any) => {
    const router = useRouter();
    const {user_reg_validation} = user_validations();
    const [show, setShow] = useState<boolean>(false)
    const [errors, setErrors] = useState<ErrorDictionary>({})
    const cancel = (e) =>{
        e.preventDefault();
        router.push('/')
    }


    useEffect(() => {
        console.log(props.data)
        setErrors({...user_reg_validation(props.data)});
        console.log(user_reg_validation(props.data))
    }, [props.data]);


    console.log(errors)


    return (
        <form
            className={'mx-auto p-3 reg_form bg-gray-100 shadow rounded-lg p-'}
            onSubmit={(e) => props.handleSubmit(e)}
        >
            <div className={'mx-auto w-3/4 mt-2 mb-3 border p-2 border-0 rounded-sm'}>
                <label
                    className={'block text-center text-sm font-medium text-gray-700'}
                    htmlFor={'username'}
                > Username </label>
                <Input
                    data={props.data.username}
                    inputChange={props.inputChange}
                    name={'username'}
                    type={'text'}
                    className={'mx-auto text-black text-center block w-full border px-3 py-2 rounded-md focus:ring focus:border-blue-500 border-gray-500'}
                />
            </div>
            <div
                className={'mx-auto w-3/4 mt-2 mb-3 border-0 p-1'}
            >
                <label
                    className={'block text-center text-sm font-medium text-gray-700'}
                    htmlFor={'firstName'}
                > First Name </label>
                <Input
                    id={'firstName'}
                    data={props.data.first_name}
                    inputChange={props.inputChange}
                    name={'first_name'}
                    type={"text"}
                    className={'mx-auto text-center text-black block w-full border px-3 py-2 rounded-md focus:ring focus:border-blue-500 border-gray-500'}
                />
            </div>
            <div
                className={'mx-auto w-3/4 mt-2 mb-3 border-0 p-1'}
            >
                <label
                    className={'block text-center text-sm font-medium text-gray-700'}
                    htmlFor={'lastName'}
                > Last Name </label>
                <Input
                    data={props.data.last_name}
                    inputChange={props.inputChange}
                    name={'last_name'}
                    type={'text'}
                    className={'mx-auto text-center text-black block w-full border px-3 py-2 rounded-md focus:ring focus:border-blue-500 border-gray-500'}
                />
            </div>
            <div
                className={'mx-auto w-3/4 mt-2 mb-3 border-0 p-1'}
            >
                <label
                    className={'block text-center text-sm font-medium text-gray-700'}
                    htmlFor={'email'}
                > Email </label>
                <Input
                    data={props.data.email}
                    inputChange={props.inputChange}
                    name={'email'}
                    type={'text'}
                    className={'mx-auto text-center text-black block w-full border px-3 py-2 rounded-md focus:ring focus:border-blue-500 border-gray-500'}
                />
            </div>
            <div
                className={'mx-auto w-3/4 mt-2 mb-3 border-0 p-1'}
            >
                <label
                    className={'block text-center text-sm font-medium text-gray-700'}
                    htmlFor={'password'}
                > Password </label>
                <Input
                    data={props.data.password}
                    inputChange={props.inputChange}
                    name={'password'}
                    type={show? 'text' : 'password'}
                    className={'mx-auto text-center text-black block w-full border px-3 py-2 rounded-md focus:ring focus:border-blue-500 border-gray-500'}
                />
            </div>
            <div
                className={'mx-auto w-3/4 mt-2 mb-3 border-0 p-1'}
            >
                <label
                    className={'block text-center text-sm font-medium text-gray-700'}
                    htmlFor={'confirmPassword'}> Confirm Password </label>
                <Input
                    data={props.data.password_confirm}
                    inputChange={props.inputChange}
                    name={'password_confirm'}
                    type={show ? 'text' : 'password'}
                    className={'mx-auto text-center text-black block w-full border px-3 py-2 rounded-md focus:ring focus:border-blue-500 border-gray-500'}
                />
                <div className={'text-center mt-1'}>
                    <button className={'text-white capitalize text-xs bg-blue-900 p-1 rounded-sm'}>show password</button>
                </div>
            </div>
            <div>
                <button
                    className={`submit rounded p-1 w-1/3 ${Object.keys(errors).length > 0?'cursor-not-allowed disabled:bg-blue-200 disabled:opacity-50': ''}`}
                    disabled={Object.keys(errors).length > 0}
                >Submit</button>
            </div>
            <div className={'text-center mt-2'}>
                <button
                    type={'button'}
                    className={'bg-red-900 hover:bg-red-700 w-full rounded p-1'}
                    onClick={(e)=>cancel(e)}
                >Cancel</button>
            </div>
        </form>
    )
}

export default UserForm;