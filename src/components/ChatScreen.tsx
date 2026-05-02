import React, { useState, useContext } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Header from './Header';
import LeftMenu from './LeftMenu';
import Footer from './Footer';
import { ChatContext } from '../App';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyBMij211BtEa7WQFy-gFELmZDrWxq7hL2I");

interface ChatScreenProps {
  userEmail: string | null;
}

function ChatScreen({ userEmail }: ChatScreenProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { perguntas, setPerguntas, respostas, setRespostas } = useContext(ChatContext);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); 
    if (prompt === "") return; 
    const pergunta = prompt;
    setPrompt("");
    setPerguntas((prev: string[]) => [...prev, pergunta]);
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(pergunta);
      setRespostas((prev: string[]) => [...prev, result.response.text()]);
    } catch (error) {
      console.error(error);
      setRespostas((prev: string[]) => [...prev, "Erro na comunicação com a API."]);
    }
    setLoading(false);
  }
  return (
    <div className="d-flex flex-column flex-grow-1">
      <Header userEmail={userEmail} />
      <div className="container-fluid my-4 flex-grow-1 d-flex">
        <div className="row w-100 m-0">       
          <LeftMenu />
          <div className="col-9 d-flex flex-column">
            <div className="card flex-grow-1 shadow-sm">           
              <div className="card-body" style={{ overflowY: "auto", height: "60vh" }}>
                <div className="alert alert-secondary text-start me-5">
                  <strong>IA: </strong><br />
                  {respostas[0]}
                </div>
                {perguntas.map((pergunta: string, index: number) => (
                  <React.Fragment key={index}>
                    <div className="alert alert-primary text-end ms-5">
                      <strong>Tu: </strong><br />
                      {pergunta}
                    </div>
                    {respostas[index + 1] && (
                      <div className="alert alert-secondary text-start me-5">
                        <strong>IA: </strong><br />
                        {respostas[index + 1]}
                      </div>
                    )}
                  </React.Fragment>
                ))}
                {loading && <p className="text-muted fst-italic">A IA está a pensar...</p>}
              </div>
              <div className="card-footer bg-transparent">
                <form onSubmit={handleSubmit} className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="PROMPT..."
                    disabled={loading}
                  />
                  <button type="submit" className="btn btn-success" disabled={loading}>
                    SEND
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChatScreen;