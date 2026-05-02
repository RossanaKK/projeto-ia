import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface HomeProps {
  userEmail: string | null;
}

function Home({ userEmail }: HomeProps) {
  return (
    <div className="d-flex flex-column flex-grow-1" style={{ minHeight: "100vh" }}>
      <Header userEmail={userEmail} />
      <div className="container my-auto text-center flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-4 fw-bold mb-3">A Tua Plataforma IA</h1>
        {userEmail ? (
          <div>
            <p className="mb-4">Sessão iniciada como: <strong>{userEmail}</strong></p>
            <div className="d-flex gap-3 justify-content-center">
              <Link to="/chat" className="btn btn-primary btn-lg shadow-sm">Abrir o Chat IA</Link>
              <Link to="/dashboard" className="btn btn-outline-secondary btn-lg shadow-sm">Ver Dashboard</Link>
            </div>
          </div>
        ) : (
          <div>
            <p className="mb-4">Para começares a interagir com a Inteligência Artificial, inicia sessão.</p>
            <Link to="/login" className="btn btn-primary btn-lg shadow-sm">Fazer Login</Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;