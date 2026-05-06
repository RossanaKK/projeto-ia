import { useContext } from 'react';
import { ChatContext } from '../App';
import Header from './Header';
import LeftMenu from './LeftMenu';
import Footer from './Footer';
import { auth } from '../config/firebase';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

export default function Dashboard() {
  const { totalPedidos, tempoTotal } = useContext(ChatContext);
  const tempoMedio = totalPedidos > 0 
    ? Number((tempoTotal / totalPedidos / 1000).toFixed(2)) 
    : 0;
  const data = [
    {
      name: 'Métricas da API',
      Pedidos: totalPedidos,
      'Tempo Médio (s)': tempoMedio,
    }
  ];
  return (
    <div className="d-flex flex-column vh-100">
      <Header userEmail={auth.currentUser?.email || null} />      
      <div className="d-flex flex-grow-1 overflow-hidden">
        <LeftMenu />
        <main className="d-flex flex-column flex-grow-1 p-4 overflow-auto">
          <h2 className="mb-4">Dashboard de Utilização da API</h2>
          <div className="row mb-5">
            <div className="col-md-6 mb-3">
              <div className="card shadow-sm border-primary h-100">
                <div className="card-body text-center d-flex flex-column justify-content-center">
                  <h5 className="card-title text-secondary">Total de Pedidos</h5>
                  <p className="display-4 fw-bold text-primary mb-0">{totalPedidos}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card shadow-sm border-success h-100">
                <div className="card-body text-center d-flex flex-column justify-content-center">
                  <h5 className="card-title text-secondary">Tempo de Resposta Médio</h5>
                  <p className="display-4 fw-bold text-success mb-0">{tempoMedio} s</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-secondary mb-4">Gráfico de Desempenho</h5>     
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} 
                      contentStyle={{ borderRadius: '8px', backgroundColor: '#333', color: '#fff', border: 'none' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="Pedidos" fill="#0d6efd" radius={[5, 5, 0, 0]} barSize={80} />
                    <Bar dataKey="Tempo Médio (s)" fill="#198754" radius={[5, 5, 0, 0]} barSize={80} />
                  </BarChart>
                </ResponsiveContainer>
              </div>          
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}