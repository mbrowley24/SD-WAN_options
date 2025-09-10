import {createSlice} from "@reduxjs/toolkit";


const initialState ={
    mxData:{
        size: "",
        hostname: "",
        ha: "no",
        topology : "",
        utm: "yes",
        lan_routing: "",
        wan1:{
            provider: "",
            other: "",
            ipAssignment: "",
            network: "",
            cidr: "",
            gateway: "",
            description: ""
        },
        wan2:{
            provider: "",
            other: "",
            ipAssignment: "",
            network: "",
            cidr: "",
            gateway: "",
            description: ""
        },
        lanPorts:[],
        lanDHCP:[]
    },
    lanInterface: {
        hostname    : "",
        port        : "",
        vlanName    : "",
        vlanId      : "",
        vlanNetwork : "",
        dhcpServer  : "",
        dmzInternal :"",
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
    singleSite:{
        hostname:""
    },
    options: {
        topology: ["Hub", "Spoke"],
        size: ["MX68 (Small)", "MX85 (Med)", "MX105 (Lg)"],
        yesNo: ["No", "Yes"],
        routing: ["static", "BGP", "OSPF"],
        ipAssignment: ["static", "dhcp"],
        cidrList : [
            "/8",
            "/9",
            "/10",
            "/11",
            "/12",
            "/13",
            "/14",
            "/15",
            "/16",
            "/17",
            "/18",
            "/19",
            "/20",
            "/21",
            "/22",
            "/23",
            "/24",
            "/25",
            "/26",
            "/27",
            "/28",
            "/29",
            "/30",
            "/31"
            ],
        isp: [
            // 🌐 National & Large-Scale Business ISPs
            "Comcast Business",
            "Spectrum Business",
            "AT&T Business Internet",
            "Verizon Business Internet (5G/LTE)",
            "T-Mobile Business Internet",
            "Lumen (CenturyLink Business)",
            "Frontier Business",
            "Viasat Business",
            "HughesNet Business",
            "Starlink Business",
            "Kinetic Business (Windstream)",
            "Zayo Group",

            // 🏔️ Regional / Local Business ISPs
            "Google Fiber Business",
            "Rise Broadband Business",
            "Visionary Broadband Business",
            "Eagle Communications Business",
            "Centracom Business",
            "Silver Star Communications Business",
            "Mountain West Telephone (Business)",
            "Clearnetworx Business",
            "Satview Broadband Business",
            "Valley Telecom Business",
            "GCEA Business (Gunnison County Electric Association)",
            "Zito Media Business",

            // 📡 CLECs in the Mountain West
            "Veracity Networks (FirstDigital Telecom)",
            "FirstDigital Telecom",
            "Mammoth Networks",
            "Syringa Networks",
            "Allstream USA",
            "XO Communications (Verizon)",
            "Integra Telecom / Electric Lightwave",
            "other"
        ],
        mxPorts:{
            "" : [],
            "MX68 (Small)" : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], 
            "MX85 (Med)"   : ["1", "2", "3", "4", "5", "6", "7", "8", "SFP1", "SFP2"], 
            "MX105 (Lg)"   : ["1", "2", "3", "4", "1-10Gb", "2-10Gb"], 
        }


    },
    
    submitData:{
        mxData: [],
    
    },

    menu:{
        main: true,
        topology: false,
        
    }

}


function formatIPv4FromDigits(digits) {
  digits = digits.replace(/\D/g, ""); // digits only
  const parts = [];
  let seg = "";

  for (const ch of digits) {
    // If current segment is "0", we must start a new octet (no leading zeros)
    if (seg === "0") {
      parts.push(seg);
      seg = "";
      if (parts.length === 4) break; // ignore extra
    }

    // Try to extend current segment
    const next = seg + ch;

    // If extending makes value > 255, close current seg and start new with ch
    if (next.length > 1 && parseInt(next, 10) > 255) {
      if (seg.length === 0) {
        // If seg empty and ch alone > 255 (can't happen for single digit), fallback
        seg = ch;
      } else {
        parts.push(seg);
        seg = ch;
        if (parts.length === 4) break;
        continue;
      }
    } else {
      seg = next;
    }

    // If we hit 3 digits, cap this octet
    if (seg.length === 3) {
      parts.push(seg);
      seg = "";
      if (parts.length === 4) break;
    }
  }

  // Push any remaining segment if we still have room
  if (seg.length && parts.length < 4) parts.push(seg);

  // Truncate to 4 parts
  const ip = parts.slice(0, 4).join(".");

  return ip;
}

function isValidIPv4(ip) {
  const octets = ip.split(".");
  if (octets.length !== 4) return false;
  for (const o of octets) {
    if (!/^\d+$/.test(o)) return false;
    if (o.length > 1 && o.startsWith("0")) return false; // no leading zeros
    const n = Number(o);
    if (n < 0 || n > 255) return false;
  }
  return true;
}

const mxStore = createSlice({
    name: "mxData",
    initialState: initialState,
    reducers:{

        mxSize(state, action){
            
            console.log(action.payload)
            state.mxData.size = action.payload;
            
        },
        mxHostname(state, action){

            state.mxData.hostname
        },
        setHa(state, action){

            const validOption = state.options.yesNo.includes(action.payload);

            if(validOption){

                state.mxData.ha = action.payload;
            }else{

                state.mxData.ha = "No"
            }

        },
        setTopology(state, action){
            
            const valueOption = state.options.topology.includes(action.payload);

            if(valueOption){

                state.mxData.topology = action.payload;

            }else{

                state.mxData.topology = "Hub"
            }
            
        },
        setUtm(state, action){

            const validOption = state.options.yesNo.includes(action.payload);

            if(validOption){

                state.mxData.utm = action.payload;
           
            }else{


                state.mxData.utm = "Yes";
            } 
        },
        setLanRouting(state, action){
            
            const validOption = state.options.routing.includes(action.payload);
            
            
            if(validOption){

                state.mxData.lan_routing = action.payload;

            }else{

                state.mxData.lan_routing = "static" 
            }
        },
        setWAN1Provider(state, action){

            state.mxData.wan1.provider = action.payload;
        },
        setWAN1IPAssignment(state, action){

            

            const isValid = state.options.ipAssignment.includes(action.payload);
            
            if(isValid){

                state.mxData.wan1.ipAssignment = action.payload;
            }else{

                state.mxData.wan1.ipAssignment = "static";
            }
        },
        setWAN1Other(state, action){
            console.log("other")
            state.mxData.wan1.other = action.payload;
        },
        setWAN1Netowrk(state, action){

            const ipAddress = formatIPv4FromDigits(action.payload);

            if(isValidIPv4(ipAddress)){

            }else{

                state.mxData.wan1.network = ipAddress;
            }
            
        },
        setWan1Cidr(state, action){

            const cidr = action.payload;
            const isValid = state.options.cidrList.includes(cidr);

            if(isValid){

             
                state.mxData.wan1.cidr = cidr;
            
            
            }else{

                state.mxData.wan1.cidr = "29"

            }
        },    
        setWan1Gateway(state, action){
            const ipAddress = formatIPv4FromDigits(action.payload);

            state.mxData.wan1.gateway = ipAddress
        },
        setWan1Description(state, action){

            state.mxData.wan1.description = action.payload;

        },
        setWAN2Network(state, action){

            const ipAddress = formatIPv4FromDigits(action.payload);

            state.mxData.wan2.network = ipAddress;
        },
        setWAN2Provider(state, action){

            const isValid = state.options.isp.includes(action.payload);

            if(isValid){

                state.mxData.wan2.provider = action.payload;
            
            }else{

                state.mxData.wan2.provider = "other";
            }
        },
        setWAN2IPAssignment(state, action){
            
            const isValid = state.options.ipAssignment.includes(action.payload);

            if(isValid){

                state.mxData.wan2.ipAssignment = action.payload;
            }else{

                state.mxData.wan2.ipAssignment = "static";
            }
        },
         setWAN2Other(state, action){

            state.mxData.wan2.other = action.payload;
        },
        setWan2Cidr(state, action){
            
            const cidr = action.payload;
            const isValid = state.options.cidrList.includes(cidr);

            if(isValid){

             
                state.mxData.wan2.cidr = cidr;
            
            
            }else{

                state.mxData.wan2.cidr = "29"

            }
        },    
        setWan2Gateway(state, action){

            const ipAddress = formatIPv4FromDigits(action.payload);

            state.mxData.wan2.gateway = ipAddress;
        },
        setWan2Description(state, action){

            state.mxData.wan2.description = action.payload;
        },
        setLanInterfacePort(state, action){

            state.lanInterface.port = action.payload;
        }

    }
})

export const mxDataActions = mxStore.actions;
export default mxStore.reducer