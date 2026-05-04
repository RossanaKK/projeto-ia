import { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/theme.css'; 
import Login from './components/Login';
import ChatScreen from './components/ChatScreen';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Unauthorized from './components/Unauthorized';

export enum Theme {
  Light = 'light-mode',
  Dark = 'dark-mode',
  Blue = 'blue-mode'
}

export const ThemeContext = createContext<any>(null);
export const ChatContext = createContext<any>(null);

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [theme, setTheme] = useState<Theme>(Theme.Light);
  const [perguntas, setPerguntas] = useState<string[]>([]);
  const [respostas, setRespostas] = useState<string[]>(["Olá! Como posso ajudar hoje?"]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (isAuthChecking) return null; 

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ChatContext.Provider value={{ perguntas, setPerguntas, respostas, setRespostas }}>
        <div className={`${theme} min-vh-100 d-flex flex-column`}>      
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home userEmail={user?.email || null} />} />           
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/chat" element={!user ? <Unauthorized /> : <ChatScreen />} />
              <Route path="/dashboard" element={!user ? <Unauthorized /> : <Dashboard />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ChatContext.Provider>
    </ThemeContext.Provider>
  );
}