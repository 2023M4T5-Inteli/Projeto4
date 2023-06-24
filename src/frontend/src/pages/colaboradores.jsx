import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TabelaColaboradores from '../components/tabelaColaboradores'
import SearchBar from '../components/searchBar'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import removerAcentos from '../helpers/removerAcentos';
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import IconButton from '@mui/material/IconButton';
import BaseModal from '../components/baseModal';
import ContentDeleteModal from '../components/contentDeleteModal';
import UpdateMaintainer from '../components/updateMaintainer';
import Button from '@mui/material/Button';
import CreateMaintainer from '../components/createMaintainer';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import dateToLocale from '../helpers/dateToLocale';
import { ListItemButton } from '@mui/material';
import Loading from './loadingPage';

const Colaboradores = () => {

  const [rows, updateRows] = useState([]);

  const [filter, updateFilter] = useState('');

  const [rowsFormatadas, updateRowsFormatadas] = useState([]);

  const [openDelete, setOpenDelete] = useState(null);

  const [deleteModals, setDeleteModals] = useState([]);

  const [get, setGet] = useState([0]);

  const [sectors, setSectors] = useState([]);

  const [openUpdate, setOpenUpdate] = useState(null);

  const [openCreate, setOpenCreate] = useState(false);

  const [error, setError] = useState(false);

  const [success, setSuccess] = useState(['', false]);

  const [isLoading, setIsLoading] = useState(false);

  function handleOpenDelete(id) {
    setOpenDelete('delete_' + id)
  }

  function handleOpenUpdate(id) {
    setOpenUpdate('update_' + id)
  }

  function handleOpenCreate() {
    setOpenCreate(true);
  }

  const handleCloseDelete = () => setOpenDelete('');
  const handleCloseUpdate = () => setOpenUpdate('');
  const handleCloseCreate = () => setOpenCreate(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://sfqlqf-3000.csb.app/v1/sectors")
      .then((response) => response.json())
      .then(data => {
        setSectors(data)
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [])

  useEffect(() => {
    setIsLoading(true);
    fetch("https://sfqlqf-3000.csb.app/v1/maintainers")
      .then((response) => response.json())
      .then(data => {
        setIsLoading(false);
        updateRows(data)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [get])

  useEffect(() => {
    let returnArray = [];
    let modalsArray = [];
    let newRows = [];
    rows.map((manutentor) => {
      returnArray.push(createData(manutentor))
      modalsArray.push(
        <BaseModal open={openDelete === 'delete_' + manutentor._id} handleClose={handleCloseDelete} content={<ContentDeleteModal nome={manutentor.name} handleDelete={handleDelete} id={manutentor._id} />} />
      )
      modalsArray.push(
        <BaseModal open={openUpdate === 'update_' + manutentor._id} handleClose={handleCloseUpdate} content={<UpdateMaintainer manutentor={manutentor} sectors={sectors} setGet={setGet} handleClose={handleCloseUpdate} setError={setError} setSuccess={setSuccess} />} />
      )
      return null
    })
    for (let row of returnArray) {
      if (row.realName) {
        if (removerAcentos(row.realName.toLowerCase()).includes(filter) || row.realName.includes(filter)) {
          newRows.push(row)
        }
      }
    }
    updateRowsFormatadas(newRows)
    setDeleteModals(modalsArray)
  }, [rows, filter, openDelete, openUpdate])

  function createData(maintainer) {
    const lastHistoric = maintainer.lastHistoric;

    return {
      realName: maintainer.name,
      name: <Link to={`/colaboradores/${maintainer._id}`}>{maintainer.name ? maintainer.name : '-'}</Link>,
      rfid: <Link to={`/colaboradores/${maintainer._id}`}>{maintainer.rfid ? maintainer.rfid : '-'}</Link>,
      router: lastHistoric ? (lastHistoric.router ? <Link to={`/roteadores`}>{lastHistoric.router.mac}</Link> : '-') : 'Sem histórico',
      esp: lastHistoric ? (lastHistoric.esp ? (<Link to={`/tablets/${lastHistoric.esp._id}`}>{lastHistoric.esp.tabletName ? lastHistoric.esp.tabletName : lastHistoric.esp.mac}</Link>) : '-') : 'Sem histórico',
      sector: lastHistoric ? (lastHistoric.espSector ? <Link to={`/sectorTablets/${lastHistoric.espSector._id}`}>{lastHistoric.espSector.name}</Link> : '-') : 'Sem histórico',
      lastHistoricDate: lastHistoric ? (dateToLocale(lastHistoric.createdAt)) : 'Sem histórico',
      actions: <ListItemButton sx={{ justifyContent: 'center' }}>
        <IconButton onClick={() => handleOpenUpdate(maintainer._id)} ><EditIcon /></IconButton>
        <IconButton onClick={() => handleOpenDelete(maintainer._id)} ><DeleteOutlineIcon /></IconButton>
      </ListItemButton>
    };
  }

  const columns = [
    { id: 'name', label: 'Nome', align: 'center', minWidth: 20 },
    { id: 'rfid', label: 'RFID', align: 'center', minWidth: 20 },
    { id: 'router', label: 'Roteador Atual', align: 'center', minWidth: 20 },
    { id: 'esp', label: 'Tablet Atual', align: 'center', minWidth: 20 },
    { id: 'sector', label: 'Setor Atual', align: 'center', minWidth: 20 },
    { id: 'lastHistoricDate', label: 'Última Atualização', align: 'center', minWidth: 20 },
    { id: 'actions', label: 'Ações', align: 'center', minWidth: 20 },
  ];

  const handleDelete = (id) => {
    setIsLoading(true);
    fetch('https://sfqlqf-3000.csb.app/v1/maintainers/' + id, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // Handle successful deletion
          setGet((former) => former + 1)
          setSuccess(['apagado', true])
        } else {
          // Handle non-successful response
          setError(true);
        }
      })
      .catch(error => {
        // Handle network error
        console.error('Network error:', error);
      }).finally(() => {
        setIsLoading(false);
      });
    handleCloseDelete()
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "80%" }}>
        <div style={{ width: "80%", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ marginTop: "0" }}>Colaboradores</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            {error ? <Alert severity='error' action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setError(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }>Algo deu errado. Verifique as informações inseridas e, se o erro persistir, peça ajuda a um administrador.</Alert> : <></>}

            {success[1] ? <Alert severity='success' action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setSuccess(['', false]);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }>Colaborador {success[0]} com sucesso.</Alert> : <></>}
          </div>
        </div>
        <div style={{ width: "80%", display: "flex", justifyContent: "flex-end", marginBottom: "8px" }}>
          <SearchBar updateFilter={updateFilter} type="colaborador" />
          <Button onClick={handleOpenCreate}>Adicionar</Button>
          <BaseModal open={openCreate} handleClose={handleCloseCreate} content={<CreateMaintainer sectors={sectors} setGet={setGet} handleClose={handleCloseCreate} setError={setError} setSuccess={setSuccess} />} />
        </div>
        {isLoading ? <Loading /> : <div style={{ width: "80%", display: "flex", justifyContent: "center" }}>
          <TabelaColaboradores rows={rowsFormatadas} columns={columns} />
        </div>}
        {deleteModals.map((modal) => {
          return modal
        })}
      </div>
    </>
  )
}

export default Colaboradores
