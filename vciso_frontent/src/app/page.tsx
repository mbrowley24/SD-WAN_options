'use client';

import React, {useState} from "react";
import LoginForm from "../components/Login/LoginForm";
import useHttp from "@/hooks/useHttp";
import { useRouter } from "next/navigation";
import user_validations from "@/utils/user_validations";



export default function Home() {
    const {data, error, loading, request} = useHttp();
    const {password_input ,username_char_check} = user_validations();
    const router = useRouter();
    const [login, setLogin] = useState({
        'username' : '',
        'password' : '',
    });

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        setLogin((prev) => {

            if(name === 'password'){

                if(password_input(value)){

                    return ({...prev, [name]: value});

                }else{

                    return ({...prev});

                }


            }else if(name === 'username'){

                if(username_char_check(value)){

                    return ({...prev, [name]: value});

                }else{

                    return ({...prev});
                }
            }
        });
    }

    const submit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const applyData = async (res: Promise<Response>) => {

            if(res.ok){
                router.push('/dashboard');
            }else{

            }
        }

        await request("auth/login", applyData, {
            method: "POST",
            body: JSON.stringify(login)
        })

    }

  return (
    <div className="bg-gray-100 w-100 mx-auto">
      <main className="">
          <h1 className={'text-gray-900'}>Login</h1>
          <LoginForm
              submit={submit}
              inputChange={inputChange}
              error={error} />
      </main>
    </div>
  );
}
