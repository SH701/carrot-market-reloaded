import { InputHTMLAttributes } from "react";

interface IProps{
    errors?:string[];
    name:string;
}

export default function Input({errors=[],name,...rest}:IProps 
    & InputHTMLAttributes<HTMLInputElement>){
    return (
        <div className="flex flex-col gap-2">
            <input className="bg-transparent rounded-md w-full h-10 
            focus:outline-none ring-2 focus:ring-4 ring-gray-200 transition
            focus:ring-orange-500 border-none placeholder:text-gray-400" 
            name={name} {...rest}/>
           {errors.map((error, index) => (
            <span key={index} className="text-red-500 font-medium">{error}</span>
            ))}
        </div>
    )
}