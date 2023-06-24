import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar(props) {
    const handleChange = e => {
        props.updateFilter(e.target.value)
    }
    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <TextField
                id="input-with-icon-textfield"
                label=""
                placeholder="Pesquisar roteador"
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                variant="standard"
            />
        </Box>
    );
}