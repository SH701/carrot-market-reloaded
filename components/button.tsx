"use client"

import { useFormStatus } from "react-dom";

interface IProps{
    text:string;
}

export default function Button({text}:IProps){
    const {pending} = useFormStatus(); //자식요소에만 사용 action되는 form에서 사용불가
    return (
        <button disabled={pending} className="btn h-10 disabled:bg-gray-500 
            disabled:text-gray-300 disabled:cursor-not-allowed">
            {pending? "Loading..." : text}
        </button>
    )
}