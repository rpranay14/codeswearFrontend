import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className='bg-teal-400 h-screen w-36'>
        <div className='text-white font-bold text-center text-lg'>CODESWEAR</div>
        <div className='flex flex-col space-y-2 text-center mt-5 text-white cursor-pointer'>
        <Link to="/admin/dashboard"><div>Dashboard</div></Link>
        <Link to="/admin/order"><div>Orders</div></Link>
        <Link to="/admin/products"><div>Products</div></Link>
        <Link to="/admin/addproduct"><div>Add new Product</div></Link>
        
        <div>Customers</div>
        </div>

    </div>
  )
}

export default AdminSidebar