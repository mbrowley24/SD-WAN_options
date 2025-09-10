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
        <div>
            <h1> Configure Meraki SDWAN</h1>
            <div>
                <div>
                    <ul>
                        <ul>Single site</ul>
                        <ul>1 vlan</ul>
                        <ul>1 SSID</ul>
                        <ul>Medium security content filter</ul>
                    </ul>
                    <Link href="/sdwan-config/single-site">Single Site-1 vlan</Link>
                </div>
                <Link href="/sdwan-config/single-site">Single Site-1 vlan</Link>
                <Link href="/sdwan-config/topology">Topology</Link>
            </div>
        </div>
    )
}

export default SDWANConfig;