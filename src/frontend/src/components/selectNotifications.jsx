import * as React from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const SelectNotifications = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
            <Box sx={{ minWidth: 120, m: 1.5 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Filtro</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Tipo"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Todos</MenuItem>
                        <MenuItem value={10}>Pendente</MenuItem>
                        <MenuItem value={20}>Info</MenuItem>
                        <MenuItem value={30}>Feito</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <button>Export to Excel</button>

        </Box>
    );
}

export default SelectNotifications; 