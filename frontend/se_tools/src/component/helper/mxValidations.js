import { initialState } from "@/store/mxStore";
import { isValidIPv4 } from "./ipaddress";
import { Ms_Madi } from "next/font/google";



const customerNameValidation = (name) =>{

    return name.length >= 2;

}

const minCharsMsg = (min) => {
  
  return `At least ${min} characters`;
}

const inValidValue = (field) =>{
    return `${field} invalid`
}


const addressValidation = (address) =>{

    return address.length >= 5;

}

const sizeValidations = (size) =>{

    return initialState.options.size.includes(size);

}

const hostnameValidation = (name) =>{

    return name.length >= 4;

}

const providerValidation = (provider) =>{

    return initialState.options.isp.includes(provider);
}

const otherValidation = (other) =>{

    return other.length >= 2;
}

const ipAssignmentValidation = (assignment) =>{

    return initialState.options.ipAssignment.includes(assignment);
}

const cidrValidation = (cidr) =>{

    return initialState.options.cidrList.includes(cidr);
}

const businessTypeValidation = (business_type) =>{

    return initialState.options.business_types.includes(business_type);
}


const isRFC1918 = (ip) => {
  const parts = ip.split(".").map(Number);
  
  if (parts.length !== 4 || parts.some(n => !Number.isInteger(n) || n < 0 || n > 255)) return false;
  
  const [a, b] = parts;
  if (a === 10) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  
  return false;
}


export const mxTopologyErrors = (data) =>{

    let errors = {};

    if(!customerNameValidation(data['customerName'])){

        errors["customerName"] = minCharsMsg(2);
    }

    if(!hostnameValidation(data['hostname'])){
        
        errors["hostname"] = minCharsMsg(4);
    }

    if(!addressValidation(data['address'])){

        errors['address'] = minCharsMsg(5);
    }

    if(!sizeValidations(data['size'])){

        errors["size"] = inValidValue("mx size");
    }

    
    if(!providerValidation(data['provider'])){

        errors["provider"] = inValidValue("ISP");
    }

    if(data.provider === "other" && !otherValidation(data)){

        errors["other-provider"] = minCharsMsg(2);
    }

    if(!ipAssignmentValidation(data['ipAssignment'])){

        errors['ipAssignment'] = inValidValue("static / dhcp");
    }

    if(!cidrValidation(data['cidr']) && data["ipAssignment"] === "static"){

        errors['cidr'] = inValidValue("cidr");
    }

    if(!isValidIPv4(data["network"]) && data["ipAssignment"] === "static"){

        errors["network"] = inValidValue("address");
    }

    if(!isValidIPv4(data["gateway"]) && data["ipAssignment"] === "static"){
        errors["gateway"] = inValidValue("address");
    }

    if(!businessTypeValidation(data["business_type"])){

        errors["business_type"] = inValidValue("business_type");
    }

    if(isValidIPv4(data["network"]) && data["ipAssignment"] === "static"){

        if(isRFC1918(data["network"])){
           errors["network"] = "private address (RFC1918)" 
        }

    }

    if(isValidIPv4(data["gateway"]) && data["ipAssignment"] === "static"){
        
        if(isRFC1918(data["gateway"])){
           errors["gateway"] = "private address (RFC1918)" 
        }
    }    

    
    return errors;

}




