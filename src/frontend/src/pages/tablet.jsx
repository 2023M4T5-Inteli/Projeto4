import { useEffect, useState } from 'react';
import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import DateForm from '../components/datePicker'
import SelectInterval from '../components/selectInterval'
import dateToMinutes from '../helpers/dateToMinutes'

import TabelaColaborador from '../components/tabelaColaborador';

const Tablet = (props) => {
  let params = useParams();
  let url = 'https://sfqlqf-3000.csb.app/v1/historics?esp=';

  const [rowsFormatadas, updateRowsFormatadas] = useState([]);
  const [rows, updateRows] = useState([]);
  const [mac, updateMac] = useState('');
  const [filter, updateFilter] = useState(0);
  const [startDate, updateStartDate] = useState(0);
  const [endDate, updateEndDate] = useState(999999999)

  const handleChange = (event, index) => {
    const isChecked = event.target.checked;

    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        return { ...row, verified: isChecked };
      }
      return row;
    });

    updateRows(updatedRows);

    const historicId = rows[index]._id;

    fetch("https://sfqlqf-3000.csb.app/v1/historics/" + historicId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ verified: isChecked }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Atualizado', data);
      })
      .catch((error) => {
        console.log('Erro ao atualizar:', error);
      });
  };

  useEffect(() => {
    fetch(url + params.tabletId + '&orderBy=createdAt-desc')
      .then((response) => response.json())
      .then( props.isAI ? (data) => {
        const newDataIa = data.map(item => ({
          ...item,
          espSector: item.iaEspSector
        }))
        updateRows(newDataIa);
      }
      :
      (data) => {
        const newData = data.map(item => ({
          ...item,
          espSector: item.espSector
        }))
        updateRows(newData);
      }
      )
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    if (rows.length > 0) {
      updateMac(rows[0].esp.mac);
    }
  }, [rows]);

  useEffect(() => {
    let returnArray = [];
    let lastDate = 99999999999

    rows.map((entry, index) => {
      
      if(lastDate - dateToMinutes(entry.createdAt) >= filter && dateToMinutes(entry.createdAt) >= startDate && dateToMinutes(entry.createdAt) <= endDate){
        returnArray.push(
          createData(
            entry.esp.mac,
            entry.maintainer ? entry.maintainer.name : 'Não possui colaborador',
            entry.espSector ? entry.espSector.name : 'Sem setor cadastrado',
            entry.createdAt.slice(8, 10) +
              '/' +
              entry.createdAt.slice(5, 7) +
              '/' +
              entry.createdAt.slice(0, 4) +
              ' - ' +
              entry.createdAt.slice(11, 16),
            entry.verified,
            index,
          )
        );
        lastDate = dateToMinutes(entry.createdAt)
      }
    });

    updateRowsFormatadas(returnArray);
  }, [rows, filter, startDate, endDate]);

  function createData(tablet, colaborador, setor, data, verified, index) {
    return { tablet, colaborador, setor, data, verified, index };
  }

  const columns = [
    { id: 'tablet', label: 'Tablet', align: 'center', minWidth: 20 },
    { id: 'colaborador', label: 'Colaborador', align: 'center', minWidth: 20 },
    { id: 'setor', label: 'Setor', align: 'center', minWidth: 20 },
    { id: 'verificado', label: 'verificado', align: 'center', minWidth: 20 },
    {
      id: 'data',
      label: 'Data',
      minWidth: 20,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "80%" }}>
        <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2px" }}>
          <h1 style={{ marginTop: "0" }} >mac: {mac}</h1>
          <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
          <div style={{alignItems:"left", marginBottom:"1%", width:"50%", flexDirection:"row", display:"flex"}}>
            <SelectInterval updateFilter={updateFilter} valores={[1, 5, 10, 15, 30, 60]} />
          </div>
          <div style={{alignItems:"center", justifyContent:"flex-end", marginBottom:"1%", width:"50%", flexDirection:"row", display:"flex"}}>
            <p style={{color:"gray"}}>De</p> <DateForm updateDate={updateStartDate} /> <p style={{color:"gray"}}>a</p> <DateForm updateDate={updateEndDate} />
          </div>
        </div>
          <TabelaColaborador
            rows={rowsFormatadas}
            columns={columns}
            renderCheckbox={(row) => (
              <Checkbox
                checked={row.verified}
                onChange={(event) => handleChange(event, row.index)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            )}
          />
        </div>
      </div>
    </>
  );
};

export default Tablet;
