import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

export default function AlertERROR({ setError }) {
  const [showAlert, setShowAlert] = React.useState(true);

  const handleCloseAlert = () => {
    setShowAlert(false);
    setError(false);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
      {showAlert && (
        <Alert
          key='Error'
          sx={{ alignItems: 'flex-start' }}
          startDecorator={React.cloneElement(<CheckCircleIcon /> , {
            sx: { mt: '2px', mx: '4px' },
            fontSize: 'xl2',
          })}
          variant="soft"
          color='danger'
          endDecorator={
            <IconButton variant="soft" size="sm" color='danger' onClick={handleCloseAlert} >
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          <div>
            <Typography fontWeight="lg" mt={0.25}>
              Erro
            </Typography>
            <Typography fontSize="sm" sx={{ opacity: 0.8 }}>
              Algo deu errado. Verifique as informações inseridas e, se o erro persistir, peça ajuda a um administrador.
            </Typography>
          </div>
        </Alert>
      )}
    </Box>
  );
}
