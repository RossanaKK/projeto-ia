import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Header({ userEmail }: { userEmail?: string | null }) {
  const navigate = useNavigate();
  const emailExibicao = userEmail || auth.currentUser?.email;
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login', { replace: true });
    } catch (error) {
      console.error("Erro ao sair da sessão");
    }
  };
  return (
    <header className="d-flex justify-content-between p-3 bg-light border-bottom">
      <h3 className="m-0 text-dark">HOME / DASH</h3>    
      {emailExibicao && (
        <div>
          <span className="me-3">{emailExibicao}</span>
          <button onClick={handleLogout} className="btn btn-danger btn-sm">Sair</button>
        </div>
      )}
    </header>
  );
}