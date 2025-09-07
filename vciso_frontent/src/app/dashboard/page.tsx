'use client'

import React, { useContext, useEffect, useState, ReactNode } from "react";
import useHttp from "@/hooks/useHttp";
import Navbar from "@/components/navigation/Navbar";


const Page = ({}) =>{
    const { request } = useHttp();
    const [organizations, setOrganizations] = useState([])
    const [dashboard, setDashboard] = useState([])

    useEffect(() => {

        const applyData = (res: Promise<Response>) =>{

            console.log(res)
        }

        request('dashboard', applyData, {
            method: 'GET',
        } )

    }, []);





    return (
        <div>
            <Navbar />
            <div className="flex justify-center mx-auto border">
                <div className={'w-1/2 text-center'}>
                    <h1>Organizations</h1>
                </div>
                <div className={'w-1/2 text-center'}>
                    <h1>container 2</h1>
                </div>
            </div>
            <div className="flex justify-center mx-auto border">
                <div className={'w-1/2 text-center'}>
                    <h1>container 3</h1>
                </div>
                <div className="w-1/2 text-center">
                    <h1>container 4</h1>
                </div>
            </div>
        </div>
    )
}

export default Page;