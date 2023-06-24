import * as React from 'react';
import { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/joy/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';




export default function ModalTablets(props) {
  const { mode } = props;
  const [open, setOpen] = React.useState(false);
  const [tabletName, settabletName] = useState(null);
  const [mac, setMac] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {

    e.preventDefault(); // Prevent the default form submission behavior

    fetch("https://sfqlqf-3000.csb.app/v1/esps/", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tabletName: tabletName,
        mac: mac
      })
    })
      .then(res => {
        if (res.ok) {
          props.setSuccess(['cadastrado', true])
        }
        else {
          props.setError(true);
        }
      })
      .then(() => {
        endFetch()
      })
      .then(() => {
        handleClose()
      })
      .catch((error) => console.log(error))
  }

  const handleUpdate = (e) => {

    e.preventDefault(); // Prevent the default form submission behavior

    fetch("https://sfqlqf-3000.csb.app/v1/esps/" + props.tablet._id, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tabletName: tabletName,
        mac: mac
      })
    })
      .then(res => {
        if (res.ok) {
          props.setSuccess(['Atualizado', true])
        }
        else {
          props.setError(true);
        }
      })
      .then(() => {
        endFetch()
      })
      .then(() => {
        handleClose()
      })
      .catch((error) => console.log(error))
  }

  const endFetch = () => {
    settabletName(null);
    setMac(null);
    props.handleClose();
    props.setGet(former => former + 1)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeNome = (e) => {
    settabletName(e.target.value);
  }

  const handleChangeMac = (e) => {
    setMac(e.target.value);
  }


  return (
    <div>
      {mode === 'create' ?
        <React.Fragment>
          <Button
            color="primary"
            disabled={false}
            onClick={handleClickOpen}
            size="md"
            variant="outlined"> <AddIcon /> Criar
          </Button>
        </React.Fragment> :
        <React.Fragment>
          <IconButton onClick={handleClickOpen}>
            <EditIcon sx={{ color: '#000000' }} />
          </IconButton>
        </React.Fragment>}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {mode === 'create' ? 'Criar novo tablet' : 'Editar tablet'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {mode === 'create'
              ? 'Insira as informações do novo tablet:'
              : (
                <React.Fragment>
                  Se você deseja editar o nome ou mac address do tablet, favor inserir abaixo:
                  <Typography level="body4">
                    Não é necessário o preenchimento de ambos os campos
                  </Typography>
                </React.Fragment>
              )}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="tabletName"
            name='tabletName'
            label="Nome do tablet"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeNome}
          />
          <TextField
            autoFocus
            margin="dense"
            id="mac"
            name='mac'
            label="Mac"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeMac}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          {mode === 'create' ?
            <React.Fragment>
              <Button type='submit' onClick={handleSubmit}>
                Criar
              </Button>
            </React.Fragment> :
            <React.Fragment>
              <Button type='submit' onClick={handleUpdate} >
                Editar
              </Button>
            </React.Fragment>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
