import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function Header({ userEmail }: { userEmail: string | null }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <header className="navbar border-bottom shadow-sm p-3">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Plataforma IA</span>
        
        <div className="d-flex align-items-center gap-3">
          {userEmail && (
            <>
              <span className="small text-muted">{userEmail}</span>
              <button 
                onClick={handleLogout} 
                className="btn btn-danger btn-sm"
              >
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}