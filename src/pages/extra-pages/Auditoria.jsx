import React, { useEffect } from 'react'
import registros from 'utils/Auditoria'
import { getHistoricoCambios } from 'service/HistoricoCambios';
import { useDispatch, useSelector } from 'react-redux';
import CompenenteReporte from 'components/reports/CompenenteReporte';
import { Button, Grid } from '../../../node_modules/@mui/material/index';
import ImportExportTwoToneIcon from '@mui/icons-material/ImportExportTwoTone';

const columns = [
		
    {
        field: "usuario",
        headerName: "Usuario",    
        simpleFilter: false,
        type: "string",
        editable: false,
        disableColumnMenu: true,
    },
    {
        field: "fecha",
        headerName: "Fecha",    
        simpleFilter: true,
        type: "string",
        editable: false,
        disableColumnMenu: true,
    },
    {
        field: "horaEntrada",
        headerName: "Hora entrada",    
        simpleFilter: false,
        type: "string",
        editable: false,
        disableColumnMenu: true,
    },
    {
        field: "horaSalida",
        headerName: "Hora Salida",    
        simpleFilter: false,
        type: "string",
        editable: false,
        disableColumnMenu: true,
    },
    {
        field: "acceso",
        headerName: "Acceso",    
        simpleFilter: false,
        type: "string",
        editable: false,
        disableColumnMenu: true,
    },
]

export const Auditoria = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.historialDeCambios.isLoading);
    const totalItems = useSelector((state) => state.historialDeCambios.totalItems);
    const error = useSelector((state) => state.historialDeCambios.error);

    useEffect(() => {

        dispatch(getHistoricoCambios({}))
        console.log("llamado a la api")

    }, []);
    
    return (
        <>
            <Grid container justifyContent='space-between' py={3} sx={{ alignItems: 'center' }}>
                <h3>Auditoria</h3>
                <Button variant='contained' color="success" py={0} sx={{ height: 40 }}>Exportar<ImportExportTwoToneIcon /></Button>
            </Grid>
            <CompenenteReporte
                columns={columns}
                rows={registros}
                dispatch={dispatch}
                getEntities={getHistoricoCambios}
                isLoading={isLoading}
                error={error}
                totalItems={totalItems}
            >
            </ CompenenteReporte>
        </>

    )
}
