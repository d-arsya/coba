import baseUrl from "../assets/baseUrl";
import axios from "axios";
import { useState } from "react";
export default function Token({stat}){
    const [formData,setFormData] = useState({
        username:window.localStorage.getItem("username"),
        token:""
    })
    function onChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    function onSubmit(e){
        e.preventDefault()
        axios.post(`${baseUrl}token`,formData)
        .then(res=>{
            alert(res.data.payload.message)
            setFormData({
                username:window.localStorage.getItem("username"),
                token:""
            })
            document.cookie = `username=${window.localStorage.getItem("username")}`
            stat[1]({...stat[0],home:true,token:false})
        })
        .catch(res=>{
            alert(res.response.data.payload.message)
            setFormData({
                username:window.localStorage.getItem("username"),
                token:""
            })

        })
    }
    return(
        <div className="container w-75">
            <h1 className="my-3">KALKULATOR PAKAN</h1>
            <form method="post" onSubmit={(e)=>onSubmit(e)} onChange={(e)=>onChange(e)}>
                <input required className="form-control mb-3" type="text" value={formData.username} name="username" id="username" placeholder="Username" />
                <input required className="form-control" type="text" value={formData.token} name="token" id="token" placeholder="Token" />
                <input className="btn btn-primary my-3" type="submit" value="Verifikasi" />
            </form>
        </div>
    )
}