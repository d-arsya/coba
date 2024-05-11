import { useState,useEffect } from 'react'
import Ternak from '../components/Ternak'
import Bahan from "../components/Bahan"
import baseUrl from '../assets/baseUrl.js'
function Main(){
    const [ternak,setTernak] = useState({
        id: "",
      nama: "",
      BK: 0,
      PK: 0,
      LK: 0,
      Abu: 0,
      Ca: 0,
      P: 0,
      NDF: 0,
      TDN: 0,
      })
      const [dataTernak,setDataTernak] = useState(false)
      const [dataBahan,setDataBahan] = useState(false)
      useEffect(()=>{  
        localStorage.clear()
        fetch(`${baseUrl}ternak`)
        .then(res=>res.json())
          .then(res=>{
            setDataTernak(res.payload.datas)
            localStorage.setItem("dataTernak",JSON.stringify(res.payload.datas))
        })
        fetch(`${baseUrl}bahan`)
        .then(res=>res.json())
          .then(res=>{
            setDataBahan(res.payload.datas)
            localStorage.setItem("dataBahan",JSON.stringify(res.payload.datas))
        })

        
      },[])
    
      if(dataBahan&&dataTernak){
        return (
          <div className="main-cont container">
            
          <Ternak ternak={ternak} setTernak={setTernak} dataTernak={dataTernak}></Ternak>
          <Bahan ternak={ternak} dataBahan={dataBahan}></Bahan>
        </div>
        )
      }else{
        return(
          <div className='container d-flex flex-column flex-wrap justify-content-center align-items-center' style={{height:"100vh"}}>
            <div className='progress'></div>
            <h1>Kalkulator Pakan</h1>
          </div>
        )
      }
}
export default Main