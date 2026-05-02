import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Header from './Header';
import LeftMenu from './LeftMenu';
import Footer from './Footer';

// Dados pequeninos e simples só para testar
const dados = [
  { dia: 'Seg', visitas: 12 },
  { dia: 'Ter', visitas: 25 },
  { dia: 'Qua', visitas: 18 },
  { dia: 'Qui', visitas: 30 },
];

export default function Dashboard() {
  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <div className="d-flex flex-grow-1 overflow-hidden">
        <LeftMenu />
        <main className="p-4 w-100">
          <h3 className="mb-4">Estatísticas</h3>
          <div style={{ height: 300, width: '100%' }}>
            <ResponsiveContainer>
              <LineChart data={dados}>
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visitas" stroke="#0d6efd" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}