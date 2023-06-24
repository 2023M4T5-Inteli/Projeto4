import React, { useEffect, useState } from 'react';
import MapaFabrica from '../components/map';
import MyResponsiveBar from '../components/home/bar';
import DbmPorSetorPorHora from "../components/home/chart";
import MyResponsivePie from '../components/home/pizza';
import TableDashNotifications from "../components/tableDashNotifications";
import { getSetoresWithEsps } from '../services/Setores';
import Loading from './loadingPage';
import { getEsps } from '../services/Esps';
import { getHistorics } from '../services/Historics';
import { getMaintainers } from '../services/Maintainers';
import { getRouters } from '../services/Routers';
import dateToSeconds from '../helpers/dateToMinutes';
import Kpi from '../components/home/kpis/kpi';

import FactoryIcon from '@mui/icons-material/Factory'
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import AutoGraphTwoToneIcon from '@mui/icons-material/AutoGraphTwoTone';
import RouterIcon from '@mui/icons-material/Router';
import { getNotifications } from '../services/Notifications';


const Home = (props) => {
  const [sectors, setSectors] = useState([]);
  const [esps, setEsps] = useState([]);
  const [historics, setHistorics] = useState([]);
  const [maintainers, setMaintainers] = useState([]);
  const [routers, setRouters] = useState([]);

  const [isLoadingSectors, setIsLoadingSectors] = useState(false);
  const [isLoadingEsps, setIsLoadingEsps] = useState(false);
  const [isLoadingHistorics, setIsLoadingHistorics] = useState(false);
  const [isLoadingMaintainers, setIsLoadingMaintainers] = useState(false);
  const [isLoadingRouters, setIsLoadingRouters] = useState(false);

  useEffect(() => {
    setIsLoadingEsps(true);
    setIsLoadingMaintainers(true);
    setIsLoadingSectors(true);
    setIsLoadingHistorics(true);
    setIsLoadingRouters(true);

    const fetchData = async () => {
      try{

        setEsps(await getEsps(props.isAI, ''));
        setIsLoadingEsps(false);

        setMaintainers(await getMaintainers());
        setIsLoadingMaintainers(false);

        setSectors(await getSetoresWithEsps());
        setIsLoadingSectors(false);

        setRouters(await getRouters());
        setIsLoadingRouters(false);

        setHistorics(await getHistorics());
        setIsLoadingHistorics(false);

        setTimeout(fetchData, 12000);
      } catch (error) {
        console.error(error);
      }
    }
    

    fetchData();

  }, []);


  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {isLoadingEsps && isLoadingHistorics && isLoadingSectors && isLoadingMaintainers && isLoadingRouters ? <Loading /> : <>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "10vh" }}>
          <div style={{ width: "69%", height: "67%", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "50px", marginTop: '-5%' }}>
            {/* <Kpis /> */}
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "10%" }}>
              <div style={{ flex: "1", height: "100%" }}>
                {!isLoadingMaintainers ? <Kpi
                  ammount={maintainers.length}
                  text="Número de colaboradores" color="aquamarine"
                  icon={<AccountCircleTwoToneIcon sx={{ width: "50%", height: "50%" }} />}
                /> : null}
              </div>
              <div style={{ flex: "1", height: "100%" }}>
                {!isLoadingSectors ? <Kpi
                  ammount={sectors.length}
                  text="Número de setores"
                  color="lightGreen"
                  icon={<FactoryIcon sx={{ width: "50%", height: "50%" }} />}
                /> : null}
              </div>
              <div style={{ flex: "1", height: "100%" }}>
                {!isLoadingRouters ? <Kpi
                  ammount={routers.length}
                  text="Número de roteadores"
                  color="red"
                  icon={<RouterIcon sx={{ width: "50%", height: "50%" }} />}
                /> : null}
              </div>
              <div style={{ flex: "1", height: "100%", width: '100%' }}>
                {!isLoadingEsps && !isLoadingHistorics ? <Kpi
                  ammount={(() => {
                    if (!historics.length) return 0;

                    let currentTime = dateToSeconds(historics[0].createdAt)
                    let espsUtilizados = []
                    historics.map((historic) => {
                      if (currentTime - dateToSeconds(historic.createdAt) <= currentTime - 8 * 60 && !(espsUtilizados.includes(historic.esp._id))) {
                        espsUtilizados.push(historic.esp._id)
                      }
                    })

                    return espsUtilizados.length;
                  })()}
                  text="Tablets utilizados nas últimas 8 horas"
                  color="pink"
                  icon={<AutoGraphTwoToneIcon sx={{ width: "50%", height: "50%" }} />}
                /> : null}
              </div>
            </div>
          </div>
          <div style={{ width: "30%", height: "300%", marginLeft: "2%", marginRight: "2%" }}>
            <TableDashNotifications updateHaveUnread={props.updateHaveUnread} />
            <div style={{ width: "110%" }}>
              <div style={{ height: "300px" }}>
                {!isLoadingSectors ? <MyResponsiveBar isAI={props.isAI} sectors={sectors} /> : <Loading />}
              </div>
              <div style={{ height: "260px" }}>
                {!isLoadingEsps ? <MyResponsivePie esps={esps} /> : <Loading />}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", height: "25vh", marginTop: "4%" }}>
          <div style={{ width: "70%", height: "100%", marginLeft: "2vw" }}>
            {!isLoadingSectors && !isLoadingHistorics ? <DbmPorSetorPorHora sectors={sectors} historics={historics} isAI={props.isAI} /> : <Loading />}
          </div>
        </div>
        <div style={{ display: "flex", height: "calc(65vh - 3% - 25vh)", marginTop: "0.5%" }}>
          <div style={{ width: "60%", height: "100%", marginLeft: "2vw" }}>
            {!isLoadingSectors ? <MapaFabrica sectorsWithEsps={sectors} /> : <Loading />}
          </div>
        </div>
      </>}

    </div>
  );
}

export default Home;