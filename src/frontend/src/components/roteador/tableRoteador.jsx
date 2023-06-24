import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import FormEditaRoteador from './formRoteador';
import CustomModalEdit from './modalEdit';
import AlertDialog from './modalDelete';

const TableRoteador = ({ roteadores, editarRoteador, deletarRoteador }) => {
    const rows = roteadores.map((roteador, index) => ({
        id: index,
        nome: roteador.routerName || 'Sem nome',
        macAddress: roteador.macAddress,
        routerID: roteador._id
    }));

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedRouterID, setSelectedRouterID] = useState('');
    const [selectedID, setSelectedID] = useState('');


    const handleDeleteRow = (id, routerID) => {
        setOpenDelete(true);
        setSelectedRouterID(routerID);
        setSelectedID(id);
    }


    const handleDeleteRoteador = (id, routerID) => {
        setOpenDelete(false);
        console.log(`Delete row with RowID ${id} and RouterID: ${routerID}`);
        deletarRoteador(routerID);
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
    }

    const handleEditColumn = (id, routerID) => {
        console.log(`Editing row with Table ID ${id}`);
        console.log(`Backend ID ${routerID}`);
        setSelectedRouterID(routerID);
        setOpen(true);

    }

    const handleClose = () => {
        setOpen(false);
    };


    const columns = [
        { field: 'nome', headerName: 'Roteadores', width: 600 },
        {
            field: 'macAddress',
            headerName: 'Endereços MAC',
            width: 300,
            disableColumnFilter: true
        },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 100,
            renderCell: (params) => (
                <div>
                    <EditIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleEditColumn(params.row.id, params.row.routerID)}
                    />
                    <DeleteIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteRow(params.row.id, params.row.routerID)}
                    />
                </div>
            ),
        },
    ];


    return (
        <>
            <div>
                <div style={{ height: 300, width: 1200 }}>
                    <CustomModalEdit open={open} setOpen={setOpen} handleClose={handleClose} editarRoteador={editarRoteador} routerID={selectedRouterID}></CustomModalEdit>
                    <DataGrid rows={rows} columns={columns} disableColumnMenu />
                    <AlertDialog open={openDelete} setOpen={setOpenDelete} handleCloseDelete={handleCloseDelete} handleDeleteRoteador={handleDeleteRoteador} routerID={selectedRouterID} id={selectedID} />
                </div>
            </div>
        </>
    );
}

export default TableRoteador;