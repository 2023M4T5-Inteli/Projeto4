import { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"

import TabelaColaborador from "../components/tabelaColaborador"
import SelectInterval from "../components/selectInterval"
import dateToMinutes from "../helpers/dateToMinutes"
import DateForm from '../components/datePicker'
import Loading from './loadingPage'
import dateToLocale from '../helpers/dateToLocale'

const Colaborador = (props) => {
  let params = useParams();
  let maintainerUrl = "https://sfqlqf-3000.csb.app/v1/maintainers/";
  let historicUrl = "https://sfqlqf-3000.csb.app/v1/historics?maintainer=";

  const [rowsFormatadas, updateRowsFormatadas] = useState([])
  const [colaborador, atualizaColaborador] = useState('');
  const [filter, updateFilter] = useState(0);
  const [historic, updateHistoric] = useState([]);
  const [startDate, updateStartDate] = useState(0);
  const [endDate, updateEndDate] = useState(9999999999);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(maintainerUrl + params.colaboradorId)
      .then((response) => response.json())
      .then((data) => {
        atualizaColaborador(data)
      })
      .catch((err) => {
        console.log(err.message)
      })

    fetch(historicUrl + params.colaboradorId + '&orderBy=createdAt-desc')

      .then((response) => response.json())
      .then((data) => {
        updateHistoric(data)
      })
      .catch((err) => {
        console.log(err.message)
      }).finally(() => {
        setIsLoading(false);
      })

  }, [])

  useEffect(() => {
    let filteredHistoric = [];
    let lastDate = 99999999999
    historic.map((entry) => {
      if (lastDate - dateToMinutes(entry.createdAt) >= filter && dateToMinutes(entry.createdAt) >= startDate && dateToMinutes(entry.createdAt) <= endDate) {
        filteredHistoric.push(
          createData(entry)
        )
        lastDate = dateToMinutes(entry.createdAt)
      }

      updateRowsFormatadas(filteredHistoric)

    })
  }, [historic, filter, startDate, endDate])

  function createData(historic) {
    return {
      esp: historic.esp ? <Link to={`/tablets/${historic.esp._id}`}>{historic.esp.tabletName ? historic.esp.tabletName : historic.esp.mac}</Link> : 'Sem Localizador',
      online: <Link to={`/tablets/${historic.esp._id}`}>{historic.online ? 'Sim' : 'Não'}</Link>,
      local: historic.espSector ? <Link to={`/sectorTablets/${historic.espSector._id}`}>{historic.espSector.name ? historic.espSector.name : '-'}</Link> : 'Sem Setor',
      router: historic.router ? <Link to={`/roteadores`}>{historic.router.mac ? historic.router.mac : '-'}</Link> : 'Sem Roteador',
      historicDate: dateToLocale(historic.createdAt)
    };
  }

  const columns = [
    { id: 'esp', label: 'Tablet', align: 'center', minWidth: 20 },
    { id: 'online', label: 'Online', align: 'center', minWidth: 20 },
    { id: 'local', label: 'Setor', align: 'center', minWidth: 20 },
    { id: 'router', label: 'Roteador', align: 'center', minWidth: 20 },
    {
      id: 'historicDate',
      label: 'Última atualização',
      minWidth: 20,
      align: 'center',
    },
  ];

  return (
    <>
      {isLoading ? <Loading /> : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "80%" }}>
        <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2px" }}>
          <h1 style={{ marginTop: "0", marginBottom: "0" }} >{colaborador.name}</h1>
          <h2 style={{ marginTop: "0.5%", marginBottom: "0.5%" }} >{colaborador.rfid}</h2>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <div style={{ alignItems: "left", marginBottom: "1%", width: "50%", flexDirection: "row", display: "flex" }}>
              <SelectInterval updateFilter={updateFilter} valores={[1, 5, 10, 15, 30, 60]} />
            </div>
            <div style={{ alignItems: "center", justifyContent: "flex-end", marginBottom: "1%", width: "50%", flexDirection: "row", display: "flex" }}>
              <p style={{ color: "gray" }}>De</p> <DateForm updateDate={updateStartDate} /> <p style={{ color: "gray" }}>a</p> <DateForm updateDate={updateEndDate} />
            </div>
          </div>
          <TabelaColaborador rows={rowsFormatadas} columns={columns} />
        </div>
      </div>}
    </>
  )
}

export default Colaborador