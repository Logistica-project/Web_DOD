import axios from 'axios';
import React, { useState } from 'react';
import "./clientForm.css"
import QRCode from 'qrcode.react';
import jwtDecode from 'jwt-decode';

const Formulario: React.FC = () => {
  const [client, setClient] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [destinatario, setDestinatario] = useState<string>('');
  const [number, setNumber] = useState<number>(0);
  const [street, setStreet] = useState<string>('');
  const [floorDpto, setFloorDpto] = useState<string>('');
  const [cp, setCp] = useState<number>(0);
  const [telephone, setTelephone] = useState<number>(0);
  const [localidad, setLocalidad] = useState<string>('');
  const [provincia, setProvincia] = useState<string>('');
  const [observation, setObservation] = useState<string>('');
const [idQr,setIdQr]=useState("")
const token = localStorage.getItem('token');
const decodeToken= token&&jwtDecode(token)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      client,
      email,
      destinatario,
      number,
      street,
      floorDpto,
      cp,
      telephone,
      localidad,
      provincia,
      observation,
    };

    try {
      // Obtener token del local storage
      
      // Configurar headers con el token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Realizar petición con axios y la configuración de headers
      const response = await axios.post('https://prueba-logistica-jmpdy.ondigitalocean.app/auth/CreatePack', data, config);
      console.log('Pack created!', response.data);
      setIdQr("https://prueba-logistica-jmpdy.ondigitalocean.app/"+response.data.qrUrl)
    } catch (error) {
      console.log('Error creating pack:', error);
    }
  };

  return (
    <>
    {idQr?
    <div className="qr">      
      <QRCode value={idQr} size={300}  />
    </div>
    :
    
    <form onSubmit={handleSubmit}>
      <h1>Bienvenido:</h1>
      <label className="Formitem">
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label className="Formitem">
        Destinatario:
        <input type="text" value={destinatario} onChange={e => setDestinatario(e.target.value)} />
      </label>
      <label className="Formitem">
        Número:
        <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))} />
      </label>
      <label className="Formitem">
        Calle:
        <input type="text" value={street} onChange={e => setStreet(e.target.value)} />
      </label>
      <label className="Formitem">
        Piso/Dpto:
        <input type="text" value={floorDpto} onChange={e => setFloorDpto(e.target.value)} />
      </label>
      <label className="Formitem">
        Código Postal:
        <input type="number" value={cp} onChange={e => setCp(parseInt(e.target.value))} />
      </label>
      <label className="Formitem">
        Teléfono:
        <input type="tel" value={telephone} onChange={e => setTelephone(parseInt(e.target.value))} />
      </label>
      <label className="Formitem">
        Observaciones:
        <textarea value={observation} onChange={e => setObservation(e.target.value)} />
      </label>
      <button type="submit">Enviar</button>
    </form>
    }
    </>
  );
};

export default Formulario;
