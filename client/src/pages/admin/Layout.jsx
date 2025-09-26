// import React from 'react'
// import AdminNavbar from '../../components/admin/AdminNavbar'
// import AdminSidebar from '../../components/admin/AdminSidebar'
// import { Outlet } from 'react-router-dom'

// const Layout = () => {
//   return (
//     <>
//         <AdminNavbar/>
//         <div className='flex'>
//             <AdminSidebar/>
//             <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto'>
//                 <Outlet/>
//             </div>
//         </div>
//     </>
//   )
// }

// export default Layout

// import React from 'react';
// import AdminNavbar from '../../components/admin/AdminNavbar';
// import AdminSidebar from '../../components/admin/AdminSidebar';
// import { Outlet } from 'react-router-dom';
// import Dashboard from './Dashbord';

// const Layout = () => {
//   return (
//     <div style={{ backgroundColor: '#0d1b2a', color: '#ffffff', minHeight: '100vh' }}>
//       <AdminNavbar />
//       <div className="d-flex">
//         <AdminSidebar />
//         <div
//           className="flex-grow-1 p-3 p-md-5"
//           style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}
//         >
//           <Outlet />
//         </div>
//       </div>
      
//     </div>
//   );
// };

// export default Layout;

import React from 'react';
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
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
  );
};

export default Layout;



