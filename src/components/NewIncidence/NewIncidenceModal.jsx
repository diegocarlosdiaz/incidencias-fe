import React, { useEffect, useRef, useState } from 'react'
import { Campo } from 'components/Campo'
import { Button, Dialog, DialogActions, DialogContent, FormControlLabel, Grid, Radio, Typography } from '../../../node_modules/@mui/material/index'



export const NewIncidenceModal = ({open, handleClose}) => {
    return (
        <>
            <Dialog
              open={open} 
              onClose={handleClose}

            aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth="md"
                
            >
                <Typography variant='h4' p={3}>Nueva Incidencia</Typography>
                <DialogContent dividers={scroll === 'paper'}>


                    <Grid container>
                        <Grid xs={8}>
                            <Campo label="Tipo de incidencia: " input='select' />
                            <Campo label="Responsable: " input='select' />
                            <Campo label="Informador: " />
                            <Campo label="Versión(es) Afectadas: " input='select' />
                            <Campo label="Resumen: " />
                            <Campo label="Descripción: " input='textarea' />
                            <Campo label="Comentario: " input='textarea' />
                            <Campo label="Tipo de acción: " input='radio-group'>
                                <FormControlLabel sx={{ minWidth: 272 }} value="Accion Preventiva" control={<Radio />} label="Accion Preventiva" />
                                <FormControlLabel sx={{ minWidth: 272 }} value="Accion Correctiva" control={<Radio />} label="Accion Correctiva" />
                            </Campo>
                            <Campo label="Analisis de causa: " input='textarea' />
                            <Campo label="Accion a tomar: " input='textarea' />
                            <Campo label="Fecha limite accion a tomar: " input='date' />
                            <Campo label="Verificacion de accion: " input='textarea' />
                            <Campo label="Responsable verificacion accion: "  />
                            <Campo label="Fecha verificacion accion: " input='date' />
                            <Campo label="Verificacion efectividad de accion: " input='textarea' />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose}>Cerrar</Button>
                    <Button color='success' variant='contained' onClick={handleClose}>Enviar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
