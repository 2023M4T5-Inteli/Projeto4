import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/joy/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Typography from '@mui/joy/Typography';
import PropTypes from 'prop-types'; // Importe o módulo prop-types

export default function AlertSuccess({ setSuccess, type }) {
  const [showAlert, setShowAlert] = React.useState(true);

  const tipoModal = (type) => {
    switch (type) {
      case 'Colaborador':
        return 'Colaborador cadastrado com sucesso!';
      case 'Setor':
        return 'Setor cadastrado com sucesso!';
      case 'Roteador':
        return 'Roteador cadastrado com sucesso!';
      case 'Tablet':
        return 'Tablet cadastrado com sucesso!';
      default:
        return 'Sucesso!';
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setSuccess(false);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
      {showAlert && (
        <Alert
          key='Success'
          sx={{ alignItems: 'flex-start' }}
          startDecorator={React.cloneElement(<CheckCircleIcon />, {
            sx: { mt: '2px', mx: '4px' },
            fontSize: 'xl2',
          })}
          variant="soft"
          color='success'
          endDecorator={
            <IconButton variant="soft" size="sm" color='success' onClick={handleCloseAlert}>
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          <div>
            <Typography fontWeight="lg" mt={0.25}>
              Successo
            </Typography>
            <Typography fontSize="sm" sx={{ opacity: 0.8 }}>
              {tipoModal(type)}
            </Typography>
          </div>
        </Alert>
      )}
    </Box>
  );
}


AlertSuccess.propTypes = {
  type: PropTypes.string.isRequired,
};
