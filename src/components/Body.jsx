import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Body = () => {
  return (
    <>
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
    </>
   )

}

export default Body