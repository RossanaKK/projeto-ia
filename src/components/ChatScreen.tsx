import { useState, useContext } from 'react';
import { ChatContext } from '../App';
import { GoogleGenerativeAI } from "@google/generative-ai"; 
import Header from './Header';
import LeftMenu from './LeftMenu';
import Footer from './Footer';
import { auth } from '../config/firebase';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export default function ChatScreen() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { perguntas = [], setPerguntas, respostas = [], setRespostas, setTotalPedidos, setTempoTotal } = useContext(ChatContext) || {};
  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || !setPerguntas || !setRespostas) return;
    const userQuery = input;
    setInput('');
    setLoading(true);
    setPerguntas([...perguntas, userQuery]);
    setRespostas([...respostas, "A pensar..."]);
    const tempoInicio = Date.now(); 
    try {
      const result = await model.generateContent(userQuery);
      const text = result.response.text();
      setRespostas((prev: string[]) => {
        const listaAtualizada = [...prev];
        listaAtualizada[listaAtualizada.length - 1] = text;
        return listaAtualizada;
      });      
    } catch (error: any) {
      console.error("Erro na API:", error);
      let erroMsg = "Erro: Não foi possível obter resposta da IA.";
      if (error.toString().toLowerCase().includes("high demand") || error.toString().toLowerCase().includes("503") || error.toString().toLowerCase().includes("429")) {
        erroMsg = "A IA está com muita procura. Aguarda uns segundos e tenta de novo.";
      }
      setRespostas((prev: string[]) => {
        const listaAtualizada = [...prev];
        listaAtualizada[listaAtualizada.length - 1] = erroMsg;
        return listaAtualizada;
      });
    } finally {
      const tempoDecorrido = Date.now() - tempoInicio;
      if (setTotalPedidos) setTotalPedidos((prev: number) => prev + 1);
      if (setTempoTotal) setTempoTotal((prev: number) => prev + tempoDecorrido);
      setLoading(false);
    }
  };
  return (
    <div className="d-flex flex-column vh-100">
      <Header userEmail={auth.currentUser?.email || null} />      
      <div className="d-flex flex-grow-1 overflow-hidden">
        <LeftMenu />       
        <main className="d-flex flex-column flex-grow-1 p-3">
          <h3 className="mb-3">Chat IA</h3>
          <div className="flex-grow-1 overflow-auto border rounded p-3 mb-3 shadow-sm bg-transparent">            
            {perguntas.length === 0 && (
              <div className="d-flex justify-content-start mb-4">
                <div className="p-3 rounded-3 shadow-sm border" style={{ maxWidth: '75%', whiteSpace: 'pre-wrap', textAlign: 'left' }}>
                  <small className="d-block fw-bold mb-1 text-secondary">IA</small>
                  Olá! Como posso ajudar hoje?
                </div>
              </div>
            )}
            {perguntas.map((pergunta: string, index: number) => (
              <div key={`chat-group-${index}`} className="d-flex flex-column">               
                <div className="d-flex justify-content-end mb-3">
                  <div className="p-3 rounded-3 shadow-sm border border-secondary" 
                       style={{ maxWidth: '75%', whiteSpace: 'pre-wrap', textAlign: 'right', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                    {pergunta}
                  </div>
                </div>
                {respostas[index] && (
                  <div className="d-flex justify-content-start mb-4">
                    <div className={`p-3 rounded-3 shadow-sm border ${respostas[index] === "A pensar..." ? "text-muted fst-italic" : ""}`} 
                         style={{ maxWidth: '75%', whiteSpace: 'pre-wrap', textAlign: 'left' }}>
                      <small className="d-block fw-bold mb-1 text-secondary">IA</small>
                      {respostas[index]}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={handleEnviar} className="d-flex gap-2">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Pergunta algo à IA..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
              {loading ? "A processar..." : "Enviar"}
            </button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
}