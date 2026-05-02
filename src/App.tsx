import { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from "./config/firebase"; 
import Login from './components/Login'; 
import ChatScreen from './components/ChatScreen';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Unauthorized from './components/Unauthorized';
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
  const [respostas, setRespostas] = useState<string[]>(["Olá! Como posso ajudar hoje?"]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthChecking(false); 
    });
    return () => unsubscribe();
  }, []);
  if (isAuthChecking) return <p className="text-center mt-5">A verificar sessão...</p>;
  if (!user) return <Navigate to="/login" />;
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ChatContext.Provider value={{ perguntas, setPerguntas, respostas, setRespostas }}>    
        <div className={`${theme} d-flex flex-column`} style={{ minHeight: '100vh' }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={user ? <Navigate to="/chat" /> : <Login />} />
              <Route path="/chat" element={!user ? <Unauthorized /> : <ChatScreen />} />
              <Route path="/dashboard" element={!user ? <Unauthorized /> : <Dashboard />} />
            </Routes>
          </BrowserRouter>
        </div>

      </ChatContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;