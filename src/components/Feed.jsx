import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from "axios";
import { addFeed } from '../utils/feedSlice';
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard';

const Feed = () => {

  const feed=useSelector((store)=>store.feed);
  const dispatch=useDispatch();
  console.log(feed);
  const getFeed=async()=>{
     try{
      const res= await axios.get(BASE_URL+"/user/feed",{withCredentials:true});
      dispatch(addFeed(res.data));
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    if(!feed){
      getFeed();
    }
  },[]);  
  return (
    feed && 
    <div className='flex justify-center my-12'>
      <UserCard user={feed.users[0]}></UserCard>
    </div>
  )
}

export default Feed