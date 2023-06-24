import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/joy/Typography';
import Switch from '@mui/material/Switch';

export default function AIButton(props) {
  const handleChange = () => {
      props.updateIsAI(!props.isAI);
      console.log(props.isAI);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 200, alignItems: 'center' }}>
      <Typography sx={{ marginBottom: '10px' }}>
        <strong>IA</strong>
      </Typography>

      <Switch 
        checked={props.isAI}
        onChange={handleChange}
        sx={{
            '& .MuiSwitch-thumb': {
              bgcolor: props.isAI ? 'black' : 'grey.300',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: 'black',
            },
            '& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb': {
              backgroundColor: 'black',
            },
          }} />
    </Box>
  );
}
