import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { Input_Label } from "../components/Input_Label"
import { Button } from "../components/Button"
import { Bottom_warning } from "../components/Bottom_warning"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
export function Signup(){

    const [firstname,setFirstName]=useState("");
    const [lastname,setlastName]=useState("");
    const [username,setusername]=useState("");
    const [password,setpasword]=useState("");
    const navigate = useNavigate();

    return(
        <div className="bg-slate-300 h-screen flex justify-center" >
            <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">          
            <Heading Label={"Sign up"}/>
                <SubHeading Label={"Enter your information to create an account"}/>
                <Input_Label onChange={(e)=>{
                    setFirstName(e.target.value);
                }} Label={"First Name"} placeholder="Enter first name"/>
                <Input_Label onChange={(e)=>{
                    setlastName(e.target.value);
                }}  Label={"Last Name"} placeholder="Enter last name"/>
                <Input_Label onChange={(e)=>{
                    setusername(e.target.value);
                }}  Label={"username"} placeholder="Enter email"/>
                <Input_Label onChange={(e)=>{
                    setpasword(e.target.value);
                }}  Label={"Passsword"} placeholder="Enter password"/>
                <div className="pt-4">
                <Button onClick={async(e)=>{
                  const response = await axios.post("http://localhost:3000/app/v1/user/Signup",{
                        username,
                        firstname,
                        lastname,
                        password
                    })
                    localStorage.setItem("token",response.data.token);
                    navigate("/dashboard")

                }} Label="Sign up"/>
                </div>
                <Bottom_warning Label="Already have an account? Signin" />
            </div>
            </div>
        </div>
    )
}