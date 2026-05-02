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
    <header className="d-flex justify-content-between p-3 bg-light border-bottom">
      <h3 className="m-0 text-dark">HOME / DASH</h3>
      {user && (
        <div>
          <span className="me-3">{user.email}</span>
          <button onClick={handleLogout} className="btn btn-danger btn-sm">Sair</button>
        </div>
      )}
    </header>
  );
}

export default Header;