// import React, { useEffect, useState } from 'react';
// import { TextField, Button } from '@mui/material';

// const FormEditaRoteador = ({ editarRoteador, routerID }) => {
//   const [routerName, setRouterName] = useState('');
//   const [macAddress, setMacAddress] = useState('');

//   const handleCreate = (e) => {
//     console.log('Router name:', routerName);
//     console.log('MAC Address:', macAddress);

//     e.preventDefault();

//     editarRoteador({ routerName, macAddress, routerID });
//     setRouterName('');
//     setMacAddress('');

//     console.log("Editado com sucesso!");
//   };

//   const handleNomeChange = (event) => {
//     setRouterName(event.target.value);
//   };

//   const handleMacAddressChange = (event) => {
//     setMacAddress(event.target.value);
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minHeight: '15vh' }}>
//       <TextField sx={{ width: 300 }}
//         label="Edite o nome do rastreador"
//         value={routerName}
//         onChange={handleNomeChange}
//         fullWidth
//         margin="normal"
//       />

//       <TextField sx={{ width: 300, paddingBottom: 1 }}
//         label="Edite o endereço MAC do rastreador"
//         value={macAddress}
//         onChange={handleMacAddressChange}
//         fullWidth
//         margin="normal"
//         dividers
//       />
//       <Button variant="contained" color="primary" onClick={handleCreate} sx={{ width: 100 }}>
//         Editar
//       </Button>

//     </div>
//   );
// };

// export default FormEditaRoteador;
