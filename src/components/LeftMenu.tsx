import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChatContext, ThemeContext, Theme } from '../App';

export default function LeftMenu() {
  const { perguntas } = useContext(ChatContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const location = useLocation();
  return (
    <aside className="d-flex flex-column p-3 border-end" style={{ width: '250px' }}>
      <div className="mb-4">
        <h6 className="fw-bold mb-3">Menu</h6>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link 
              to="/chat" 
              className={`nav-link px-0 ${location.pathname === '/chat' ? 'fw-bold text-primary' : 'text-body'}`}
            >
              💬 Chat
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/dashboard" 
              className={`nav-link px-0 ${location.pathname === '/dashboard' ? 'fw-bold text-primary' : 'text-body'}`}
            >
              📊 Dashboard
            </Link>
          </li>
        </ul>
      </div>
      <div className="mb-4 flex-grow-1 overflow-auto">
        <h6 className="fw-bold mb-3">Histórico</h6>
        <ul className="list-unstyled small">
          {perguntas.length === 0 ? (
            <li className="text-muted fst-italic">Sem histórico</li>
          ) : (
            perguntas.map((pergunta: string, index: number) => (
              <li key={`hist-${index}`} className="mb-2 text-truncate" title={pergunta}>
                {pergunta}
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="mt-auto pt-3 border-top">
        <div className="d-flex gap-2 justify-content-start">
          <button 
            className={`btn btn-sm ${theme === Theme.Light ? 'btn-light border' : 'btn-outline-secondary'}`} 
            onClick={() => setTheme(Theme.Light)}
          >
            Claro
          </button>
          <button 
            className={`btn btn-sm ${theme === Theme.Dark ? 'btn-dark border' : 'btn-outline-secondary'}`} 
            onClick={() => setTheme(Theme.Dark)}
          >
            Escuro
          </button>
          <button 
            className={`btn btn-sm ${theme === Theme.Blue ? 'btn-primary border' : 'btn-outline-secondary'}`} 
            onClick={() => setTheme(Theme.Blue)}
          >
            Azul
          </button>
        </div>
      </div>
    </aside>
  );
}