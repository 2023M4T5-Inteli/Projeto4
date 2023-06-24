import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Height } from '@mui/icons-material';

export default function SelectInterval(props) {

  const handleChange = (event) => {
    props.updateFilter(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth:"13%"}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Intervalo</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={handleChange}
        >
          {props.valores.map((valor) => {
            return(
              <MenuItem value={valor}>{valor} minutos</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
