

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







