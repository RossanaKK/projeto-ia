import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { ChatContext } from '../App'; // Importamos o contexto

export default function Header() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const { setPerguntas, setRespostas } = useContext(ChatContext);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setPerguntas([]); 
      setRespostas(["Olá! Como posso ajudar hoje?"]);     
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
          <span className="me-3 text-secondary">{user.email}</span>
          <button onClick={handleLogout} className="btn btn-danger btn-sm">Sair</button>
        </div>
      )}
    </header>
  );
}