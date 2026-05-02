import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Header from './Header';
import LeftMenu from './LeftMenu';
import Footer from './Footer';

interface DashboardProps {
  userEmail: string | null;
}

const dadosInventados = [
  { dia: 'Seg', pedidos: 120 },
  { dia: 'Ter', pedidos: 200 },
  { dia: 'Qua', pedidos: 150 },
  { dia: 'Qui', pedidos: 280 },
  { dia: 'Sex', pedidos: 350 },
];

function Dashboard({ userEmail }: DashboardProps) {
  return (
    <div className="d-flex flex-column flex-grow-1">     
      <Header userEmail={userEmail} />
      <div className="container-fluid my-4 flex-grow-1 d-flex">
        <div className="row w-100 m-0">        
          <LeftMenu />
          <div className="col-9 d-flex flex-column">         
            <div className="d-flex justify-content-between align-items-center mb-4 px-2">
              <h2>Dashboard de Desempenho</h2>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="card text-white bg-primary mb-3 shadow-sm h-100">
                  <div className="card-body">
                    <h6 className="card-title">Total de Interações IA</h6>
                    <p className="card-text fs-1 fw-bold">1,204</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-white bg-success mb-3 shadow-sm h-100">
                  <div className="card-body">
                    <h6 className="card-title">Tempo Médio de Resposta</h6>
                    <p className="card-text fs-1 fw-bold">1.2s</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-white bg-dark mb-3 shadow-sm h-100">
                  <div className="card-body">
                    <h6 className="card-title">Tokens Consumidos</h6>
                    <p className="card-text fs-1 fw-bold">45,890</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card shadow-sm flex-grow-1 mb-3">
              <div className="card-header bg-white fw-bold">
                Atividade Semanal
              </div>
              <div className="card-body" style={{ height: '350px', backgroundColor: '#f8f9fa' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dadosInventados}>
                    <XAxis dataKey="dia" stroke="#6c757d" />
                    <YAxis stroke="#6c757d" />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                    <Line type="monotone" dataKey="pedidos" stroke="#0d6efd" strokeWidth={4} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;