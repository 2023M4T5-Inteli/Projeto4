import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';





import './tableNotifications.css';


function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}



export default function TableDashNotifications(props) {

    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);

    const [rows, updateRows] = React.useState([]);

    const [rowsFormatadas, updateRowsFormatadas] = React.useState([]);

    const [changedNotificationState, updateChangedNotificationState] = React.useState(false);


    if (changedNotificationState == true && rows && rows.length) {
        const uncheckedNotification = rows.some(item => {
            return item.state === 'unchecked';
        });
        props.updateHaveUnread(uncheckedNotification)
        updateChangedNotificationState(false)
    }


    function UpdateState(row, newState) {
        // console.log("nhaaaaa juba");
        // console.log(row)
        fetch("https://sfqlqf-3000.csb.app/v1/notifications/" + row.id, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: null,
                maintainer: null,
                sector: null,
                esp: null,
                router: null,
                category: null,
                state: newState
            })
        })
            // console.log(res)
            .then(res => {
                if (res.ok) {
                    updateChangedNotificationState(true);
                }
            })
            .catch((error) => console.log(error))
    }

    const handleStatusChange = (id) => {

        const updatedRows = rows.map((row) => {
            if (row.id === id) {
                // console.log(row);
                UpdateState(row, (row.state === "unchecked" ? "checked" : "unchecked"))
                return { ...row, state: row.state === 'unchecked' ? 'checked' : 'unchecked' };
            }
            return row;
        });

        updateRows(updatedRows);
    };


    React.useEffect(() => {
        const fetchData = () => {
            try {
                fetch("https://sfqlqf-3000.csb.app/v1/notifications")
                    .then((response) => response.json())
                    .then(data => {
                        // Mapeie os dados para criar uma nova propriedade 'id' para cada item

                        const newDataFormatada = data.map(item => ({
                            ...item,
                            id: item._id,
                        }));

                        updateRowsFormatadas(newDataFormatada);
                        updateRows(newDataFormatada)

                        let returnArray = [];
                        if (rowsFormatadas.length > 0) {
                            for (let i = 0; i < 2; i++) {
                                if (rowsFormatadas[i]) {
                                    returnArray.push(
                                        createData(rowsFormatadas[i].id,
                                            rowsFormatadas[i].content,
                                            rowsFormatadas[i].state
                                        ))
                                }

                            }


                            updateRows(returnArray)
                        }
                        else {
                            updateRowsFormatadas(rows)
                        }
                    })
                    // .then(data => updateRows(data))
                    .catch((err) => {
                        console.log(err.message);
                    });

                updateChangedNotificationState(true)

                setTimeout(fetchData, 10000);
            } catch (error) {
                console.error(error);
            }

        }

        fetchData();
    }, [])

    function createData(id, content, state) {
        return { id, content, state };
    }



    const columns = [
        {
            field: 'content',
            headerName: 'Mensagem',

            width: 400,

        },
        {
            field: 'actions',
            headerName: 'Visto',
            width: 50,
            renderCell: (params) => (
                <div>
                    {params.row.state === 'unchecked' ?
                        <VisibilityIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleStatusChange(params.row.id)}
                        />
                        :
                        <VisibilityOffIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleStatusChange(params.row.id)} />
                    }

                </div>
            ),
        },
    ];

    // console.log("rows[0] ")
    // console.log(rows[0])

    return (
        <>

            <div style={{ display: "flex", justifyContent: "end", height: 210, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    disableColumnMenu
                    getRowClassName={(params) => params.row.state}
                    pagination={false}
                />

                {rows.length > 0 &&

                    <List dense={dense}>
                        <Typography sx={{ mt: 1, mb: 1, borderBottom: '1px solid #ccc' }} variant='h6'>
                            Notificações
                        </Typography>
                        <ListItem sx={{ borderBottom: '1px solid #ccc', backgroundColor: rows[0].state === 'unchecked' ? 'white' : '#ccc' }}
                            secondaryAction={

                                <div>
                                    {

                                        rows[0].state === 'unchecked' ?
                                            <VisibilityIcon
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleStatusChange(rows[0].id)}
                                            />
                                            :
                                            <VisibilityOffIcon
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleStatusChange(rows[0].id)} />
                                    }


                                </div>
                            }
                        >
                            <ListItemText
                                primary={rows[0].content}
                                secondary={secondary ? 'Secondary text' : null}
                            />
                        </ListItem>
                        <ListItem
                            sx={{ backgroundColor: rows[1].state === 'unchecked' ? 'white' : '#ccc' }}
                            secondaryAction={

                                <div>
                                    {

                                        rows[1].state === 'unchecked' ?
                                            <VisibilityIcon
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleStatusChange(rows[1].id)}
                                            />
                                            :
                                            <VisibilityOffIcon
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleStatusChange(rows[1].id)} />
                                    }


                                </div>
                            }
                        >
                            <ListItemText
                                primary={rows[1].content}
                                secondary={secondary ? 'Secondary text' : null}
                            />
                        </ListItem>

                    </List>
                }

            </div>
        </>
    );

}; 