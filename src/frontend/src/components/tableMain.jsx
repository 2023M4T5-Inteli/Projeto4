import { Table, TableBody, TableCell, TableRow, Button } from '@mui/material';
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import TabelaColaborador from "../components/tabelaColaborador";
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/joy/Typography';
import TableHead from '@mui/material/TableHead';


const TableTablet = () => {
  const [rowsFormatadas, updateRowsFormatadas] = useState([])
  const [rows, updateRows] = useState([]);
  let params = useParams();
  let url = "https://sfqlqf-3000.csb.app/v1/historics?orderBy=createdAt-desc";

  useEffect(() => {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      updateRows(data)
    })
    .catch((err) => {
      console.log(err.message)
    })
  }, [])


  useEffect(() => {
    let returnArray = [];
    rows.map((tablet) => {
      returnArray.push(
        createData(tablet.esp.mac,tablet.maintainer? tablet.maintainer.name: "Colaborador sem nome"
            ,tablet.espSector? tablet.espSector.name : "Setor não encontrado")
      )
    })
    updateRowsFormatadas(returnArray)
    console.log(rowsFormatadas)
  }, [rows])


  // Dados dos tablets
  function createData(tablet,colaborador,Localizacao) {
    return { tablet,colaborador,Localizacao};
  }

  const columns = [
    { id: 'tablet', label: 'tablet', align: 'center', minWidth: 20 },
    { id: 'colaborador', label: 'colaborador', align: 'center', minWidth: 20 },
    { id: 'Localizacao', label: 'Localização', align: 'center', minWidth: 20 },
  ];


  return (
    <>
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", height:"80%"}}>
      <div style={{width:"80%", display:"flex", flexDirection:"column", alignItems:"center", marginTop:"2px"}}>
        <h1 style={{marginTop:"0"}} >Informações</h1>
        <TabelaColaborador rows={rowsFormatadas} columns={columns} />
      </div>
    </div>
  </>
  )
};


export default TableTablet;
