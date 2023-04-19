import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import initializeApp from '../../config';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
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
  rider_enCaminoAll?: number;
  pedidos_enCamino?: number;
} 

interface rider {
  active:number;
  company:string
  firstName:string
  id:number
  lastName:string
  login:number
}
interface DashboardPacks {
  id: number;
  client: string;
  type: string;
  created: string;
  inWarehouse: string;
  timeCall: string;
  timeInDispatch: string;
  timeDelivered: string;
  timeReceived: string;
  statusPack: string;
  callP: number;
  rider: number;
  warehouse: number;
  spot: string;
  idLastMov: number;
  timeLastMov: string;
  idPClient: string;
  destinatario: string;
  email: string;
  telephone: number;
  cp: number;
  street: string;
  number: number;
  "floor-dpto": string;
  localidad: string;
  provincia: string;
  obs: string
}


const date = (date: any) =>{
  if( new Date(date).toLocaleString() == "Invalid Date") return "-" 

  let fecha =  new Date(date)
  let opcionesFormato:Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
  let diferenciaHoraria = fecha.getTimezoneOffset() / 60;
  fecha.setHours(fecha.getHours() + diferenciaHoraria);

  return fecha.toLocaleString(Intl.DateTimeFormat().resolvedOptions().locale, opcionesFormato).replace(/[/]/g, '-');
}

function Dashboard() {
  const currentDate = new Date().toLocaleDateString();
  const [data, setData] = useState<DashboardData>()
  const [riders, setRiders] = useState<rider[]>()
  const [showModal, setShowModal] = useState(false)
  const [reset,setReset]=useState(false)
  const [Loading,setLoading]=useState(true)
  const [idPack, setIds] = useState<number|null>(null)
  const [page, setPage] = useState<number>(1)
  const [packs, setPacks] = useState<DashboardPacks[]>()
  const db = getFirestore();
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function getPacks() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`https://prueba-logistica-jmpdy.ondigitalocean.app/admin/allPacks?page=${page}&limit=7`, config);
        setPacks(response.data.data)
        setLoading(false)
      } catch (error) {
        console.log('Error creating pack:', error);
      }
    }
    getPacks()
  }, [reset,page])

  useEffect(() => {
    async function getRider() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`https://prueba-logistica-jmpdy.ondigitalocean.app/admin/activeRiders`, config);
        setRiders(response.data)
      } catch (error) {
        console.log('Error creating pack:', error);
      }
    }
    getRider()
  }, [reset])



  useEffect(() => {
    onSnapshot(doc(db, "admin", "1"), (doc) => {
      setData(doc.data())
      setReset(!reset)
    })
  }, [])


 

  const handleAsignar = async (idRider:number) => {
    setLoading(true)

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.put(`https://prueba-logistica-jmpdy.ondigitalocean.app/admin/asignRider`, {idRider,idPack},config);
        setReset(!reset)
        setLoading(false)
      } catch (error) {
        console.log('Error creating pack:', error);
      }
  }

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
            <p className="dashboard-card-count">{data?.rider_enCaminoAll}</p>
          </div>
        </div>
      </div>
     
      {Loading&&
      <span id="loading">
          cargando...
      </span>}
      
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ID Paquete</th>
            <th>Cliente</th>
            <th>Tamaño</th>
            <th>Fecha/Hora Ingreso</th>
            <th>Fecha/Hora pedido</th>
            <th>F.Hora mesa Sal.</th>
            <th>pedido</th>
            <th>Ubicación</th>
            <th>Rider</th>
            <th>Fecha/Hora Inicio Entrega</th>
            <th>Fecha/Hora Entrega</th>
          </tr>
        </thead>
        <tbody>
          {packs?.map(pack => {
            return (
              <tr key={pack.id}>
                <td>{pack.id}</td>
                <td>{pack.client}</td>
                <td>{pack.type}</td>
                <td>{date(pack.created)}</td>
                <td>{date(pack.timeCall)}</td>
                <td>{date(pack.timeInDispatch)}</td>
                <td>{pack.callP ? "Si" : "No"}</td>
                <td>{pack.spot}</td>
                <td>{pack.rider ? `Rider ${pack.rider}` :
                  <button 
                  disabled={pack.callP?false:true}
                  onClick={() =>{
                  setShowModal(!showModal)
                  setIds(pack.id)}
                  }>
                    asignar
                  </button>
                }</td>
                <td>{date(pack.timeDelivered)}</td>
                <td>{date(pack.timeReceived)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='page'>
        <button onClick={()=> page&&setPage(page-1)}>
        {`<`}

        </button>
        <button onClick={()=> setPage(page+1)}>
        {`>`}
        </button>
      </div>
      {showModal &&
        <div className="modal-content">
          <div className="modal-header">
            <button onClick={() => setShowModal(!showModal)}>X</button>
            <ul>
              {riders?.map(item=>{
                return(
                  <li key={item.id} onClick={() => handleAsignar(item.id)}>
                    <img src={`https://picsum.photos/200/300?random=${item.id}`}/>
                    <div id="modal_text">
                      <p>{item.firstName} {item.lastName}</p>
                      <span>activos:{item.active?"si":"no"}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      }
    </div>
  );
};

export default Dashboard;
