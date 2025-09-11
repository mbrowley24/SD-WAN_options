import React from "react";
import useHttp from "@/hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import store from "@/store/store";
import Tolology from "./Tolopolgy";
import UnderlayCircuits from "./underlay/UnderlayCircuit";
import UnderlayCircuitForm from "./underlay/UnderlayCircuitForm";

const SDWANConfig = (props) =>{
    const {request} = useHttp();
    const sdwanData = useSelector((s)=> s.mxData)
    

    const formhandler = async (e) =>{
        e.preventDefault()
        
        const applyData = async (res) =>{
            console.log(res);
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `test.xlsx`;
            a.click();
            URL.revokeObjectURL(url);
        }

        await request('sdwan', applyData, {
            method: "POST",
            // body: JSON.stringify(sdwanData.submitData)
        }) 
        
    }

    const inputChange = (e) =>{
        const {name, value} = e.target;
        
        dispatch({type:name, payload:value})
    }
    
    const addElement = (name) => {

        dispatch({type:name, payload: null});
    }
   
    console.log(JSON.stringify(sdwanData));

    return(
        <div className="min-h-screen bg-slate-950 text-slate-100">
<div className="mx-auto max-w-3xl px-6 py-16">
{/* Header */}
<h1 className="mb-8 text-3xl font-semibold tracking-tight text-indigo-200">
Configure Meraki SD‑WAN
</h1>


{/* Card */}
<div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
    <div className="mb-5 text-sm text-slate-300/90">
        Quick start with opinionated defaults suitable for a small office.
    </div>


    <ul className="mb-6 space-y-2">
        <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>Single site</span>
        </li>
        <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>1 VLAN</span>
        </li>
        <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>1 SSID</span>
        </li>
        <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>Medium security content filter</span>
        </li>
    </ul>


    <div className="flex items-center gap-3">
        <Link
        href="/sdwan-config/single-site"
        className="inline-flex items-center justify-center rounded-xl bg-indigo-500/90 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-900/30 ring-1 ring-inset ring-indigo-400/40 transition hover:bg-indigo-500"
        >
        Single Site – 1 VLAN
        </Link>
    {/* Future links */}
    {/* <Link href="/sdwan-config/topology" className="text-sm text-indigo-300 underline underline-offset-4 hover:text-indigo-200">Topology</Link> */}
    </div>
    </div>
    </div>
    </div>
    )
}

export default SDWANConfig;