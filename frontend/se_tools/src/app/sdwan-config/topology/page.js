'use client'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {mxDataActions} from "@/store/mxStore";
import Link  from "next/link";

const MXTopologyForm = () =>{
    const dispatch = useDispatch(); 
    const topologyData = useSelector((s)=> s.mxData)
    
    
    return(
        <div>
            <div>
                <h6 className="font-bold m-auto">MX Topology Form</h6>
                 <Link href="/sdwan-config">SDWAN Configuration</Link>
            </div>
            <div className={"w-1/4 m-auto border"}>
                <div className="border p-2 my-3">
                     <div className="p-2 my-2 border ">
                        <p className="text-center">This information can be found in the order</p>
                     </div>
                    <label className="block">MX Size</label>
                    
                    <select
                    className="border p-1"
                     name={'top_size'}
                     value={topologyData.mxData.size}
                     onChange={(e)=>dispatch(mxDataActions.mxSize(e.target.value))}
                    >
                     {
                       topologyData.options.size.map((item, idx)=>{
                           
                            return(
                                <option
                                     key={idx}
                                     value={item}
                                 >{item}
                             </option>
                             
                            )
                        })
                            
                     }
                    </select>
                </div>
                <div className="border p-2 my-3">
                    
                   <div className="p-2 my-1">
                        <p className="text-center border">Pick a name that helps you remember the device. Can be name of a location ex. Main</p>
                   </div>
                    <label className="block">Hostname</label>
                    <input
                         className="border"
                         value={topologyData.mxData.hostname}
                         name="top_hostname"
                         onChange={(e)=>dispatch(mxDataActions.mxHostname(e.target.value))}
                    />
                </div>
                <div className="border my-3">
                   <div className="p-2 my-1">
                        <p className="text-center border">Is this device part of a High Availiblity pair of firewalls used to reduncy? Need 2 two firewalls for this config.</p>
                   </div>
                    <label className="block">Ha(Y/N)</label>
                    <select
                        value={topologyData.mxData.ha}
                        name={"top_ha"}
                        onChange={(e)=>dispatch(mxDataActions.setHa(e.target.value))}
                    >
                       {
                       topologyData.options.yesNo.map((item, idx)=>{
                           
                            return(
                                <option
                                     key={idx}
                                     value={item}
                                 >{item}
                             </option>
                             
                            )
                        })
                            
                     }
                    </select>
                </div>
                <div className="my-2 border">
                    <div className="my-2">
                        <p className="text-centered">Need more information</p>
                    </div>
                    <label className="block">Topology</label>
                     <select
                        value={topologyData.mxData.topology}
                        name={"top_ha"}
                        onChange={(e)=>dispatch(mxDataActions.setTopology(e.target.value))}
                    >
                       {
                       topologyData.options.topology.map((item, idx)=>{
                           
                            return(
                                <option
                                     key={idx}
                                     value={item}
                                 >{item}
                             </option>
                             
                            )
                        })
                            
                     }
                    </select>
                </div>
                <div className="border my-2">
                    <div className="my-2 border">
                        <p className="text-center font-bold">Unified Threat Management</p>
                    <ul>
                        <li><strong>Threat detection &amp; blocking:</strong> Watches internet traffic and stops attacks automatically.</li>
                        <li><strong>Virus &amp; malware protection:</strong> Scans downloads and emails to catch harmful files.</li>
                        <li><strong>Web filtering:</strong> Blocks risky or inappropriate sites; can enforce SafeSearch/YouTube restrictions.</li>
                        <li><strong>Location &amp; app controls:</strong> Block traffic from high-risk countries and allow only approved apps; includes secure remote access (VPN).</li>
                    </ul>
                    </div>
                    <label className="block">UTM (Y/N)</label>
                    <select
                        value={topologyData.mxData.utm}
                        name="top_utm"
                        onChange={(e)=>dispatch(mxDataActions.setUtm(e.target.value))}

                    >
                        {
                            topologyData.options.yesNo.map((item, idx) =>{

                                return(
                                    <option
                                         key={idx}
                                         value={item}
                                    >
                                        {item}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="my-2 p-2 border">
                    <div className="text-center">
                        <p>Need more information</p>
                    </div>
                    <label className="block">LAN routing</label>
                    <select
                        value={topologyData.mxData.lan_routing}
                        name={"top_ha"}
                        onChange={(e)=>dispatch(mxDataActions.setLanRouting(e.target.value))}
                    >
                       {
                       topologyData.options.routing.map((item, idx)=>{
                           
                            return(
                                <option
                                     key={idx}
                                     value={item}
                                 >{item}
                             </option>
                             
                            )
                        })
                            
                     }
                    </select>
                </div>
                <div>
                    <p>ISP</p>
                    <div>
                        <label>WAN 1</label>
                        <select>

                        </select> 
                    </div>
                    <div>
                        <label>WAN 2</label>
                         <select>

                        </select>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default MXTopologyForm;