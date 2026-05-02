import { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from "./config/firebase"; 
import Login from './components/Login'; 
import ChatScreen from './components/ChatScreen';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Unauthorized from './components/Unauthorized'; // IMPORTA A NOVA PÁGINA AQUI
import './styles/theme.css'; 

export enum Theme {
  Light = 'light-mode',
  Dark = 'dark-mode',
  Blue = 'blue-mode'
}
export const ThemeContext = createContext<any>(null);
export const ChatContext = createContext<any>(null);

function App() {
  const [user, setUser] = useState<any>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [theme, setTheme] = useState<Theme>(Theme.Light);
  
  const [perguntas, setPerguntas] = useState<string[]>([]);
  const [respostas, setRespostas] = useState<string[]>([
    "Bem-vindo(a)! Como posso ajudar-te hoje?"
  ]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthChecking(false); 
    });
    return () => unsubscribe();
  }, []);
  if (isAuthChecking) {
    return <div className="container mt-5 text-center">A verificar sessão...</div>;
  }
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ChatContext.Provider value={{ perguntas, setPerguntas, respostas, setRespostas }}>
        <div className={`${theme} d-flex flex-column`} style={{ minHeight: '100vh' }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home userEmail={user?.email} />} />
              <Route path="/login" element={user ? <Navigate to="/chat" /> : <Login />} />
              <Route path="/chat" element={!user ? <Unauthorized /> : <ChatScreen userEmail={user?.email} />} />
              <Route path="/dashboard" element={!user ? <Unauthorized /> : <Dashboard userEmail={user?.email} />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ChatContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;