import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface HomeProps {
  userEmail: string | null;
}

export default function Home({ userEmail }: HomeProps) {
  return (
    <div className="d-flex flex-column vh-100">
      <Header userEmail={userEmail} />
      <main className="text-center d-flex flex-column justify-content-center flex-grow-1">
        <h1 className="mb-4">A Tua Plataforma IA</h1>
        
        {userEmail ? (
          <div>
            <p className="mb-4">Sessão iniciada como: <b>{userEmail}</b></p>
            <Link to="/chat" className="btn btn-primary me-2">Chat</Link>
            <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>
          </div>
        ) : (
          <div>
            <p className="mb-4">Inicia sessão para interagir com a IA.</p>
            <Link to="/login" className="btn btn-primary">Fazer Login</Link>
          </div>
        )}
      </main>    
      <Footer />
    </div>
  );
}