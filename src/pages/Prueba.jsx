import React, { useEffect } from 'react'
import { useDispatch, useSelector } from '../../node_modules/react-redux/es/exports';
import { getHistoricoCambios } from 'service/HistoricoCambios';

export const Prueba = () => {

    const data = useSelector((state) => state.historialDeCambios.entities)
    const data1 = useSelector((state) => state.estados.entities)
    const isLoading = useSelector((state) => state.historialDeCambios.isLoading);
    const error = useSelector((state) => state.historialDeCambios.error);
    const dispatch = useDispatch()
  
    useEffect(() => {
       
        dispatch(getHistoricoCambios({}))
        console.log("llamado a la api")
        
    }, []);
  
    console.log(data)
  return (
    <div>Prueba</div>
  )
}
