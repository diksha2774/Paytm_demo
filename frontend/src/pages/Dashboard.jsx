import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
export function Dashboard(){
    console.log("gey")
    const [balance,setbalance]=useState("");
    useEffect(()=>{
       axios.get("http://localhost:3000/app/v1/account/balance",{
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }
       }).then((response)=>{
        
            console.log("response = "+response.data.balance)
            setbalance(response.data.balance) 
           
       })

    },[balance])
    return(
        <div>
            <Appbar/>
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    )
}