import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { Input_Label } from "../components/Input_Label"
import { Button } from "../components/Button"
import { Bottom_warning } from "../components/Bottom_warning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = ()=>{
    const [email,setemail] = useState("");
    const [password,setpasword]=useState("")
    const navigate = useNavigate();
    return(
        <div className="bg-slate-300 h-screen flex justify-center" >
            <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">          
            <Heading Label={"Sign In"}/>
                <SubHeading Label={"Enter your credentials to access your account"}/>
                <Input_Label onChange={(e)=>{
                    setemail(e.target.value);
                }} Label={"Email"} placeholder="Enter email"/>
                <Input_Label onChange={(e)=>{
                    setpasword(e.target.value);
                }} Label={"Passsword"} placeholder="Enter password"/>
                <div className="pt-4">
                <Button onClick={async(e)=>{
                    const response = await axios.post("http://localhost:3000/app/v1/user/Signin",{
                        username:email,
                        password:password
                    })
                    localStorage.setItem("token",response.data.token);
                    navigate("/dashboard")
                    }} Label="Sign In"/>
                </div>
                <Bottom_warning Label="Don't have an account? Signup" />
            </div>
            </div>
        </div>
    )
}