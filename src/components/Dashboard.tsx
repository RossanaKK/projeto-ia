import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { ChatContext } from '../App';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Header from './Header';
import LeftMenu from './LeftMenu';
import Footer from './Footer';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const { perguntas, respostas } = useContext(ChatContext);

  const questionCounter = useRef(perguntas?.length || 0);
  const answerCounter = useRef(respostas?.length || 0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setIsChecking(false) : navigate('/unauthorized');
    });
    return () => unsubscribe();
  }, [navigate]);

  if (isChecking) {
    return <div className="vh-100 d-flex justify-content-center align-items-center"><div className="spinner-border text-primary" /></div>;
  }

  const dados = [{ dia: 'Sessão Atual', perguntas: questionCounter.current, respostas: answerCounter.current }];

  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <div className="d-flex flex-grow-1 overflow-hidden">
        <LeftMenu />
        
        <main className="p-4 w-100 overflow-auto">
          <h3 className="mb-4">Estatísticas</h3>

          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="card shadow-sm border-0 border-start border-primary border-4">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Perguntas Efetuadas</h6>
                  <p className="display-6 fw-bold text-primary mb-0">{questionCounter.current}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm border-0 border-start border-success border-4">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Respostas Recebidas</h6>
                  <p className="display-6 fw-bold text-success mb-0">{answerCounter.current}</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: 300, width: '100%' }}>
            <ResponsiveContainer>
              <LineChart data={dados}>
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="perguntas" stroke="#0d6efd" strokeWidth={3} name="Perguntas" />
                <Line type="monotone" dataKey="respostas" stroke="#198754" strokeWidth={3} name="Respostas" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}