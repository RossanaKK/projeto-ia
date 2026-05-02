import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

interface HeaderProps {
  userEmail: string | null;
}

export default function Header({ userEmail }: HeaderProps) {
  return (
    <nav className="navbar px-4 shadow-sm" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
      <div className="navbar-brand mb-0 h1 d-flex align-items-center" style={{ letterSpacing: '2px' }}>
        <span className="fw-bolder text-primary">HOME</span>
        <span className="text-secondary mx-2 fw-light">/</span>
        <span className="fw-bold">DASH</span>
      </div>
      <div className="d-flex align-items-center">
        {userEmail && <span className="me-3 fw-semibold">{userEmail}</span>}
        {userEmail && (
          <button onClick={() => signOut(auth)} className="btn btn-danger btn-sm">
            Sair
          </button>
        )}
      </div>
    </nav>
  );
}