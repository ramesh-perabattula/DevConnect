import React from 'react'
import { removeUserFromFeed } from '../utils/feedSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
const UserCard = ({user}) => {
    const{_id,firstName ,lastName,age,gender,about,photoUrl,skills}=user;
    const dispatch=useDispatch();
     const handleSendRequest=async(status,userId)=>{
    try{
      await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});
      dispatch(removeUserFromFeed(userId));
    }catch(err){
      console.log(err);
    }
  }


  return (
    <div>
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {gender && age && <p>gender:{gender} age:{age}</p>}
    {about && <p>{about}</p>}
    {skills && <p>{skills}</p>}
    <div className="card-actions justify-center">
        <button className="btn btn-secondary" onClick={()=>handleSendRequest("ignored",_id)}>ignore</button>
      <button className="btn btn-primary" onClick={()=>handleSendRequest("interested",_id)}>intrested</button>
    </div>
  </div>
</div>
</div>
  )
}

export default UserCard