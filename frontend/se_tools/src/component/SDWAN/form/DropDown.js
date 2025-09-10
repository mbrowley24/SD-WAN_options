import React from "react";




const DropDown = (props) =>{
    const {action, css, dispatch, label, options, value,} = props;
    return(
         <>
            <label className="block">{label}</label>
            <select
                className={css}
                value={value}
                onChange={(e)=>dispatch(action(e.target.value))}
                >
                    <option value={''}>Select Option</option>
                    {
                        options.map((item, idx)=>{


                            return(
                                <option key={item}>
                                    {item}
                                </option>
                            )
                        })
                    }
            </select>
         
         </>
                        
    )
}

export default DropDown;