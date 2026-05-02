import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext, Theme, ChatContext } from '../App';

function LeftMenu() {
  const themeContext = useContext(ThemeContext);
  const { perguntas } = useContext(ChatContext);
  return (
    <div className="col-3 d-flex flex-column border-end py-3 h-100">    
      <div>
        <h6 className="text-muted fw-bold mb-3 px-2">NAVEGAÇÃO</h6>
        <div className="list-group list-group-flush mb-4">
          <Link to="/" className="list-group-item list-group-item-action bg-transparent border-0">
            🏠 Página Inicial
          </Link>
          <Link to="/chat" className="list-group-item list-group-item-action bg-transparent border-0">
            💬 Chat com IA
          </Link>
          <Link to="/dashboard" className="list-group-item list-group-item-action bg-transparent border-0">
            📊 Dashboard Analytics
          </Link>
        </div>
        <h6 className="text-muted fw-bold mb-3 px-2">HISTÓRICO (LOG)</h6>
        <div className="list-group list-group-flush small overflow-auto" style={{ maxHeight: '40vh' }}>
          {perguntas.length === 0 ? (
            <p className="text-muted fst-italic px-3">Sem histórico ainda.</p>
          ) : (
            perguntas.map((texto: string, index: number) => (
              <button key={index} className="list-group-item list-group-item-action bg-transparent text-truncate border-0">
                {texto}
              </button>
            ))
          )} 
        </div>
      </div>
      <div className="mt-auto px-2">
        <hr className="text-muted" />
        <p className="text-muted small mb-2 text-center">Tema da Interface</p>
        <div className="d-flex justify-content-center gap-2">
          <button onClick={() => themeContext.setTheme(Theme.Light)} className="btn btn-sm btn-outline-secondary" title="Claro">☀️</button>
          <button onClick={() => themeContext.setTheme(Theme.Dark)} className="btn btn-sm btn-outline-secondary" title="Escuro">🌙</button>
          <button onClick={() => themeContext.setTheme(Theme.Blue)} className="btn btn-sm btn-outline-primary" title="Azul">🌊</button>
        </div>
      </div>
    </div>
  );
}

export default LeftMenu;