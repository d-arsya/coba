import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Token from "./pages/Token";
import { useState } from "react";

function App() {
  const [status,setStatus] = useState({
    signup:true,
    login:false,
    token:false,
    home:false
  })
  return (
    <>
    {status.signup && <Signup stat={[status,setStatus]}/>}
    {status.login && <Login stat={[status,setStatus]}/>}
    {status.token && <Token stat={[status,setStatus]}/>}
    {status.home && <Home/>}
    </>
  );
}

export default App;
