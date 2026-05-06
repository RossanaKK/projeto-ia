import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { ChatContext, ThemeContext } from '../App';
import { GoogleGenerativeAI } from "@google/generative-ai"; 
import Header from './Header';
import LeftMenu from './LeftMenu';
import Footer from './Footer';

// Configuração da API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export default function ChatScreen() {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { perguntas, setPerguntas, respostas, setRespostas } = useContext(ChatContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setIsChecking(false);
      else navigate('/unauthorized');
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userQuery = input;
    setInput('');
    setLoading(true);

    // 1. Guardamos a pergunta e o "A pensar..." ao mesmo tempo
    const novasPerguntas = [...perguntas, userQuery];
    const novasRespostas = [...respostas, "A pensar..."];
    
    setPerguntas(novasPerguntas);
    setRespostas(novasRespostas);

    try {
      const result = await model.generateContent(userQuery);
      const text = result.response.text();

      // 2. Substituímos o "A pensar..." pela resposta final
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
      setLoading(false);
    }
  };

  if (isChecking) return null;

  return (
    <div className="d-flex flex-column vh-100">
      <Header userEmail={auth.currentUser?.email || null} />
      
      <div className="d-flex flex-grow-1 overflow-hidden">
        <LeftMenu />

        <main className="d-flex flex-column flex-grow-1 p-3">
          <h3 className="mb-3">Chat IA</h3>

          <div className="flex-grow-1 overflow-auto border rounded p-3 mb-3 shadow-sm bg-transparent">
            
            {/* 1. MENSAGEM DEFAULT CHUMBADA NO TOPO (Já não desaparece!) */}
            <div className="d-flex justify-content-start mb-4">
              <div className="p-3 rounded-3 shadow-sm border" 
                   style={{ maxWidth: '75%', whiteSpace: 'pre-wrap', textAlign: 'left' }}>
                <small className="d-block fw-bold mb-1 text-secondary">IA</small>
                Olá! Como posso ajudar hoje?
              </div>
            </div>

            {/* 2. LISTA DAS MENSAGENS QUE VAIS ENVIANDO */}
            {perguntas.map((pergunta, index) => (
              <div key={`chat-group-${index}`} className="d-flex flex-column">
                
                {/* Balão do Utilizador (Adicionei uma borda para não ficar a flutuar) */}
                <div className="d-flex justify-content-end mb-3">
                  <div className="p-3 rounded-3 shadow-sm border border-secondary" 
                       style={{ 
                         maxWidth: '75%', 
                         whiteSpace: 'pre-wrap', 
                         textAlign: 'right',
                         backgroundColor: 'rgba(255, 255, 255, 0.05)' // Fundo ligeiro para o modo escuro
                       }}>
                    {pergunta}
                  </div>
                </div>

                {/* Balão da IA */}
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