import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


function IncidenceButton({ onClick }) {
  //<Button variant='contained' py={0} sx={{height:40}}>Nueva Incidencia<AddIcon/></Button>
  return (
    <Button variant='contained' onClick={onClick} py={0} sx={{height:40}}><AddIcon fontSize='small' />
        Nueva Incidencia
    </Button>
  );
}

export default IncidenceButton;