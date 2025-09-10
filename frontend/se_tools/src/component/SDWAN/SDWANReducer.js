
export const initialState ={
    mxData:{
        size: "",
        hostname: "",
        ha: "no",
        topology : "",
        utm: "yes",
        lan_routing: "",
        port: "",
        provider: "",
        ipAssignment: "",
        network: "",
        gateway: "",
        description: "",
        lanPorts:[],
        lanDHCP:[]
    },
    lanInterface: {
        port:"",
        vlanName: "",
        vlanId:"",
        vlanNetwork:"",
        dhcpServer: "",
        dmzInternal:"",
    },
    lanDHCPServer:{
        vlanId:"",
        dns1: "8.8.8.8",
        dns2: "75.75.75.75",
        dhcpOption:"",
        dhcpResveration: "",
        dhcpRange:"",
        reservation:[]
    },
    dhcpReseration:{
        deviceName: "",
        ip:"",
        macAddress:""
    },
    
    options: {
        size: ["Small (MX68)", "Med (Mx85)", "Lg (MX105)"],
        yesNo: ["No", "Yes"],
        ipAssignment: ["static", "dhcp"]
    },
    
    submitData:{
        mxData: [],
    
    },

    menu:{
        main: true,
        topology: false,
        
    }

}

export const SDWANReducer = (state, action) =>{

    const data = JSON.parse(JSON.stringify(state));

    switch(action.type){

        case "top_size":

            console.log(data['topology']['form']['size'])
           
            data['topology']['form']['size'] = action.payload;
            
            console.log(data)

            return data;


        case "top_hostname":

             const hostname = action.payload;

            data['topology']['form']['hostname'] = action.payload;

            data['underlay']['form']['hostname'] = ""

            return data;


        case "top_ha":

            const ha_value = action.payload.toLowerCase();
            
            if(ha_value === "yes" || ha_value === "no"){
           
                data['topology']['form']['ha'] = action.payload;
           
            }else{
           
                data['topology']['form']['ha'] = no;
           
            }

        
            return data;
        
        case "top_topology":

            data['topology']['form']['topology'] = action.payload;

            return data;

        case "top_utm":


            const utm_value = action.payload.toLowerCase();
            
            if(utm_value === "yes" || utm_value === "no"){
           
                data['topology']['form']['utm'] = action.payload;
           
            }else{
           
                data['topology']['form']['utm'] = no;
           
            }
            
            return data;
        
        case "top_lan_routing":

            data['topology']['form']['lan_routing'] = action.payload;

            return data;

        
        case "add_topology":

            data['submitData']["topology"].push(data['topology']['form']);
            data['topology']['form'] = {...initialState['topology']['form']};
            
            console.log(data)
            return data;


        default:
            
            data;
        }
}