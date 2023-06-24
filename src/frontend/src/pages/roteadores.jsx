import React, { useEffect, useState } from 'react';
import TableRoteador from '../components/roteador/tableRoteador';
import ModalCriarRoteador from '../components/roteador/modalCreate';
import SearchBar from '../components/roteador/searchbar';
import CustomModalEdit from '../components/roteador/modalEdit';
import removerAcentos from '../helpers/removerAcentos';


const Roteadores = () => {
  const [roteadores, setRoteadores] = useState([]);
  const [filter, updateFilter] = useState('');
  const [displayedRouters, setDisplayedRouters] = useState(null);

  useEffect(() => {
    if (filter !== '') {
      let filteredRouters = [];
      roteadores.map((row) => {
        if (row.name !== null) {
          if (removerAcentos(row.name.toLowerCase()).includes(filter) || row.name.includes(filter)) {
            filteredRouters.push(row)
          }
        }
        if (row.mac !== null && !(filteredRouters.includes(row))) {
          if (removerAcentos(row.mac.toLowerCase()).includes(filter) || row.mac.includes(filter)) {
            filteredRouters.push(row)
          }
        }
      })
      console.log(filteredRouters);
      setDisplayedRouters(filteredRouters);
    } else {
      setDisplayedRouters(roteadores);
    }
  }, [roteadores, filter])

  const adicionarRoteador = async (roteador) => {
    try {
      const response = await fetch("https://sfqlqf-3000.csb.app/v1/esp-routers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mac: roteador.macAddress,
          name: roteador.routerName,
          sector: roteador.sectorId
        })
      });
    } catch (error) {
      console.error("Erro ao enviar a requisição para o backend", error);
    }

    console.log("roteador.sector: ")
    console.log(roteador.sector)
    setRoteadores([...roteadores, roteador]);

    fetch("https://sfqlqf-3000.csb.app/v1/esp-routers")
      .then((response) => response.json())
      .then(data => {
        const roteadoresUpdate = data.map(roteador => ({ ...roteador, macAddress: roteador.mac, routerName: roteador.name, routerID: roteador._id }));
        setRoteadores(roteadoresUpdate);
      })
      .catch((err) => {
        console.log(err.message);
      });


  };

  useEffect(() => {
    fetch("https://sfqlqf-3000.csb.app/v1/esp-routers")
      .then((response) => response.json())
      .then(data => {
        const roteadoresFetched = data.map(roteador => ({ ...roteador, macAddress: roteador.mac, routerName: roteador.name, routerID: roteador._id }));
        setRoteadores(roteadoresFetched);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [])

  const editarRoteador = async ({ routerName, macAddress, routerID, sectorId }) => {
    console.log(routerID);
    console.log(`https://sfqlqf-3000.csb.app/v1/esp-routers/` + routerID);
    console.log(`newName: ${routerName}, newMac: ${macAddress}`)
    console.log(roteadores);

    try {
      const response = await fetch(`https://sfqlqf-3000.csb.app/v1/esp-routers/` + routerID, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: routerName,
          mac: macAddress,
          sector: sectorId
        })
      });

      if (response.ok) {
        // Atualizar a lista de roteadores com os dados atualizados
        const updatedRoteadores = roteadores.map(roteador => {
          if (roteador._id === routerID) {
            return {
              ...roteador,
              routerName: routerName,
              macAddress: macAddress,
              sector: sectorId
            };
          }
          return roteador;
        });
        setRoteadores(updatedRoteadores);
        console.log(updatedRoteadores);
        // setOpen(false);
      } else {
        console.error("Erro ao editar o roteador");
      }
    } catch (error) {
      console.error("Erro ao enviar a requisição para o backend", error);
    }

    fetch("https://sfqlqf-3000.csb.app/v1/esp-routers")
      .then((response) => response.json())
      .then(data => {
        const roteadoresNotEdited = data.map(roteador => ({ ...roteador, macAddress: roteador.mac, routerName: roteador.name, routerID: roteador._id }));
        setRoteadores(roteadoresNotEdited);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deletarRoteador = async (routerID) => {
    console.log(`Hello: ${routerID}`);

    try {
      await fetch(`https://sfqlqf-3000.csb.app/v1/esp-routers/${routerID}`, { method: 'DELETE' });
      console.log(`Roteador com ID ${routerID} deletado`);
    } catch (error) {
      console.error('Erro ao deletar roteador:', error);
    }

    fetch("https://sfqlqf-3000.csb.app/v1/esp-routers")
      .then((response) => response.json())
      .then(data => {
        const roteadoresNotDeleted = data.map(roteador => ({ ...roteador, macAddress: roteador.mac, routerName: roteador.name, routerID: roteador._id }));
        setRoteadores(roteadoresNotDeleted);
      })
      .catch((err) => {
        console.log(err.message);
      });


  }

  return (
    <>
      <div style={{ paddingLeft: 110 }}>
        <h1>Roteadores</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 110, alignItems: 'center', minHeight: '10vh' }} >
        <SearchBar updateFilter={updateFilter} type="roteador" />
        <ModalCriarRoteador adicionarRoteador={adicionarRoteador}></ModalCriarRoteador>
        <CustomModalEdit roteadores={roteadores} editarRoteador={editarRoteador}></CustomModalEdit>


      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        {displayedRouters !== null && (
          <TableRoteador onLoad={console.log(displayedRouters)} roteadores={displayedRouters} editarRoteador={editarRoteador} deletarRoteador={deletarRoteador} />
        )}
      </div>
    </>
  )
}

export default Roteadores;
