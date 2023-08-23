import CompenenteReporte from 'components/reports/CompenenteReporte';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getEstados } from "service/Estados";
import columns from 'utils/Columns';
import { Button, Grid } from '../../../node_modules/@mui/material/index';
import incidencias from 'utils/Incidencias';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import { useSelector } from '../../../node_modules/react-redux/es/exports';
import { getHistoricoCambios } from 'service/HistoricoCambios';
import { NewIncidence } from 'components/NewIncidence/NewIncidence';


const Principal = () => {
  const data = useSelector((state) => state.historialDeCambios.entities)
  const data1 = useSelector((state) => state.estados.entities)
  const isLoading = useSelector((state) => state.historialDeCambios.isLoading);
  const totalItems = useSelector((state) => state.historialDeCambios.totalItems);
  const error = useSelector((state) => state.historialDeCambios.error);
  const dispatch = useDispatch()

  useEffect(() => {
     
      dispatch(getHistoricoCambios({}))
      console.log("llamado a la api")
      
  }, []);

  const navigate = useNavigate()
  const handleRowClick = (params) => {
        console.log('Selected Row:', params.row);
        navigate(`/detalle/${params.row.id}`);
  } 

  console.log(data)
    return (
    
    <>
    <Grid container justifyContent='space-between' py={3} sx={{alignItems:'center'}}>
      <h3>Incidencias</h3>
      <NewIncidence />
      
    </Grid>
      <CompenenteReporte
        columns={columns}
        rows={incidencias}
        dispatch={dispatch}
        getEntities={getHistoricoCambios}
        isLoading={isLoading}
        error={error}
        totalItems={totalItems}
        handleRowClick={handleRowClick}
      >
      </ CompenenteReporte> 
    </>
     
  )
}

export default Principal;