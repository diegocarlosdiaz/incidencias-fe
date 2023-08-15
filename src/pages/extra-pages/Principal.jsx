import CompenenteReporte from 'components/reports/CompenenteReporte';
import React from 'react'
import { useDispatch } from 'react-redux';
import { getEstados } from "service/Estados";
import columns from 'utils/Columns';
import { Button, Grid } from '../../../node_modules/@mui/material/index';
import incidencias from 'utils/Incidencias';
import AddIcon from '@mui/icons-material/Add';
import { Link } from '../../../node_modules/react-router-dom/dist/index';


const Principal = () => {
  const dispatch = useDispatch()
  
    return (
    
    <>
    <Grid container justifyContent='space-between' py={3} sx={{alignItems:'center'}}>
      <h3>Incidencias</h3>
      <Button variant='contained' py={0} sx={{height:40}}>Nueva Incidencia<AddIcon/></Button>
    </Grid>
      <CompenenteReporte
        columns={columns}
        rows={incidencias}
        dispatch={dispatch}
        getEntities={getEstados}
      >
      </ CompenenteReporte> 
    </>
     
  )
}

export default Principal;