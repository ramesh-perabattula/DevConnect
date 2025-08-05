import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(result.data));
    } catch (err) {
      if (err.response && err.response.status === 401) {
        dispatch(addUser(null));
         if (!["/login", "/signup"].includes(location.pathname)) {
          navigate("/login");
        }
      } else {
        console.error("Fetch user error:", err);
      }
    }
  };

 useEffect(() => {
    if (!userData && !["/login", "/signup"].includes(location.pathname)) {
      fetchUser();
    }
}, [location.pathname]);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
