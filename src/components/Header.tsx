import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Header() {
  const navigate = useNavigate(); // O nosso GPS
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login', { replace: true });
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
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