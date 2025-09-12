"use client"
import React, {useEffect, useMemo, useState} from "react"
import { ExcelDownload } from "@/component/helper/excel"
import { formatIPv4FromDigits, isValidIPv4 } from "@/component/helper/ipaddress"
import Link from "next/link";
import { mxTopologyErrors } from "@/component/helper/mxValidations";
import { useDispatch, useSelector } from "react-redux"
import useHttp from "@/hooks/useHttp"

const SingleSite = () =>{
    const mxData = useSelector((s) => s.mxData)
    const [touched, setTouched] = useState({
        customerName  : false,
        address       : false,
        size          : false,
        hostname      : false,
        provider      : false,
        other         : false,
        ipAssignment  : false,
        network       : false,
        cidr          : false,
        gateway       : false,
        business_type : false,

    });
    const {request} = useHttp();
    const [defaultHostname, setHostname] = useState(true)
    const [formData, setFormData] = useState({
        customerName: "",
        cidr: "/29",
        address : "",
        hostname: "",
        provider: mxData.options.isp[0],
        other : "",
        size: mxData.options.size[0],
        ipAssignment: mxData.options.ipAssignment[0],
        network: "",
        gateway: "",
        description: "",
        business_type: mxData.options.business_types[0]
    });
    const errors = useMemo(() =>{
        return mxTopologyErrors(formData) 
    },[formData])

    useEffect(()=>{
        
        const formDataObj   = {...formData}
        
        if(formDataObj.ipAssignment === "dhcp"){
            
            
            formDataObj.network = "";
            formDataObj.gateway = "";
            formDataObj.cidr    = "";

        }else{

            formDataObj.cidr = "/29";
        
        }
        
        setFormData(formDataObj)
        

    }, [formData.ipAssignment])
    
   
    const inputChange = (e) =>{
        const {name, value} = e.target;
        
        const formDataObj = {...formData};

        

        if(name === "network" || name === "gateway"){

            formDataObj[name] = formatIPv4FromDigits(value);
            
        }else{

           formDataObj[name] = value;
        
        }

    
        setFormData(formDataObj)
    }

    const submitData = async (e) =>{
        e.preventDefault();

        const applyData = (res) =>{
            
            ExcelDownload(res)
        }

        await request("single-site", applyData, {
            method: "POST",
            body: JSON.stringify(formData)
        })

    }

    const formBlurr = (e) =>{
        const {name} = e.target
        setTouched((prev) =>({...prev, [name]: true}))
    }

    return(
        
        <form onSubmit={submitData} onBlur={formBlurr} className="max-w-3xl mx-auto bg-white/60 backdrop-blur shadow rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">Create MX Configuration</h2>

            {/* Customer & Address */}
            <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col">
                    <label htmlFor="customerName" className="mb-1 text-sm font-medium text-gray-700">Customer Name</label>
                    <input
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        maxLength={'100'}
                        minLength={'2'}
                        placeholder="Acme Corp"
                        onChange={inputChange}
                        className="rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {touched['customerName'] && errors["customerName"] && <p id="customer-name-error" role="alert" className="mt-1 text-sm text-red-600">
                        {errors["customerName"]}
                    </p>}
                </div>

            <div className="flex flex-col">
                <label htmlFor="address" className="mb-1 text-sm font-medium text-gray-700">Address</label>
                <input
                    id="address"
                    name="address"
                    value={formData.address}
                    maxLength={'200'}
                    minLength={'5'}
                    placeholder="123 Main St, City, ST"
                    onChange={inputChange}
                    className="rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {touched['address'] && errors["address"] && <p id="address-error" role="alert" className="mt-1 text-sm text-red-600">{errors["address"]}</p>}
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
            {touched["size"] && errors['size'] && <p id="mx-size-error" role="alert" className="mt-1 text-sm text-red-600">Required</p>}
            </div>

            <div className="flex flex-col">
            <label htmlFor="hostname" className="mb-1 text-sm font-medium text-gray-700">MX Hostname</label>
            <input
                id="hostname"
                name="hostname"
                value={formData.hostname}
                minLength={"4"}
                maxLength={"25"}
                placeholder="mx-edge-01"
                onChange={(e)=>inputChange(e)}
                className="rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {touched["hostname"] && errors["hostname"] && <p id="hostname-error" role="alert" className="mt-1 text-sm text-red-600">{errors["hostname"]}</p>}
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
                    onChange={(e)=>inputChange(e)}
                    className="rounded-xl border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    {mxData.options.isp.map((item, idx) => (
                    <option key={idx}  value={item}>{item}</option>
                    ))}
                </select>
                { touched["provider"] && errors["provider"] && <p id="provider-error" role="alert" className="mt-1 text-sm text-red-600">Required</p>}
            </div>

            {formData.provider === "other" && (
            <div className="flex flex-col">
                <label htmlFor="other" className="mb-1 text-sm font-medium text-gray-700">Other Provider</label>
                <input
                id="other"
                name="other"
                value={formData.other}
                placeholder="Provider name"
                onChange={(e)=>inputChange(e)}
                className="rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {touched["other"] && errors["other-provider"] && <p id="provider-other-error" role="alert" className="mt-1 text-sm text-red-600">Required</p>}
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
                onChange={(e)=>inputChange(e)}
                className="rounded-xl border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                {mxData.options.ipAssignment.map((item, idx) => (
                <option key={idx} className="text-center" value={item}>{item}</option>
                ))}
            </select>
            {touched["ipAssignment"] && errors["ipAssignment"] && <p id="static-dhcp-error" role="alert" className="mt-1 text-sm text-red-600">{errors["ipAssignment"]}</p>}
            </div>
        </div>

  {/* Network + CIDR */}
  { formData.ipAssignment === "static" &&
   <div className="grid gap-5 md:grid-cols-2">
    <div className="flex flex-col">
      <label htmlFor="network" className="mb-1 text-sm font-medium text-gray-700">Network</label>
      <input
        id="network"
        name="network"
        value={formData.network}
        placeholder="e.g., 10.0.0.0"
        onChange={(e)=>inputChange(e)}
        className="rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {touched["network"] && errors["network"] && <p id="network-error" role="alert" className="mt-1 text-sm text-red-600">{errors["network"]}</p>}
    </div>

    <div className="flex flex-col">
      <label htmlFor="cidr" className="mb-1 text-sm font-medium text-gray-700">CIDR</label>
      <select
        id="cidr"
        name="cidr"
        value={formData.cidr}
        onChange={(e)=>inputChange(e)}
        className="rounded-xl border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {mxData.options.cidrList.map((item, idx) => (
          <option key={idx}   value={item}>{item}</option>
        ))}
      </select>
      {touched["cidr"] && errors["cidr"] && <p id="cidr-error" role="alert" className="mt-1 text-sm text-red-600">{errors["cidr"]}</p>}
    </div>
  </div>
 }
  {/* Gateway & Description */}
  <div className="grid gap-5 md:grid-cols-2">
    { formData.ipAssignment === "static" &&
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
      {touched["gateway"] && errors["gateway"] && <p id="gateway-error" role="alert" className="mt-1 text-sm text-red-600">{errors["gateway"]}</p>}
    </div>
    }
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
  <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col">
                <label htmlFor="provider" className="mb-1 text-sm font-medium text-gray-700">Content Filter</label>
                <select
                    id="business_type"
                    name="business_type"
                    value={formData.business_type}
                    onChange={(e)=>inputChange(e)}
                    className="rounded-xl border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    {mxData.options.business_types.map((item, idx) => (
                    <option key={idx} className="text-center"  value={item}>{item}</option>
                    ))}
                </select>
                { touched["business_type"] && errors["business_type"] && <p id="business_type-error" role="alert" className="mt-1 text-sm text-red-600">Required</p>}
            </div>
        </div>

  {/* Submit */}
  <div className="pt-2">
    <button
      disabled = {Object.keys(errors).length > 0}
      type="submit"
      className="inline-flex items-center justify-center rounded-xl bg-blue-600 text-white px-5 py-2.5 font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
    >
      Create
    </button>
     <Link href="/" className="inline-flex items-center justify-center rounded-xl bg-indigo-200/90 px-4 py-2 text-sm font-medium text-slate-900 shadow-lg shadow-indigo-500/20 ring-1 ring-inset ring-indigo-300/60 transition hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Main Menu</Link>
  </div>
</form>

    )
}


export default SingleSite;