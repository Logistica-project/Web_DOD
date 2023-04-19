import { useState } from "react";
import axios from "axios";

interface PackageData {
  packageId: number;
  destinatario: string;
  street: string;
  cp: number;
  telephone: number;
  callP:number;
  statusPack:number;

  err:boolean;
}


const PackagePedir = () => {
  const [packageId, setPackageId] = useState("");
  const [Loading, setLoading] = useState(false);
  const [packageData, setPackageData] = useState<PackageData|null>(null);

  const handlePackageIdChange = (event:any) => {
    setPackageId(event.target.value);
  };

  const handleVerifyClick = async () => {
    try {
      const response = await axios.get(`https://prueba-logistica-jmpdy.ondigitalocean.app/${packageId}`);
 
 const data=response.data.length?response.data[0]:{err:true}
      setPackageData(data);
    } catch (error) {
      console.error(error);
      setPackageData(null);
    }
  };

  const handleOrderClick = async () => {
      setLoading(true)
    try {
      const response = await axios.put(`https://prueba-logistica-jmpdy.ondigitalocean.app/orderPack/${packageId}`);

      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
    
      <label htmlFor="packageId">Número del paquete:</label>
      <input
        type="text"
        id="packageId"
        value={packageId}
        onChange={handlePackageIdChange}
      />
      <button onClick={handleVerifyClick}>Verificar</button>


      {(packageData?.callP ===0 && !packageData.err) &&(
        <div>
          <h2>Datos de envió</h2>
          <p>Destinatario: {packageData.destinatario}</p>
          <p>Domicilio: {packageData.street}</p>
          <p>Cod. Postal: {packageData.cp}</p>
          <p>Teléfono: {packageData.telephone}</p>
          <button disabled={packageData.statusPack<7} onClick={handleOrderClick}>Pedir</button>
        </div>
      )}

      
{Loading&&
 <span id="loading">
          cargando...
  </span>}
     {packageData?.callP ===  1
     && <div>
        <h2>EL paquete ya fue pedido</h2>
      </div>
      }

    {packageData?.err
     && <div>
        <h2>Este paquete no existe</h2>
      </div>
      }

    </div>
  );
};

export default PackagePedir;
