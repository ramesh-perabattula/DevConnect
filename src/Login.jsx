import React, { useState } from 'react'
import axios from 'axios'
const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleLogin = async()=>{
        try{
            const result = await axios.post("http://localhost:7777/auth/login",{
                email,password
            },{withCredentials:true});
         }catch(err){
            console.log(err);
        }
    };


  return (    
    <div className="flex justify-center my-25">
        <div className="card card-dash bg-base-100 w-96 border bg-blue-100 ">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
    <div>
        <fieldset className="fieldset">
  <legend className="fieldset-legend">Enter your Email</legend>
  <input type="text" value={email} className="input" placeholder="Type here" onChange={(e)=>setEmail(e.target.value)} />
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Enter your Password</legend>
  <input type="text" value={password} className="input" placeholder="Type here" onChange={(e)=>setPassword(e.target.value)} />
 </fieldset>
    </div>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login