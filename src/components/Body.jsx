import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData=useSelector((store)=>store.user);
  const fetchUser=async()=>{
    //if(!userData) return ;
    try{
    const result=await axios.get(BASE_URL+"/profile/view",{withCredentials:true})
    dispatch(addUser(result.data));
    }catch(err){
      if(err.status===401){
        dispatch(addUser(null));
        navigate("/login");
      }
      }
  }

  useEffect(()=>{
    if(!userData){
      fetchUser();
    }
   },[]);

  return (
    <>
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
    </>
   )

}

export default Body