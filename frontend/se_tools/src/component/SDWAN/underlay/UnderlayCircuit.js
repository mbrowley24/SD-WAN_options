import React from "react";




const UnderlayCircuits = (props) =>{
    const {data} = props;

     return(
        <div>
            <table className="min-w-3/4 m-auto table-auto">
                <thead>
                    <tr>
                        <th>Hostname</th>
                        <th>MX Port</th>
                        <th>Provider</th>
                        <th>Static / DHCP</th>
                        <th>Network</th>
                        <th>Gateway</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.submitData.underlay && data.submitData.underlay.map((item, idx) =>{
                            
                            return(
                                <tr key={idx}>
                                    <td>{item.hostname}</td>
                                    <td>{item.port}</td>
                                    <td>{item.provider}</td>
                                    <td>{item.ipAssignment}</td>
                                    <td>{item.network}</td>
                                    <td>{item.gateway}</td>
                                    <td>{item.description}</td>
                                 </tr>
                            )
                        
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UnderlayCircuits