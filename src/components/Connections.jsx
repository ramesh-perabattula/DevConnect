import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    const connections=useSelector((store)=>store.connections);
    const dispatch=useDispatch();
    const renderConnection=(connection)=>{
        const {firstName,lastName,age,gender,photoUrl,skills,about}=connection;
        return(
            <div>
              <div className='flex border my-5'>
                <div className=''><img src={photoUrl} alt="photo" /></div>
                <div className='mx-5'>
                    <h1>{firstName}+" "+{lastName}</h1>
                    <h2>{about}</h2>
                    <h2>{skills}</h2>
                </div>
              </div>
            </div>
        )
    }
    const getConnections=async()=>{
        try{
            const res= await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
            console.log(res)
            dispatch(addConnections(res.data.data));
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getConnections();
    },[])

    if(!connections) return;
    if(connections.length===0) return <h1>No Connections Found</h1>
  return (
    <div className='text-center'>
        <h1>Connections</h1>
        {connections.map((renderConnection))}
    </div>
  )
}

export default Connections