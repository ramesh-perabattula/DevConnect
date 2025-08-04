import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
const Login = () => {
    const [email,setEmail]=useState("ram@gmail.com");
    const [password,setPassword]=useState("ram@123");
    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[isLoginForm,setIsLoginForm]=useState(true);
    const [error,setError]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogin = async()=>{
        try{
            const result = await axios.post(BASE_URL+"/auth/login",{
                email,password
            },{withCredentials:true});
            console.log(result.data);
            dispatch(addUser(result.data))
            return navigate('/feed');
         }catch(err){
            setError(err?.response?.data?.message||"something went wrong")
            console.log(err);
        }
    };

     const handleSignin = async()=>{
        try{
            const result = await axios.post(BASE_URL+"/auth/signin",{
                firstName,lastName,email,password
            },{withCredentials:true});
            dispatch(addUser(result.data.data))
            return navigate('/profile');
         }catch(err){
            setError(err?.response?.data?.message||"something went wrong")
            console.log(err);
        }
    };

  return (    
    <div className="flex justify-center my-25">
        <div className="card card-dash bg-base-100 w-96 border bg-blue-100 ">
  <div className="card-body">
    <h2 className="card-title justify-center">{isLoginForm ? "Login":"signup"}</h2>
    <div>
    {!isLoginForm && <><fieldset className="fieldset">
<legend className="fieldset-legend">First Name:</legend>
<input type="text" value={firstName} className="input" placeholder="Type here" onChange={(e)=>setFirstName(e.target.value)} />
</fieldset>
<fieldset className="fieldset">
<legend className="fieldset-legend">Last Name:</legend>
<input type="text" value={lastName} className="input" placeholder="Type here" onChange={(e)=>setLastName(e.target.value)} />
</fieldset></>}
        <fieldset className="fieldset">
  <legend className="fieldset-legend">Enter your Email</legend>
  <input type="text" value={email} className="input" placeholder="Type here" onChange={(e)=>setEmail(e.target.value)} />
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Enter your Password</legend>
  <input type="text" value={password} className="input" placeholder="Type here" onChange={(e)=>setPassword(e.target.value)} />
 </fieldset>
    </div>
    <p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={isLoginForm?handleLogin:handleSignin}>{isLoginForm?"Login":"signup"}</button>
    </div>
        <p className='text-red-500' onClick={()=>setIsLoginForm((value)=>!value)}>{isLoginForm?"new user click here":"existing user click here"}</p>
  </div>
</div>
    </div>
  )
}

export default Login