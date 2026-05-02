import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };
  return (
    <nav className="navbar px-4 border-bottom" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
      <div className="navbar-brand mb-0 h1 d-flex align-items-center" style={{ letterSpacing: '2px' }}>
        <span className="fw-bolder text-primary">HOME</span>
        <span className="text-secondary mx-2 fw-light">/</span>
        <span className="fw-bold">DASH</span>
      </div>
      <div className="d-flex align-items-center">
        {user && <span className="me-3 fw-semibold">{user.email}</span>}
        {user && (
          <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
            Sair
          </button>
        )}
      </div>
    </nav>
  );
}

export default Header;