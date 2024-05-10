import baseUrl from "../assets/baseUrl";
import axios from "axios";
import { useState } from "react";
export default function Login({stat}){
    const [formData,setFormData] = useState({
        username:"",
    })
    function onChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    function onSubmit(e){
        e.preventDefault()
        axios.post(`${baseUrl}user/login`,formData)
        .then(res=>{
            setFormData({
                username:""
            })
            stat[1]({...stat[0],home:true,login:false})
            
        })
        .catch(res=>{
            if(res.response.data.payload.statusCode==401){
                const halo = confirm(`${res.response.data.payload.message}, apakah ingin mengganti perangkat ?`)
                if(halo){
                    axios.post(`${baseUrl}/device`,{username:formData.username})
                }
            }else if(res.response.data.payload.statusCode==400){
                alert(res.response.data.payload.message)
            }else{
                localStorage.setItem("username",formData.username)
                alert(res.response.data.payload.message)
                stat[1]({...stat[0],token:true,login:false})
            }
            setFormData({
                username:""
            })

        })
    }
    function onClick(){
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        stat[1]({...stat[0],signup:true,login:false})            
    }
    return(
        <div className="container">
            <h1 className="my-3">KALKULATOR PAKAN</h1>
        <button className="btn btn-primary float-end my-3" onClick={onClick}>Registrasi</button>
            <form method="post" onSubmit={(e)=>onSubmit(e)} onChange={(e)=>onChange(e)}>
                <input required className="form-control" type="text" value={formData.username} name="username" id="username" placeholder="Username" />
                <input className="btn btn-success my-3" type="submit" value="Login" />
            </form>
        </div>
    )
}