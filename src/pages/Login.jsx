import baseUrl from "../assets/baseUrl";
import { useState } from "react";
export default function Login({stat}){
    const [formData,setFormData] = useState({
        username:window.localStorage.getItem("username")?window.localStorage.getItem("username"):"",
    })
    function onChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    function onSubmit(e){
        e.preventDefault()
        const form = new FormData();
        form.append("username", formData.username);
        fetch(`${baseUrl}user/login`, {
          method: "POST",
          body: form,
        })
          .then((res) => res.text())
          .then((res) => res.slice(res.indexOf("{"), res.length))
          .then((res) => JSON.parse(res))
          .then((res) => {
            if (res.payload.statusCode == 200) {
                stat[1]({...stat[0],home:true,login:false})
            }else if(res.payload.statusCode == 400){
              alert(res.payload.message);
            }else if(res.payload.statusCode == 401){
                const halo = confirm(`${res.payload.message}, apakah ingin mengganti perangkat ?`)
                if(halo){
                    fetch(`${baseUrl}device`,{
                        method:"POST",
                        body:form
                    })
                    .then((res) => res.text())
          .then((res) => res.slice(res.indexOf("{"), res.length))
          .then((res) => JSON.parse(res))
                    .then(res=>{
                        alert(res.payload.message)
                        if(res.payload.statusCode==200){
                            window.localStorage.setItem(
                                "username",
                                res.payload.datas[0].username
                              );
                              stat[1]({ ...stat[0], login: false, token: true });
                        }
                    })
                }
            }else{
                localStorage.setItem("username",formData.username)
                alert(res.payload.message)
                stat[1]({...stat[0],token:true,login:false})
            }
          });
            

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