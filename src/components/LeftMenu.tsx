import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ChatContext, ThemeContext, Theme } from '../App';

export default function LeftMenu() {
  const { perguntas } = useContext(ChatContext);
  const { setTheme } = useContext(ThemeContext);

  return (
    <aside className="p-3 border-end d-flex flex-column" style={{ width: '250px' }}>
      
      <h5>Menu</h5>
      <Link to="/chat" className="mb-2 text-decoration-none">💬 Chat</Link>
      <Link to="/dashboard" className="mb-4 text-decoration-none">📊 Dashboard</Link>

      <h5>Histórico</h5>
      <div className="overflow-auto mb-3">
        {perguntas.map((p: string, i: number) => (
          <p key={i} className="small text-truncate mb-1">{p}</p>
        ))}
      </div>

      <div className="mt-auto border-top pt-3">
        <button onClick={() => setTheme(Theme.Light)} className="btn btn-sm btn-light me-1">Claro</button>
        <button onClick={() => setTheme(Theme.Dark)} className="btn btn-sm btn-dark">Escuro</button>>
        <button onClick={() => setTheme(Theme.Blue)} className="btn btn-sm btn-outline-primary">Azul</button>
      </div>
    </aside>
  );
}

export default LeftMenu;