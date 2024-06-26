import baseUrl from "../assets/baseUrl";
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
        const form = new FormData();
    form.append("username", formData.username);
    form.append("token", formData.token);
    fetch(`${baseUrl}token`, {
      method: "POST",
      body: form,
    })
      .then((res) => res.text())
      .then((res) => res.slice(res.indexOf("{"), res.length))
      .then((res) => JSON.parse(res))
      .then((res) => {
        setFormData({
          username: window.localStorage.getItem("username"),
          token: "",
        });
        if (res.payload.statusCode == 200) {
            document.cookie = `username=${window.localStorage.getItem("username")}`
            stat[1]({...stat[0],home:true,token:false})
        } else {
          alert(res.payload.message);
        }
      });
    }
    return(
        <div className="container">
            <h1 className="my-3">KALKULATOR PAKAN</h1>
            <form method="post" onSubmit={(e)=>onSubmit(e)} onChange={(e)=>onChange(e)}>
                <input required className="form-control mb-3" type="text" value={formData.username} name="username" id="username" placeholder="Username" />
                <input required className="form-control" type="text" value={formData.token} name="token" id="token" placeholder="Token" />
                <input className="btn btn-primary my-3" type="submit" value="Verifikasi" />
                <a className="mx-3 btn btn-success" href={`https://wa.me/6289636055420?text=Permisi, saya ingin meminta token verifikasi untuk akun${formData.username}`}>Admin</a>
            </form>
        </div>
    )
}