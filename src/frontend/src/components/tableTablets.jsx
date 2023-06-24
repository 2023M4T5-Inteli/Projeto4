import { Table, TableBody, TableCell, TableRow, Button, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import React from 'react';
import TabelaColaborador from "../components/tabelaColaborador"
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import IconButton from '@mui/material/IconButton';
import ModalTablets from './modalTablets';
import AlertSucess from './alerts/error';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/joy/Typography';
import TableHead from '@mui/material/TableHead';
import AlertERROR from './alerts/error';
import AlertSuccess from './alerts/sucess';
import SearchBar from './searchBar';
import removerAcentos from '../helpers/removerAcentos';
import dateToLocale from '../helpers/dateToLocale';
import Loading from '../pages/loadingPage';
import TabletMacIcon from '@mui/icons-material/TabletMac';



const TableTablet = () => {

  const [rowsFormatadas, updateRowsFormatadas] = useState([])
  const [rows, updateRows] = useState([]);
  const [get, setGet] = useState([0]);
  const [success, setSuccess] = useState(['', false]);
  const [error, setError] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleCloseCreate = () => setOpenCreate(false);
  const handleCloseUpdate = () => setOpenUpdate('');

  const [filter, updateFilter] = useState('');

  function handleOpenUpdate(id) {
    setOpenUpdate('update_' + id)
  }

  useEffect(() => {
    setIsLoading(true);
    fetch("https://sfqlqf-3000.csb.app/v1/esps?orderBy=createdAt-desc")
      .then((response) => response.json())
      .then(data => {
        updateRows(data)
        setIsLoading(false);
      })

      .catch((err) => {
        console.log(err.message);
      });

  }, [get])

  useEffect(() => {
    let returnArray = [];
    let filteredArray = [];

    rows.map((tablet) => {
      returnArray.push(createData(tablet))
    })
    returnArray.map(row => {
      console.log(row);
      if (filter !== '') {
        if (row.realName !== null && row.tablet !== null) {
          if (removerAcentos(row.realName.toLowerCase()).includes(filter) || row.realName.includes(filter) || removerAcentos(row.realName.toLowerCase()).includes(filter) || row.realName.includes(filter)) {
            filteredArray.push(row)
          }
        }
      } else { filteredArray.push(row) }
    })
    updateRowsFormatadas(filteredArray)
  }, [rows, openUpdate, filter])

  // Dados dos tablets
  function createData(tablet) {
    let color = '';
    if (tablet.lastHistoric === null) {
      color = "gray";
    } else {
      if (tablet.lastHistoric.online) {
        color = "green"
      } else {
        color = "gray"
      }
    }

    return {
      realName: tablet.tabletName,
      online: tablet.lastHistoric ? (<NeonDiv color={color} />) : 'Sem Histórico',
      name: <Link to={'/tablets/' + tablet._id} key={tablet._id}>{tablet.tabletName ? tablet.tabletName : '-'}</Link>,
      mac: <Link to={'/tablets/' + tablet._id} key={tablet._id}>{tablet.mac}</Link>,
      maintainer: tablet.lastHistoric ? (tablet.lastHistoric.maintainer ? <Link to={'/colaboradores/' + tablet.lastHistoric.maintainer._id} >{tablet.lastHistoric.maintainer.name}</Link> : 'Sem manutentor') : 'Sem Histórico',
      router: tablet.lastHistoric ? (tablet.lastHistoric.router ? <Link to={'/roteadores'}>{tablet.lastHistoric.router.mac}</Link> : 'Sem roteador') : 'Sem Histórico',
      sector: tablet.lastHistoric ? (tablet.lastHistoric.espSector ? <Link to={'/sectorTablets/' + tablet.lastHistoric.espSector._id} >{tablet.lastHistoric.espSector.name}</Link> : 'Sem sector') : 'Sem Histórico',
      lastHistoricDate: tablet.lastHistoric ? dateToLocale(tablet.lastHistoric.createdAt) : 'Sem Histórico',
      historic: <ListItemButton sx={{ justifyContent: 'center' }}>
        <ModalTablets onClick={() => handleOpenUpdate(tablet._id)} mode="editar" handleClose={handleCloseUpdate} id={tablet._id} key={'edit_' + tablet._id} setGet={setGet} setError={setError} setSuccess={setSuccess} tablet={tablet} />
        <IconButton component={Link} to={"/tablets/" + tablet._id} ><HistorySharpIcon sx={{ color: '#000000' }} /></IconButton></ListItemButton>
    };
  }

  const columns = [
    { id: 'online', label: 'Online', align: 'center', minWidth: 20 },
    { id: 'name', label: 'Apelido', align: 'center', minWidth: 20 },
    { id: 'mac', label: 'MAC', align: 'center', minWidth: 20 },
    { id: 'maintainer', label: 'Manutentor', align: 'center', minWidth: 20 },
    { id: 'router', label: 'Roteador', align: 'center', minWidth: 20 },
    { id: 'sector', label: 'Setor', align: 'center', minWidth: 20 },
    { id: 'lastHistoricDate', label: 'Última informação', align: 'center', minWidth: 20 },
    {
      id: 'historic',
      label: 'Histórico',
      minWidth: 20,
      align: 'center'
    }
  ];

  const NeonDiv = (props) => {
    return (
      props.color === "green" ?
        <div
          style={{
            width: '10px',
            marginLeft: '50px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: props.color,
            boxShadow: `0 0 10px ${props.color}`,
            animation: 'glow 1s ease-in-out infinite',
          }}
        ></div> :
        <div style={{
          width: '10px',
          marginLeft: '50px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: props.color
        }}></div>
    );
  };


  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "80%" }}>
        <div style={{ width: "80%", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ marginTop: "0" }}>Tablets</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            {error ? <AlertERROR setError={setError} /> : null}
            {success[1] ? <AlertSuccess setSuccess={setSuccess} type="Tablet" /> : null}
          </div>
        </div>
        <div style={{ width: "80%", display: "flex", justifyContent: "flex-end", marginBottom: "8px" }}>
          <SearchBar updateFilter={updateFilter} type="tablet" />
          <ModalTablets mode="create" setGet={setGet} handleClose={handleCloseCreate} setError={setError} setSuccess={setSuccess} />
        </div>
        <div style={{ width: "80%", display: "flex", justifyContent: "center" }}>
          {isLoading ? <Loading /> : (
            <React.Fragment>
              <TabelaColaborador rows={rowsFormatadas} columns={columns} />
            </React.Fragment>
          )}
        </div>
      </div>
    </>
  )
};


export default TableTablet;
