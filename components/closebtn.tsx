"use client"

export default function CloseBtn(){
    return(
        <button
          className="absolute top-10 right-10 text-white text-3xl font-bold"
          onClick={() => history.back()}
            >
          ❌
        </button>
    )
} 