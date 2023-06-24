import React from 'react'
import Button from '@mui/material/Button'

const ContentDeleteModal = (props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "80%" }}>
      <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2px", textAlign: 'center' }}>
        <h3>Tem certeza de que deseja apagar o registro do colaborador {props.nome}?</h3>
        <Button variant="contained" onClick={() => props.handleDelete(props.id)}>Apagar</Button>
      </div>
    </div>
  )
}

export default ContentDeleteModal
