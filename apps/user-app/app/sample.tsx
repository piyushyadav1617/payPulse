"use client"
import { useEffect } from "react"
export const Sample = ()=>{
        async function main(){
            const res = await fetch("/api/users");
            const users = await res.json();
            console.log(users)
        }
     useEffect(()=>{
       main();
     },[])
    return <div className="m-10">
        
    </div>
}