import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditCard = ({user}) => {
   const[firstName,setFirstName]=useState(user.firstName);
   const [lastName,setLastName]=useState(user.lastName);
   const [age,setAge]=useState(user.age);
   const [gender,setGender]=useState(user.gender);
   const[photoUrl,setPhotoUrl]=useState(user.photoUrl);
   const[skills,SetSkills]=useState(user.skills);
   const[about,setAbout]=useState(user.about);
   const [error,setError]=useState("");
   const [showToast,setShowToast]=useState(false);
   const dispatch=useDispatch();

   const saveProfile=async()=>{
    try{
        setError("");
        const res=await axios.patch(BASE_URL+"/profile/edit",
            {firstName,lastName,age,gender,photoUrl,about,skills},
            {withCredentials:true});
            dispatch(addUser(res.data.data));
            setShowToast(true);
            setTimeout(()=>{
                setShowToast(false);
            },3000);
    }catch(err){
        setError(err);
     }
   }
  return (    
     <>
      <div className='flex justify-center my-25 mx-10 gap-10'>
        <div className="flex justify-center">
        <div className="card card-dash bg-base-100 w-96 border bg-blue-100 ">
  <div className="card-body">
    <h2 className="card-title justify-center">Edit Profile</h2>
    <div>
<fieldset className="fieldset">
  <legend className="fieldset-legend">First Name:</legend>
  <input type="text" value={firstName}  className="input" placeholder="Type here" onChange={(e)=>setFirstName(e.target.value)} />
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Last Name:</legend>
  <input type="text" value={lastName}  className="input" placeholder="Type here" onChange={(e)=>setLastName(e.target.value)} />
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">PhotoUrl:</legend>
  <input type="text" value={photoUrl}  className="input" placeholder="Type here" onChange={(e)=>setPhotoUrl(e.target.value)} />
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Age:</legend>
  <input type="text" value={age}  className="input" placeholder="Type here" onChange={(e)=>setAge(e.target.value)} />
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Gender:</legend>
  <input type="text" value={gender}  className="input" placeholder="Type here" onChange={(e)=>setGender(e.target.value)} />
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">About:</legend>
  <input type="text" value={about}  className="input" placeholder="Type here" onChange={(e)=>setAbout(e.target.value)} />
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Skills:</legend>
  <input type="text" value={skills}  className="input" placeholder="Type here" onChange={(e)=>SetSkills(e.target.value)} />
</fieldset>
    </div>
     <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={saveProfile}>Save</button>
    </div>
  </div>
</div>
    </div>
    <UserCard user={{firstName,lastName,photoUrl,age,gender,about,skills}}></UserCard>
     </div>
   { showToast &&  <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile updated successfully.</span>
  </div>
</div>}
     </>
  )
}
export default EditCard