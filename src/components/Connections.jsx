import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    const connections=useSelector((store)=>store.connections);
    const dispatch=useDispatch();
   const renderConnection = (connection) => {
  const { _id, firstName, lastName, age, gender, photoUrl, skills, about } = connection;

  return (
    <div
      key={_id}
      className="flex items-center bg-white shadow-md rounded-2xl p-4 mb-6 max-w-2xl mx-auto">
        <div className="w-24 h-24 flex-shrink-0">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover rounded-full border"
        />
      </div>
        <div className="ml-6 flex flex-col gap-2">
        <h2 className="text-xl font-semibold">
          {firstName} {lastName}
        </h2>
        <p className="text-gray-600 text-sm">{about}</p>
       { age && gender && <p className="text-sm text-gray-500">
          <span className="font-medium">Age:</span> {age} |{" "}
          <span className="font-medium">Gender:</span> {gender}
        </p>}
        <p className="text-sm text-gray-700">
          <span className="font-medium">Skills:</span>{" "}
          {Array.isArray(skills) ? skills.join(", ") : skills}
        </p>
      </div>
    </div>
  );
};

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