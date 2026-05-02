import { useState, useContext, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatContext } from '../App';
import Header from './Header';
import LeftMenu from './LeftMenu';
import Footer from './Footer';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyBMij211BtEa7WQFy-gFELmZDrWxq7hL2I");

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
    setLoading(true); // Bloqueia a input enquanto espera
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const res = await model.generateContent(texto);
      setRespostas((prev: any) => [...prev, res.response.text()]);
    } catch {
      setRespostas((prev: any) => [...prev, "Ocorreu um erro na API."]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <div className="d-flex flex-grow-1 overflow-hidden">
        <LeftMenu />
        <main className="p-4 w-100 d-flex flex-column">
          <h3 className="mb-3">Chat IA</h3>
          <div className="flex-grow-1 border p-3 mb-3 bg-light overflow-auto">
            <p><b>IA:</b> {respostas[0]}</p>
            {perguntas.map((p: string, i: number) => (
              <div key={i} className="mb-3">
                <p className="text-end text-primary"><b>Tu:</b> {p}</p>
                {respostas[i + 1] && <p><b>IA:</b> {respostas[i + 1]}</p>}
              </div>
            ))}
            {loading && <p className="text-muted fst-italic">A pensar...</p>}            
            <div ref={fimRef} />
          </div>
          <form onSubmit={send} className="d-flex gap-2">
            <input
              className="form-control"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Escreve aqui..."
              disabled={loading} // Bloqueia input se estiver a carregar
            />
            <button className="btn btn-primary" disabled={loading}>Enviar</button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
}