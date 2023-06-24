import { Route, Routes } from 'react-router-dom'
import Colaboradores from './pages/colaboradores'
import Home from './pages/home'
import Notifications from './pages/notifications'
import Colaborador from './pages/colaborador'
import Setores from './pages/setores'
import Roteadores from './pages/roteadores'
import Tablets from "./pages/tablets"
import Tablet from './pages/tablet'
import Historico from './pages/historico'
import SectorTablets from './pages/sectorTablets'
import PaginaNaoEncontrada from './pages/paginaNaoEncontrada'
import React from 'react'
import Viewer from './pages/earth'

const Router = (props) => {
  return (
    <Routes updateHaveUnread={props.updateHaveUnread} >
      <Route path="/" element={<Home updateHaveUnread={props.updateHaveUnread} isAI={props.isAI} updateIsAI={props.updateIsAI} />} />
      <Route path="sectorTablets/:id" element={<SectorTablets isAI={props.isAI} updateIsAI={props.updateIsAI} />} />

      <Route path="notificacoes" element={<Notifications updateHaveUnread={props.updateHaveUnread} isAI={props.isAI} updateIsAI={props.updateIsAI} />} />

      <Route path="colaboradores">
        <Route path="" element={<Colaboradores />} />
        <Route path=":colaboradorId" element={<Colaborador isAI={props.isAI} updateIsAI={props.updateIsAI} />} />
      </Route>
      <Route path="tablets">
        <Route path="" element={<Tablets />} />
        <Route path=":tabletId" element={<Tablet isAI={props.isAI} updateIsAI={props.updateIsAI} />} />
      </Route>
      <Route path="earth" element={<Viewer />} />
      <Route path="setores" element={<Setores />} />
      <Route path="roteadores" element={<Roteadores />} />
      <Route path="*" element={<PaginaNaoEncontrada />} />
    </Routes>
  )
}

export default Router
