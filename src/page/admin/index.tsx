import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import initializeApp from '../../config';
initializeApp()
interface DashboardData {
  rider_activos?: number;
  rider_login?: number;
  packs_ready?: number;
  packs_creados?: number;
  rider_disponibles?: number;
  pedidos_enPrepara?: number;
  pedidos_EsperaRider?: number;
  pedidos_totals?: number;
  rider_enCamino?: number;
  pedidos_enCamino?: number;
}

function Dashboard() {
  const currentDate = new Date().toLocaleDateString();
  const [data, setData] = useState<DashboardData>()
  const db = getFirestore();
  useEffect(() => {
    onSnapshot(doc(db, "admin", "1"), (doc) => {
      setData(doc.data())
    })
  }, [])
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Deposito 1</h1>
        <div>
          <input type="checkbox" id="status" name="status" defaultChecked />
          <label htmlFor="status">Abierto</label>
        </div>
        <p className="dashboard-date">{currentDate}</p>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div>
            <h3 className="dashboard-card-title">Paquetes creados:</h3>
            <p className="dashboard-card-count">{data?.packs_creados}</p>

          </div>
          <div>
            <h3 className="dashboard-card-title">Paquetes listos:</h3>
            <p className="dashboard-card-count">{data?.packs_ready}</p>

          </div>
        </div>
        <div className="dashboard-card">
          <div>
            <h3 className="dashboard-card-title">Pedidos en total</h3>
            <p className="dashboard-card-count">{data?.pedidos_totals}</p>

          </div>
          <div>
            <h3 className="dashboard-card-title">Pedidos en camino</h3>
            <p className="dashboard-card-count">{data?.pedidos_enCamino}</p>

          </div>
          <div>
            <h3 className="dashboard-card-title">Pedidos en preparar</h3>
            <p className="dashboard-card-count">{data?.pedidos_enPrepara}</p>

          </div>
          <div>
            <h3 className="dashboard-card-title">Pedidos en espera de rider</h3>
            <p className="dashboard-card-count">{data?.pedidos_EsperaRider}</p>

          </div>
        </div>
        <div className="dashboard-card">
          <div>
            <h3 className="dashboard-card-title">Riders login</h3>
            <p className="dashboard-card-count">{data?.rider_login}</p>
          </div>
          <div>

            <h3 className="dashboard-card-title">Riders activos</h3>
            <p className="dashboard-card-count">{data?.rider_activos}</p>
          </div>
          <div>
            <h3 className="dashboard-card-title">Riders disponible</h3>
            <p className="dashboard-card-count">{data?.rider_disponibles}</p>

          </div>
          <div>
            <h3 className="dashboard-card-title">Riders en camino</h3>
            <p className="dashboard-card-count">{data?.rider_enCamino}</p>
          </div>
        </div>
      </div>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ID Paquete</th>
            <th>Cliente</th>
            <th>Tamaño</th>
            <th>Fecha/Hora Ingreso</th>
            <th>Fecha/Hora Pedido</th>
            <th>Fecha/Hora Mesa</th>
            <th>Salida Pedido</th>
            <th>Ubicación</th>
            <th>Fecha/Hora Inicio Entrega</th>
            <th>Fecha/Hora Entrega</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>001</td>
            <td>Cliente 1</td>
            <td>Pequeño</td>
            <td>2023-04-06 09:00:00</td>
            <td>2023-04-06 09:15:00</td>
            <td>2023-04-06 09:30:00</td>
            <td>2023-04-06 09:45:00</td>
            <td>Ubicación 1</td>
            <td>2023-04-06 10:00:00</td>
            <td>2023-04-06 10:15:00</td>
          </tr>
          <tr>
            <td>002</td>
            <td>Cliente 2</td>
            <td>Mediano</td>
            <td>2023-04-06 09:30:00</td>
            <td>2023-04-06 09:45:00</td>
            <td>2023-04-06 10:00:00</td>
            <td>2023-04-06 10:15:00</td>
            <td>Ubicación 2</td>
            <td>2023-04-06 10:30:00</td>
            <td>2023-04-06 10:45:00</td>
          </tr>
          <tr>
            <td>003</td>
            <td>Cliente 3</td>
            <td>Pequeño</td>
            <td>2023-04-06 12:32:12</td>
            <td>2023-04-06 12:33:23</td>
            <td>2023-04-06 12:35:15</td>
            <td>2023-04-06 12:35:30</td>
            <td>-</td>
            <td>2023-04-06 12:40:30</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
