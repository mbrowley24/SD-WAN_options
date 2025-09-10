import React from "react";





const Tolology = (props) =>{
    const {data} = props;
    console.log(data.submitData)
    return(
        <div>
            <table className="min-w-3/4 m-auto table-auto">
                <thead>
                    <tr>
                        <th>MX Size</th>
                        <th>MX Hostname</th>
                        <th>HA (Y/N)</th>
                        <th>Topology</th>
                        <th>UTM (Y/N)</th>
                        <th>LAN Routing</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.submitData.topology && data.submitData.topology.map((item, idx) =>{
                            
                            return(
                                <tr key={idx}>
                                    <td>{item.size}</td>
                                    <td>{item.hostname}</td>
                                    <td>{item.ha}</td>
                                    <td>{item.topology}</td>
                                    <td>{item.utm}</td>
                                    <td>{item.lan_routing}</td>
                                 </tr>
                            )
                        
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Tolology;