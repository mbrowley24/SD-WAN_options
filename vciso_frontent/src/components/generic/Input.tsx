'use client'

import React from "react";


const Input = ({
                           className,
                           data,
                           inputChange,
                           name,
                           type
                       }:
                       {
                           className?: string
                           data:string,
                           inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
                           name: string
                           type?: string
                       }) => {





    return (
        <>
            <input
                className={className}
                id={name}
                name={name}
                type={type? type : "text"}
                value={data}
                onChange={inputChange}
            />
        </>
    )

};

export default Input;