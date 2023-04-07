import { useState } from "react";
import axios from "axios";

interface PackageData {
  packageId: number;
  destinatario: string;
  street: string;
  cp: number;
  telephone: number;
}


const PackagePedir = () => {
  const [packageId, setPackageId] = useState("");
  const [packageData, setPackageData] = useState<PackageData|null>(null);

  const handlePackageIdChange = (event:any) => {
    setPackageId(event.target.value);
  };

  const handleVerifyClick = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/${packageId}`);
      console.log(response);
      
      setPackageData(response.data[0]);
    } catch (error) {
      console.error(error);
      setPackageData(null);
    }
  };

  const handleOrderClick = () => {

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

      {packageData && (
        <div>
          <h2>Datos de envio</h2>
          <p>Destinatario: {packageData.destinatario}</p>
          <p>Domicilio: {packageData.street}</p>
          <p>Cod. Postal: {packageData.cp}</p>
          <p>Teléfono: {packageData.telephone}</p>
          <button onClick={handleOrderClick}>Pedir</button>
        </div>
      )}
    </div>
  );
};

export default PackagePedir;
