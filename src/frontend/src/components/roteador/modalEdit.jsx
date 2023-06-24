import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import FormEditaRoteador from './formEditaRoteador';
import { TextField, Button } from '@mui/material';
import SelectSector from '../selectSector'


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const CustomModalEdit = ({ open, handleClose, editarRoteador, routerID }) => {

    const [routerName, setRouterName] = useState(null);
    const [macAddress, setMacAddress] = useState(null);
    const [sector, updateSector] = useState('');
    const [valores, updateValores] = useState([]);
    const [sectorId, updateSectorId] = useState('');
    

    const handleEdit = (e) => {
        // Lógica para criar o roteador com os dados fornecidos
        console.log('Router name:', routerName);
        console.log('MAC Address:', macAddress);
        console.log('Sector: ', sector);
        console.log('SectorId: ', sectorId);

        e.preventDefault();
        editarRoteador({ routerName, macAddress, routerID, sectorId });
        setRouterName('');
        setMacAddress('');
        updateSector('');
    };

    const handleNomeChange = (event) => {
        setRouterName(event.target.value);
    };

    const handleMacAddressChange = (event) => {
        setMacAddress(event.target.value);
    };

    React.useEffect(() => {
    
        fetch("https://sfqlqf-3000.csb.app/v1/sectors")
        .then((response) => response.json())
        .then(data => {
        data.map((item) => {
            if(item.name == sector) {
            const id = item._id
            updateSectorId(id)
            }
        });
        console.log(valores)

        })
        .catch ((error) => {
        console.log(error.message);
        console.log("oi rafa techio")
        return [];
        });
    }, [sector]);


    React.useEffect(() => {
    
        fetch("https://sfqlqf-3000.csb.app/v1/sectors")
        .then((response) => response.json())
        .then(data => {
        const valores2 = data.map((item) => item.name);
        const ids = data.map((item) => item.id);
        updateValores(valores2)
        updateSectorId(ids)
        console.log(valores)

        })
        .catch ((error) => {
        console.log(error.message);
        console.log("oi rafa techio")
        return [];
        });
    }, []);

    // const handleCreate = (e) => {
    //     console.log('Router name:', routerName);
    //     console.log('MAC Address:', macAddress);
    //     console.log('Backend ID:', routerID);


    //     e.preventDefault();

    //     editarRoteador({ routerName, macAddress, routerID, sectorId });
    //     setRouterName('');
    //     setMacAddress('');

    //     console.log("Editado com sucesso!");
    // };

    // const handleNomeChange = (event) => {
    //     setRouterName(event.target.value);
    // };

    // const handleMacAddressChange = (event) => {
    //     setMacAddress(event.target.value);
    // };

    return (
        <Dialog onClose={handleClose} open={open}>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Editar roteador
                </BootstrapDialogTitle>
                <DialogContent dividers={true}
                >
                    {/* <FormEditaRoteador editarRoteador={editarRoteador} routerID={routerID}></FormEditaRoteador> */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minHeight: '15vh' }}>
                        <TextField sx={{ width: 300 }}
                            label="Edite o nome do rastreador"
                            value={routerName}
                            onChange={handleNomeChange}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            sx={{ width: 300, paddingBottom: 1 }}
                            label="Edite o endereço MAC do rastreador"
                            value={macAddress}
                            onChange={handleMacAddressChange}
                            fullWidth
                            margin="normal"
                        />
                        <SelectSector updateSector={updateSector} updateSectorId={updateSectorId} valores={valores} />
                        <Button variant="contained" color="primary" onClick={handleEdit} sx={{ width: 100, marginTop:'5%' }}>
                            Editar
                        </Button>

                    </div>
                </DialogContent>
            </BootstrapDialog>
        </Dialog>
    );
};

CustomModalEdit.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default CustomModalEdit;