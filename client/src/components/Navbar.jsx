import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Menu, Search, TicketPlus, X } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const { favoriteMovies = [] } = useAppContext(); // safe default

  return (
    <div
      className="position-fixed top-0 start-0 w-100 d-flex align-items-center justify-content-between px-4 py-3 bg-black shadow-sm"
      style={{ zIndex: 1050 }}
    >
      {/* Logo */}
      <Link to="/" className="d-flex align-items-center">
        <img src={assets.logo} alt="Logo" style={{ width: '140px', height: 'auto' }} />
      </Link>

      {/* Nav Links (Desktop Only) */}
      <div className="d-none d-md-flex align-items-center gap-4">
        <Link to="/" className="text-white text-decoration-none fw-medium">Home</Link>
        <Link to="/movies" className="text-white text-decoration-none fw-medium">Movies</Link>
        <Link to="/" className="text-white text-decoration-none fw-medium">Theaters</Link>
        <Link to="/" className="text-white text-decoration-none fw-medium">Releases</Link>
        {favoriteMovies.length > 0 && (
          <Link to="/favorite" className="text-white text-decoration-none fw-medium">Favorites</Link>
        )}
      </div>

      {/* Right Side */}
      <div className="d-flex align-items-center gap-3">
        {/* Search Icon */}
        <div className="d-none d-md-block">
          <Search size={22} className="text-white" />
        </div>

        {/* Login Button or User Menu */}
        {!user ? (
          <button onClick={openSignIn} className="btn btn-danger rounded-pill px-4">
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<TicketPlus size={15} />}
                onClick={() => navigate('/my-bookings')}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}

        {/* Mobile Menu Icon */}
        <div className="d-md-none" onClick={() => setOpen(true)}>
          <Menu size={28} className="text-white" />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className="position-fixed top-0 start-0 h-100 bg-dark text-white d-md-none"
        style={{
          width: isOpen ? '250px' : '0',
          overflow: 'hidden',
          transition: 'width 0.3s ease-in-out',
          zIndex: 1100
        }}
      >
        {/* Close Icon */}
        <div className="d-flex justify-content-end p-3">
          <X size={28} className="text-white" role="button" onClick={() => setOpen(false)} />
        </div>

        {/* Sidebar Links */}
        <div className="d-flex flex-column gap-4 px-4">
          <Link to="/" className="text-white text-decoration-none fw-medium" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/movies" className="text-white text-decoration-none fw-medium" onClick={() => setOpen(false)}>Movies</Link>
          <Link to="/" className="text-white text-decoration-none fw-medium" onClick={() => setOpen(false)}>Theaters</Link>
          <Link to="/" className="text-white text-decoration-none fw-medium" onClick={() => setOpen(false)}>Releases</Link>
          {favoriteMovies.length > 0 && (
            <Link to="/favorite" className="text-white text-decoration-none fw-medium" onClick={() => setOpen(false)}>Favorites</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;







