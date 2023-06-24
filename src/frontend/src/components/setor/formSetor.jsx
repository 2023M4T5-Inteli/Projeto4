import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Typography } from '@mui/material';
import MapaModal from '../modalMap';

const FormCriarSetor = ({ adicionarSetor, criarRoteador, fecharModal, coordenadas }) => {
  const [routerName, setRouterName] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    adicionarSetor({ routerName, mapX: coordenadas.x, mapY: coordenadas.y });
    setRouterName('');
    fecharModal()
  };

  const handleNomeChange = (event) => {
    setRouterName(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '15vh' }}>
      <Typography>Escolha no mapa o setor que deseja adicionar</Typography>
      <TextField sx={{ width: 300 }}
        label="Insira o nome do setor"
        value={routerName}
        onChange={handleNomeChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleCreate} sx={{ width: 100 }}>
        Próximo
      </Button>

    </div>
  );
};

export default FormCriarSetor;