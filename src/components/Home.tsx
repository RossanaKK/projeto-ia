import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import Header from './Header';
import Footer from './Footer';

interface HomeProps {
  userEmail: string | null;
}

export default function Home({ userEmail }: HomeProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError("Este email já está registado. Tenta fazer login.");
      } else {
        setError("Erro: " + err.message);
      }
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Header userEmail={userEmail} />
      <main className="text-center d-flex flex-column justify-content-center flex-grow-1 p-4">
        <h1 className="mb-4 fw-bold">A Tua Plataforma IA</h1>  
        {userEmail ? (

          <div className="py-4">
            <p className="lead mb-4">Sessão ativa: <span className="badge bg-primary">{userEmail}</span></p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/chat" className="btn btn-primary btn-lg shadow-sm px-5">Chat</Link>
              <Link to="/dashboard" className="btn btn-outline-secondary btn-lg shadow-sm px-5">Dashboard</Link>
            </div>
          </div>
        ) : (

          <div className="mx-auto" style={{ maxWidth: '400px', width: '100%' }}>
            <div className="card shadow border-0 p-4">
              <h3 className="h5 mb-3 text-start">Criar Nova Conta</h3>
              
              <form onSubmit={handleRegister}>
                <div className="mb-2">
                  <input 
                    type="email" 
                    className="form-control form-control-lg" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input 
                    type="password" 
                    className="form-control form-control-lg" 
                    placeholder="Palavra-passe (mín. 6 caracteres)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                {error && <div className="alert alert-danger p-2 small mb-3">{error}</div>}
                
                <button type="submit" className="btn btn-success btn-lg w-100 mb-3 shadow-sm">
                  Registar Agora
                </button>
              </form>

              <div className="pt-3 border-top mt-2">
                <p className="text-muted mb-2">Já tens uma conta?</p>
                <Link to="/login" className="btn btn-outline-primary w-100">
                  Iniciar Sessão (Login)
                </Link>
              </div>
            </div>
            
            <p className="mt-4 text-muted small">
              Ao registar-te, aceitas os nossos termos de utilização.
            </p>
          </div>
        )}
      </main>    
      
      <Footer />
    </div>
  );
}