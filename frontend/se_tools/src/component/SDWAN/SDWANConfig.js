import React from "react";
import useHttp from "@/hooks/useHttp";


const SDWANConfig = (props) =>{
    const {request} = useHttp();

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
            method: "POST"
        }) 
        
    }

    return(
        <form onSubmit={formhandler}>
            <label>test</label>
            <button>save</button>
        </form>
    )
}

export default SDWANConfig;