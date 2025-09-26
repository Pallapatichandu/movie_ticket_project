import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const AdminNavbar = () => {
  return (
    <nav
      className="d-flex justify-content-between align-items-center px-4 py-2"
      style={{ backgroundColor: "#0d1b2a", color: "#ffffff", borderBottom: '1px solid #444' }}
    >
      <Link to="/">
        <img src={assets.logo} alt="logo" className="img-fluid" style={{ width: '150px' }} />
      </Link>

      <div className="d-flex align-items-center">
        {/* Add right-side items here if needed */}
        <span className="text-white">Admin</span>
      </div>
    </nav>
  );
};

export default AdminNavbar;
