import React from 'react'
import EditCard from './EditCard'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user=useSelector((store)=>store.user);
  return (
     user && <div>
      <EditCard user={user}></EditCard>
    </div>
  )
}

export default Profile