import React from "react";




const UnderlayCircuitForm = (props) =>{
    const {data, inputChange} = props;

    return(
        <div className="flex m-auto">
            <div>
                <label>Hostname</label>
                <input/>
            </div>
            <div>
                 <label>WAN port </label>
                 <input/>
            </div>
            <div>
                 <label>Provider</label>
                 <input/>
            </div>
            <div>
                 <label>IP assignment</label>
                 <select>

                 </select>
            </div>
            <div>
                 <label>Network</label>
                 <input/>
            </div>
             <div>
                 <label>Gateway</label>
                 <input/>
            </div>
             <div>
                 <label>Description</label>
                 <input/>
            </div>
        </div>
    )
}

export default UnderlayCircuitForm;