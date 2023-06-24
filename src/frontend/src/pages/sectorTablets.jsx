import * as React from 'react';
import Typography from '@mui/joy/Typography';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSetoresWithEsps } from '../services/Setores';
import LoadingEarth from '../pages/loadingPage';
import { DataGrid } from '@mui/x-data-grid';
import dateToLocale from '../helpers/dateToLocale';

const SectorTablets = () => {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [sector, setSector] = useState({});


    const navigator = useNavigate();

    const handleCellClick = (params, event) => {
        navigator(`/tablets/${params.row.id}`);
    };

    const NeonDiv = (props) => {
        return (
          props.color === "green"?
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
          ></div>:
          <div style={{
            width: '10px',
            marginLeft: '50px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: props.color
          }}></div>
        );
      };

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const sectors = await getSetoresWithEsps(`_id=${id}`);
            if (!sectors[0]) {
                return navigator('/setores');
            }

            setSector(sectors[0]);
            setIsLoading(false);
        })()
    }, []);

    const columns = [
        { field: 'tabletName', headerName: 'Nome do tablet', width: 260 },
        { field: 'mac', headerName: 'MAC', width: 170 },
        { field: 'maintainer', headerName: 'Manutentor', width: 170 },
        { field: 'router', headerName: 'MAC roteador', width: 200 },
        { field: 'online', headerName: 'Online', width: 125, renderCell: (params) => {
            let color = '';
            console.log("params: ")
            console.log(params)
            // console.log("params.row: ")
            // console.log()

            if (params.row.lastHistoric === 'Sem histórico') {
                color = "gray";
            } else {
                color = params.value;
            }
            return <NeonDiv color={color} />;
        } },
        { field: 'lastHistoricDate', headerName: 'Última Atualização', width: 170 },
    ];

    const esps = sector && sector.esps ? sector.esps : [];
    
    const rows = esps.map(esp => {
        let color = '';
        if (esp.lastHistoric === null) {
          color = "gray";
        } else {
          if (esp.lastHistoric.online) {
            color = "green"
          } else {
            color = "gray"
          }
        }
        const row = {
            id: esp._id,
            tabletName: esp.tabletName,
            mac: esp.mac,
            maintainer: esp.lastHistoric ? (esp.lastHistoric.maintainer ? (esp.lastHistoric.maintainer.name ? esp.lastHistoric.maintainer.name : '-') : 'Sem manutentor') : 'Sem histórico',
            router: esp.lastHistoric ? (esp.lastHistoric.router ? (esp.lastHistoric.router.mac ? esp.lastHistoric.router.mac : '-') : 'Sem roteador') : 'Sem histórico',
            online: esp.lastHistoric ? color : 'Sem Histórico',
            lastHistoricDate: esp.lastHistoric ? (`${dateToLocale(esp.lastHistoric.createdAt)}`) : 'Sem histórico',
        }

        return row;
    })


    return <div className="selectDiv" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', marginLeft: '5%' }}>
        {isLoading || (!sector || !sector._id) ? <LoadingEarth /> : <>
            <Typography level="display2" textAlign="start" fontSize={"40px"}>
                {sector.name ? `Setor: ${sector.name}` : `Setor sem nome`}
            </Typography>
            <div style={{ fontSize: '14px', color: '#808080' }}>
                <span style={{ marginRight: 10 }}>Última edição: <strong>{dateToLocale(sector.updatedAt)}</strong></span>
                Criação: <strong>{dateToLocale(sector.createdAt)}</strong>
            </div>

            <span style={{ fontSize: '14px', color: '#808080' }}>
                <strong>{`${sector.esps.length} tablet${sector.esps.length != 1 ? 's' : ''}`}</strong>
                {` nesse setor`}
            </span>

            {sector.esps.length ? <div style={{ width: "97%", height: '100%', marginTop: '10px' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    onCellClick={handleCellClick}
                />
            </div> : <Typography level="display2" textAlign="start" sx={{ mb: 2 }}>
                {`Sem esps conectados`}
            </Typography>}

        </>
        }
    </div >;
}

export default SectorTablets