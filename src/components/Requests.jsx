import axios from 'axios';
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addRequests } from '../utils/requestSlice';
const Requests = () => {
  const requests=useSelector((store)=>store.requests);
  const dispatch=useDispatch();

  const requestReview=async (status,_id)=>{
    try{
      await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true});
    }catch(err){
      console.log(err);
    }
  }

 const renderRequests = (request) => {
  const { _id, firstName, lastName, age, gender, photoUrl, skills, about } = request.fromUserId;

  return (
    <div
      key={_id}
      className="flex flex-col items-center bg-white shadow-md rounded-2xl p-6 mb-6 max-w-2xl mx-auto"
    >
      <div className="flex items-center w-full">
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
          <p className="text-sm text-gray-500">
            <span className="font-medium">Age:</span> {age} | <span className="font-medium">Gender:</span> {gender}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Skills:</span>{" "}
            {Array.isArray(skills) ? skills.join(", ") : skills}
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-4">
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        onClick={()=>requestReview("accepted",request._id)}
        >
          Accept
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={()=>requestReview("rejected",_id)}

        >
          Reject
        </button>
      </div>
    </div>
  );
};




  const getRequests=async ()=>{
    try{
      const res=await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});
      console.log(res);
      dispatch(addRequests(res.data.data));
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getRequests();
  },[]);

  if(!requests) return ;

  if(requests.length===0) return <h1>NO Requests found</h1>

  return (
    <div className='justify-center'>
      <div>Requests</div>
      {requests.map((renderRequests))}
    </div>
  )
}

export default Requests