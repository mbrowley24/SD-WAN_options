import React from "react";





const LANInterfaceForm = (props) =>{
    const {data, action, dispatch} = props;
    console.log(data.options.mxPorts)
    console.log(data.options.mxPorts[data.size])
    return(
        <form>
            <div>
                <label>Hostname</label>
                <input
                    value={data.hostname}
                    readOnly={true}
                />
            </div>
            <div>
                <label>Port</label>
                <select
                    onChange={(e)=>dispatch(action.setLanInterfacePort(e.target.value))}
                >
                    {
                        data.options.mxPorts[data.mxData.size].map((item, idx)=>{

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
            <div>
                <label>VLAN Name</label>
                <input
                    value={data.lanInterface.vlanName}
                />
            </div>
            <div>
                <label>VLAN ID</label>
                <input
                    value={data.lanInterface.vlanId}
                />
            </div>
            <div>
                <label>VLAN Network</label>
            </div>
        </form>
        
    )
}

export default LANInterfaceForm;