import React from 'react'
import AdminSidebar from './AdminSidebar';
import {Outlet} from 'react-router-dom';


const AdminComponent = () => {
  return (
    <div className='flex space-x-5'>
      <AdminSidebar />
      <Outlet/>
      
     
      </div>
  )
}

export default AdminComponent;