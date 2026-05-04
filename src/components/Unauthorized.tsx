import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Unauthorized() {
  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <main className="text-center d-flex flex-column justify-content-center flex-grow-1">
        <h1 className="text-danger mb-2">🚫 404</h1>
        <h2 className="mb-3">Acesso Negado</h2>
        <p className="mb-4">Tens de ter a sessão iniciada para ver esta página.</p>
        <div>
          <Link to="/login" className="btn btn-primary">Ir para Login</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}