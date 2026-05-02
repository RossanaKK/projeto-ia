import { useState, useContext, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatContext } from '../App';
import Header from './Header';
import LeftMenu from './LeftMenu';
import Footer from './Footer';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "CHAVE_FALTOU");

export default function ChatScreen() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false); 
  const { perguntas, setPerguntas, respostas, setRespostas } = useContext(ChatContext);
  const fimRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [respostas]);
  const send = async (e: any) => {
    e.preventDefault();
    if (!prompt) return;
    const texto = prompt;
    setPerguntas((prev: any) => [...prev, texto]);
    setPrompt("");
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const res = await model.generateContent(texto);
      setRespostas((prev: any) => [...prev, res.response.text()]);
    } catch (error: any) {
      // AQUI ESTÁ O TRUQUE: O erro exato da Google vai aparecer no teu ecrã!
      console.error("Erro detalhado da API:", error);
      setRespostas((prev: any) => [...prev, `Erro na API: ${error.message || "Verifica a consola."}`]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <div className="container-fluid flex-grow-1 overflow-hidden d-flex p-0">
        <div className="row g-0 w-100">
          <div className="col-12 col-md-3 col-lg-2 border-end bg-dark text-light p-3 d-flex flex-column h-100">
            <LeftMenu />
          </div>
          <main className="col-12 col-md-9 col-lg-10 p-4 d-flex flex-column h-100">
            <h3 className="mb-3">Chat IA</h3>
            <div className="flex-grow-1 border p-4 mb-3 rounded shadow-sm overflow-auto" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
              <div className="mb-4">
                <span className="badge bg-secondary mb-1">IA</span>
                <p>{respostas[0]}</p>
              </div>
              {perguntas.map((p: string, i: number) => (
                <div key={i} className="mb-4">
                  <div className="text-end mb-2">
                    <span className="badge bg-primary mb-1">Tu</span>
                    <p className="text-primary fw-medium">{p}</p>
                  </div>              
                  {respostas[i + 1] && (
                    <div>
                      <span className="badge bg-secondary mb-1">IA</span>
                      <p>{respostas[i + 1]}</p>
                    </div>
                  )}
                </div>
              ))}
              {loading && <p className="text-muted fst-italic">A pensar...</p>}
              <div ref={fimRef} />
            </div>
            <form onSubmit={send} className="d-flex gap-2 mt-auto">
              <input
                className="form-control form-control-lg shadow-sm"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Escreve a tua pergunta aqui..."
                disabled={loading}
              />
              <button className="btn btn-primary btn-lg shadow-sm px-4" disabled={loading}>
                Enviar
              </button>
            </form>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}