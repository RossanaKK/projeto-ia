import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Unauthorized() {
  return (
    <div className="d-flex flex-column flex-grow-1" style={{ minHeight: "100vh" }}>
      <Header userEmail={null} />
      <div className="container my-auto text-center flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-1 text-danger fw-bold mb-3">🚫 403</h1>
        <h2 className="mb-4">Acesso Negado</h2>
        <p className="lead text-muted mb-5">
          Ups! Esta área é exclusiva e tens de ter a sessão iniciada para a poder ver.
        </p>
        <Link to="/login" className="btn btn-primary btn-lg shadow-sm">
          Ir para a página de Login
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Unauthorized;