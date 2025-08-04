import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addUser } from '../utils/userSlice';

const NavBar = () => {
  const user=useSelector((store)=>store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogout=async()=>{
    try{
        await axios.post(BASE_URL+"/auth/logout",{},{withCredentials:true});
        dispatch(addUser(null));
        navigate("/login")
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/feed" className="btn btn-ghost text-xl">👨‍💻 DevMeet</Link>
  </div>
  { user && (<div className="flex gap-2">
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-5">
          {/* {user && <p className='mx-15'>welcome {user.firstName}</p>} */}
        <div className="w-10 rounded-full ">
          <img
            alt="profile pic"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow mx-10">
        <li>
          <Link  to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>)}
</div>
  )
}

export default NavBar