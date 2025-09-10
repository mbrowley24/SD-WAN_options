import React from "react";


const LANInterface = (props) =>{
    const {interfaces} = props;

    return(
        <table>
            <thead>
                <tr>
                    <th>Hostname</th>
                    <th>MX Port</th>
                    <th>VLAN Name</th>
                    <th>VLAN ID</th>
                    <th>VLAN IP Address</th>
                    <th>DHCP Server IP</th>
                    <th>DMZ / Internal</th>
                </tr>
            </thead>
            <tbody>
                {
                    interfaces.map((item, idx)=>{

                        return(
                            <tr key={idx}>
                                <td>{item.hostname}</td>
                                <td>{item.port}</td>
                                <td>{item.vlanName}</td>
                                <td>{item.vlanId}</td>
                                <td>{item.vlanNetwork}</td>
                                <td>{item.dhcpServer}</td>
                                <td>{item.dmzInternal}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default LANInterface;