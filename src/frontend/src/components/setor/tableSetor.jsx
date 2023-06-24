import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TableSetor = ({ setores, handleEdit, handleDelete, handleClick }) => {
    const handleCellClick = (params, event) => {
        if (params.field !== 'actions') {
            handleClick(params.row);
        }
    };

    const columns = [
        { field: 'name', headerName: 'Setores', width: 800 },
        { field: 'onMap', headerName: 'Está no mapa', width: 150 },
        { field: 'espQuantity', headerName: 'Quantidade de Tablets', width: 150 },
        { field: 'createdAt', headerName: 'Data Criação', width: 150 },
        {
            field: 'actions',
            headerName: 'Ações',
            width: "100",
            disableColumnFilter: false,
            renderCell: (params) => (
                <div>
                    <EditIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleEdit(params.row)}
                    />
                    <DeleteIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDelete(params.row)}
                    />
                </div>
            ),
        },
    ];

    const rows = setores.map(setor => {
        const createdAt = new Date(setor.createdAt);
        return {
            id: setor._id,
            name: setor.name ? setor.name : '-',
            onMap: setor.mapX && setor.mapY ? 'Sim' : 'Não',
            espQuantity: setor.esps.length,
            createdAt: `${createdAt.toLocaleDateString('pt-br')} ${createdAt.toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit' })}`
        }
    });

    return (
        <DataGrid rows={rows} columns={columns} onCellClick={handleCellClick} />
    );
}

export default TableSetor;