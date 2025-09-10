"use client"
import React, {useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import useHttp from "@/hooks/useHttp"
import { formatIPv4FromDigits } from "@/component/helper/ipaddress"
import { ExcelDownload } from "@/component/helper/excel"

const SingleSite = () =>{
    const {request} = useHttp()
    const [defaultHostname, setHostname] = useState(true)
    const [formData, setFormData] = useState({
        customerName: "",
        address : "",
        hostname: "",
        provider: "",
        other : "",
        size: "",
        ipAssignment: "",
        network: "",
        gateway: "",
        description: ""
    });

    const mxData = useSelector((s) => s.mxData)
   
    const inputChange = (e) =>{
        const {name, value} = e.target;
        
        const formDataObj = {...formData};

        

        if(name === "network" || name === "gateway"){

            formDataObj[name] = formatIPv4FromDigits(value);
            
        }else{

           formDataObj[name] = value;
        
        }

    
        setFormData(formDataObj)
        console.log(formData)
    }

    const submitData = async (e) =>{
        e.preventDefault();

        console.log(formData)
        const applyData = (res) =>{
            console.log(res)
            ExcelDownload(res)
        }

        await request("single-site", applyData, {
            method: "POST",
            body: JSON.stringify(formData)
        })


    }

    

    return(
        
        <form onSubmit={submitData} className="max-w-3xl mx-auto bg-white/60 backdrop-blur shadow rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">Create MX Configuration</h2>

            {/* Customer & Address */}
            <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col">
                    <label htmlFor="customerName" className="mb-1 text-sm font-medium text-gray-700">Customer Name</label>
                    <input
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        maxLength={100}
                        minLength={2}
                        placeholder="Acme Corp"
                        onChange={inputChange}
                        className="rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

            <div className="flex flex-col">
                <label htmlFor="address" className="mb-1 text-sm font-medium text-gray-700">Address</label>
                <input
                    id="address"
                    name="address"
                    value={formData.address}
                    maxLength={200}
                    minLength={5}
                    placeholder="123 Main St, City, ST"
                    onChange={inputChange}
                    className="rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </div>

        {/* MX size & Hostname */}
        <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col">
            <label htmlFor="size" className="mb-1 text-sm font-medium text-gray-700">MX Size</label>
            <select
                id="size"
                name="size"
                value={formData.size}
                onChange={inputChange}
                className="rounded-xl border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                {mxData.options.size.map((item, idx) => (
                <option key={idx} value={item}>{item}</option>
                ))}
            </select>
            </div>

            <div className="flex flex-col">
            <label htmlFor="hostname" className="mb-1 text-sm font-medium text-gray-700">MX Hostname</label>
            <input
                id="hostname"
                name="hostname"
                value={formData.hostname}
                minLength={4}
                maxLength={25}
                placeholder="mx-edge-01"
                onChange={inputChange}
                className="rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
        </div>

        {/* Provider (with Other) */}
        <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col">
            <label htmlFor="provider" className="mb-1 text-sm font-medium text-gray-700">Underlay Provider</label>
            <select
                id="provider"
                name="provider"
                value={formData.provider}
                onChange={inputChange}
                className="rounded-xl border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                {mxData.options.isp.map((item, idx) => (
                <option key={idx} value={item}>{item}</option>
                ))}
            </select>
            </div>

            {formData.provider === "other" && (
            <div className="flex flex-col">
                <label htmlFor="other" className="mb-1 text-sm font-medium text-gray-700">Other Provider</label>
                <input
                id="other"
                name="other"
                value={formData.other}
                placeholder="Provider name"
                onChange={inputChange}
                className="rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            )}
        </div>

        {/* IP Assignment */}
        <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col">
            <label htmlFor="ipAssignment" className="mb-1 text-sm font-medium text-gray-700">Static / DHCP</label>
            <select
                id="ipAssignment"
                name="ipAssignment"
                value={formData.ipAssignment}
                onChange={inputChange}
                className="rounded-xl border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                {mxData.options.ipAssignment.map((item, idx) => (
                <option key={idx} value={item}>{item}</option>
                ))}
            </select>
            </div>
        </div>

  {/* Network + CIDR */}
  <div className="grid gap-5 md:grid-cols-2">
    <div className="flex flex-col">
      <label htmlFor="network" className="mb-1 text-sm font-medium text-gray-700">Network</label>
      <input
        id="network"
        name="network"
        value={formData.network}
        placeholder="e.g., 10.0.0.0"
        onChange={inputChange}
        className="rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="cidr" className="mb-1 text-sm font-medium text-gray-700">CIDR</label>
      <select
        id="cidr"
        name="cidr"
        value={formData.cidr}
        onChange={inputChange}
        className="rounded-xl border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {mxData.options.cidrList.map((item, idx) => (
          <option key={idx} value={item}>{item}</option>
        ))}
      </select>
    </div>
  </div>

  {/* Gateway & Description */}
  <div className="grid gap-5 md:grid-cols-2">
    <div className="flex flex-col">
      <label htmlFor="gateway" className="mb-1 text-sm font-medium text-gray-700">Gateway</label>
      <input
        id="gateway"
        name="gateway"
        value={formData.gateway}
        placeholder="e.g., 10.0.0.1"
        onChange={inputChange}
        className="rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="description" className="mb-1 text-sm font-medium text-gray-700">Description</label>
      <input
        id="description"
        name="description"
        value={formData.description}
        maxLength={50}
        placeholder="Optional notes"
        onChange={inputChange}
        className="rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>

  {/* Submit */}
  <div className="pt-2">
    <button
      type="submit"
      className="inline-flex items-center justify-center rounded-xl bg-blue-600 text-white px-5 py-2.5 font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
    >
      Create
    </button>
  </div>
</form>

    )
}


export default SingleSite;