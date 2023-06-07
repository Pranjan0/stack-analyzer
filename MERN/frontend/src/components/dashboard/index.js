import React from 'react'
import Footer from "./Footer";
import { Outlet } from 'react-router-dom'
import Header from './Header';

const Dashboard = () => {
  return (
    <div>
      <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Dashboard