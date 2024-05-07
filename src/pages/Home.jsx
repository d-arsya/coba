import Main from "./Main";
import Ternak from "./Ternak";
import Bahan from "./Bahan";
import { useState } from "react";

function Home() {
  const [halaman, setHalaman] = useState("Main");
  function onLink(e) {
    switch (e.target.innerHTML) {
      case "Home":
        setHalaman("Main");
        break;
      case "Bahan":
        setHalaman("Bahan");
        break;
      case "Ternak":
        setHalaman("Ternak");
        break;
    }
  }
  function onLogout(){
    localStorage.clear()
    location.reload()
  }
  return (
    <div className="container">
        <ul className="nav justify-content-center">
  <li className="nav-item">
    <a className="nav-link" aria-current="page" onClick={(e)=>onLink(e)}>Home</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" onClick={(e)=>onLink(e)}>Bahan</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" onClick={(e)=>onLink(e)}>Ternak</a>
  </li>
</ul>
<button onClick={onLogout} className="btn btn-danger my-3 ">Logout</button>
      {halaman == "Main" && <Main></Main>}
      {halaman == "Bahan" && <Bahan></Bahan>}
      {halaman == "Ternak" && <Ternak></Ternak>}
    </div>
  );
}

export default Home;
