

import React from 'react';
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { useEffect } from 'react';
import Loading from '../../components/Loding';

const Layout = () => {
  const{isAdmin,fetchIsAdmin}=useAppContext()
  useEffect(()=>{
    fetchIsAdmin()
  })
  return isAdmin? (
    <div style={{ backgroundColor: '#0d1b2a', color: '#ffffff', minHeight: '100vh' }}>
      <AdminNavbar />
      <div className="d-flex">
        <AdminSidebar />
        <div
          className="flex-grow-1 p-3 p-md-5"
          style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}
        >
          {/* This will load Dashboard (or other admin pages) */}
          <Outlet />
        </div>
      </div>
    </div>
  ):<Loading/>
};

export default Layout;





