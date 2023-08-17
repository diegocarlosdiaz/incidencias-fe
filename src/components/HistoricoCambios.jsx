import React, { useEffect } from 'react'
import { Card, Divider, Grid, Stack, Typography } from '../../node_modules/@mui/material/index'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useDispatch, useSelector } from '../../node_modules/react-redux/es/exports';
import { getHistoricoCambios } from 'service/HistoricoCambios';

export const HistoricoCambios = ({ values }) => {

    
    

   

    return (
        <>

            

                <Card sx={{ padding: 4, backgroundColor: '#e6e6e6', maxWidth: '83%' }}>
                    <Stack direction="row" sx={{ alignItems: 'flex-start' }} spacing={0.3}>
                        <Typography>Cambiado por</Typography><AccountBoxIcon color="primary" fontSize='small' /> <Typography>{values.responsable} - {values.fechaActualizacion}</Typography>
                    </Stack>
                    <Grid container justifyContent='space-between' py={3}>

                        <Grid container>
                            <Grid pb={1} item xs={4}><Typography textAlign='center' variant='h5' sx={{ fontSize: '0.875rem;' }}>Campo</Typography></Grid>
                            <Grid item xs={4}><Typography textAlign='center' variant='h5' sx={{ fontSize: '0.875rem;' }}>Valor original</Typography></Grid>
                            <Grid item xs={4}><Typography textAlign='center' variant='h5' sx={{ fontSize: '0.875rem;' }}>Valor nuevo</Typography></Grid>
                        </Grid>

                        <Grid container pt={3}>
                            <Grid item xs={4}><Typography>Campo</Typography></Grid>
                            <Grid item xs={4}><Typography>Valor original</Typography></Grid>
                            <Grid item xs={4}><Typography>Valor nuevo</Typography></Grid>
                        </Grid>
                    </Grid>
                </Card>

        
        </>
    )
}
