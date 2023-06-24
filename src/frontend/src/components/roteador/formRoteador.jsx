import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import SelectSector from '../selectSector'

const FormCriarRoteador = ({ adicionarRoteador, criarRoteador }) => {
  const [routerName, setRouterName] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [sector, updateSector] = useState('');
  const [valores, updateValores] = useState([]);
  const [ids, updateIds] = useState([]);
  const [sectorId, updateSectorId] = useState('');

  const handleCreate = (e) => {
    // Lógica para criar o roteador com os dados fornecidos
    console.log('Router name:', routerName);
    console.log('MAC Address:', macAddress);
    console.log('Sector: ', sector);
    console.log('SectorId: ', sectorId);

    e.preventDefault();
    adicionarRoteador({ routerName, macAddress, sector, sectorId });
    setRouterName('');
    setMacAddress('');
    updateSector('');
  };

  const handleNomeChange = (event) => {
    setRouterName(event.target.value);
  };

  const handleMacAddressChange = (event) => {
    setMacAddress(event.target.value);
  };

  React.useEffect(() => {
  
    fetch("https://sfqlqf-3000.csb.app/v1/sectors")
    .then((response) => response.json())
    .then(data => {
      data.map((item) => {
        if(item.name == sector) {
          const id = item._id
          updateSectorId(id)
        }
      });
      console.log(valores)

    })
    .catch ((error) => {
      console.log(error.message);
      console.log("oi rafa techio")
      return [];
    });
  }, [sector]);


  React.useEffect(() => {
  
    fetch("https://sfqlqf-3000.csb.app/v1/sectors")
    .then((response) => response.json())
    .then(data => {
      const valores2 = data.map((item) => item.name);
      const ids = data.map((item) => item.id);
      updateValores(valores2)
      updateSectorId(ids)
      console.log(valores)

    })
    .catch ((error) => {
      console.log(error.message);
      console.log("oi rafa techio")
      return [];
    });
  }, []);

  // const valores = []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minHeight: '15vh' }}>
      <TextField sx={{ width: 300 }}
        label="Insira o nome do roteador"
        value={routerName}
        onChange={handleNomeChange}
        fullWidth
        margin="normal"
      />

      <TextField sx={{ width: 300, paddingBottom: 1 }}
        label="Insira o endereço MAC do rastreador"
        value={macAddress}
        onChange={handleMacAddressChange}
        fullWidth
        margin="normal"
        dividers
      />
      <SelectSector updateSector={updateSector} updateSectorId={updateSectorId} valores={valores}/>
      <Button variant="contained" color="primary" onClick={handleCreate} sx={{ width: 100 }}>
        Criar
      </Button>

    </div>
  );
};

export default FormCriarRoteador;