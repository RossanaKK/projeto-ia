import { useState, useContext } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatContext } from '../App';
import Header from './Header';
import LeftMenu from './LeftMenu';
import Footer from './Footer';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyBMij211BtEa7WQFy-gFELmZDrWxq7hL2I");

export default function ChatScreen() {
  const [prompt, setPrompt] = useState("");
  const { perguntas, setPerguntas, respostas, setRespostas } = useContext(ChatContext);
  const send = async (e: any) => {
    e.preventDefault();
    if (!prompt) return;
    const texto = prompt;
    setPerguntas((p: any) => [...p, texto]);
    setPrompt("");
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const res = await model.generateContent(texto);
      setRespostas((r: any) => [...r, res.response.text()]);
    } catch {
      setRespostas((r: any) => [...r, "Ocorreu um erro na API."]);
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
              <div key={i}>
                <p className="text-end text-primary"><b>Tu:</b> {p}</p>
                {respostas[i + 1] && <p><b>IA:</b> {respostas[i + 1]}</p>}
              </div>
            ))}
          </div>
          <form onSubmit={send} className="d-flex gap-2">
            <input 
              className="form-control" 
              value={prompt} 
              onChange={e => setPrompt(e.target.value)} 
              placeholder="Escreve aqui..." 
            />
            <button className="btn btn-primary">Enviar</button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
}