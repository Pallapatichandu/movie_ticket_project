// import React from 'react'
// import { assets } from '../../assets/assets'
// import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react'
// import { NavLink } from 'react-router-dom'

// const AdminSidebar = () => {
//     const user={
//         firstName:"Admin",
//         lastName:"User",
//         imageUrl:assets.profile,
//     }
//     const adminNavlinks=[
//         {
//             name:"Dashbord",path:'/admin',icon:LayoutDashboardIcon
//         },
//         {
//             name:"Add Shows",path:'/admin/add-shows',icon:PlusSquareIcon
//         },
//         {
//             name:"List Shows",path:"admin/list-shows,",icon:ListIcon
//         },
//         {
//           name:"List Bookings",path:"admin/list-booking,",icon:ListCollapseIcon
//         }
//     ]
//   return (
//     <div className='h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm '>
//      <img src={user.imageUrl} alt="sidebar" className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto' />
//      <p className='mt-2 text-base max-md:hidden'>{user.firstName} {user.lastName}</p>
//      <div className='w-full'>
//         {adminNavlinks.map((link,index)=>(
//             <NavLink  key={index} to={link.path} className={({isActive})=>`relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 text-gray-400 ${isActive && 'bg-primary/15 text-primary group'}`}>
//                 {({isActive})=>(
//                     <>
//                     <link.icon  className='w-5 h-5'/>
//                     <p className='max-md:hidden'>{link.name}</p>
//                     <span className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive && 'bg-primary'}`}></span>
//                     </>
//                 )}
//             </NavLink>
//         ))}

//      </div>
//     </div>
//   )
// }

// export default AdminSidebar

import React from 'react';
import { assets } from '../../assets/assets';
import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  const user = {
    firstName: "Admin",
    lastName: "User",
    imageUrl: assets.profile,
  };

  const adminNavlinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboardIcon },
    { name: "Add Shows", path: "/admin/add-shows", icon: PlusSquareIcon },
    { name: "List Shows", path: "/admin/list-shows", icon: ListIcon },
    { name: "List Bookings", path: "/admin/list-booking", icon: ListCollapseIcon },
  ];

  return (
    <div
      className="d-flex flex-column align-items-center pt-4 border-end"
      style={{ height: 'calc(100vh - 64px)', minWidth: '220px', backgroundColor: '#0d1b2a' }}
    >
      {/* Profile */}
      <img
        src={user.imageUrl}
        alt="profile"
        className="rounded-circle mb-2"
        style={{ width: '56px', height: '56px' }}
      />
      <p className="mb-4 d-none d-md-block text-white text-center">
        {user.firstName} {user.lastName}
      </p>

      {/* Nav Links */}
      <div className="nav flex-column w-100">
        {adminNavlinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end
            className={({ isActive }) =>
              `d-flex align-items-center gap-2 px-3 py-2 position-relative text-white text-decoration-none sidebar-item ${
                isActive ? 'active-item' : ''
              }`
            }
          >
            <link.icon className="me-2" size={20} />
            <span className="d-none d-md-inline">{link.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Hover and Active CSS */}
      <style>{`
        /* Hover effect for all items */
        .sidebar-item:hover {
          background-color: #0d6efd;;
          color: #ffffff;
          transition: all 0.3s ease;
          cursor: pointer;
        }

       

        /* Icon color change on active */
        .active-item svg {
          color: #ffffff;
        }
      `}</style>
    </div>
  );
};

export default AdminSidebar;







