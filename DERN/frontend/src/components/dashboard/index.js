import React from 'react'
import Footer from "./Footer";
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
        <Outlet />
        <Footer />
    </div>
  )
}

export default Dashboard