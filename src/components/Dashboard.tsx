import { useContext } from 'react';
import { ChatContext } from '../App';
import Header from './Header';
import LeftMenu from './LeftMenu';
import Footer from './Footer';

export default function Dashboard() {
  const { perguntas, respostas } = useContext(ChatContext);
  return (
    <div className="d-flex flex-column vh-100">
      <Header />     
      <div className="d-flex flex-grow-1 overflow-hidden">
        <LeftMenu />       
        <main className="p-4 w-100">
          <h3 className="mb-4">Dashboard</h3>
          <div className="d-flex gap-3">
            <div className="p-4 bg-light border w-100">
              <p>Total Perguntas</p>
              <h2>{perguntas.length}</h2>
            </div>
            <div className="p-4 bg-light border w-100">
              <p>Total Respostas IA</p>
              <h2>{respostas.length}</h2>
            </div>
          </div>
        </main>       
      </div>     
      <Footer />
    </div>
  );
}