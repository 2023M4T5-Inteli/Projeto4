import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

import './tableNotifications.css';


export default function TableNotifications(props) {
    
    return (
        <>

            <div style={{ height: 300 , width: '90%' }}>
                <DataGrid 
                rows={props.rows} 
                columns={props.columns} 
                disableColumnMenu 
                getRowClassName={(params) => params.row.state} />

            </div>
        </>
    );
    
}; 