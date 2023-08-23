import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from '../../../node_modules/react-router-dom/dist/index'
import incidencias from 'utils/Incidencias';
import { Button, Divider, Grid, Stack, TextField, Typography } from '../../../node_modules/@mui/material/index';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import { EditModal } from 'components/EditModal';
import { HistoricoCambios } from 'components/HistoricoCambios';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import { getHistoricoCambios } from 'service/HistoricoCambios';


export const DetalleIncidencia = ({}) => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const handleOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
    console.log("Deberia abrir el modal")
  };
  const handleClose = () => {
    setOpen(false);
    console.log("deberia cerrarse")
  };

  const descriptionElementRef = useRef(null);

  const data = useSelector((state) => state.historialDeCambios.entities)
  const error = useSelector((state) => state.historialDeCambios.error)
  const isLoading = useSelector((state) => state.historialDeCambios.isLoading)
  
  const dispatch = useDispatch();
  useEffect(() => {
  if(!isLoading) {
  dispatch(getHistoricoCambios());
  console.log(data);
  }
  }, [])

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  /* if(error){
    return(
      error
    )
  } */
  
  return (
    <>
      <Grid p={3}>
        {
          incidencias.map((i) => (
            i.id == id &&
            <React.Fragment key={i.id}>
              <Grid justifyContent='space-between' container pb={3}>
                <Grid>
                  <Typography color='primary'>{i.codigo}/</Typography>
                  <Typography variant='h3'>{i.resumen}</Typography>
                </Grid>
                <Grid >
                  <Grid >
                    <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {i.id} de {incidencias.length}
                      <Link to={`/detalle/${i.id > 1 ? i.id - 1 : i.id}`}> <ArrowDropUpIcon fontSize='large' /> </Link>
                      <Link to={`/detalle/${i.id < incidencias.length ? i.id + 1 : i.id}`}> <ArrowDropDownIcon fontSize='large' /> </Link>
                    </Typography>
                  </Grid>
                  <Link to='/principal'><Typography color='primary'>Volver a la búsqueda</Typography></Link>
                </Grid>
              </Grid>
              <Divider />
              <Stack direction="row" spacing={2} py={3}>

                <Button variant='outlined' onClick={handleOpen('paper')}><EditIcon fontSize='small' /><Typography pl={0.5}>Editar</Typography></Button>
                <EditModal isOpen={open} scroll={scroll} values={i} handleClose={handleClose} />
                <Button variant='outlined'><CommentIcon fontSize='small' /><Typography pl={0.5}>Comentar</Typography></Button>
                <Button color='inherit' variant='outlined'><Typography>Cerrar incidencia</Typography></Button>
                <Button color='inherit' variant='outlined'><Typography>Reabrir incidencia</Typography></Button>
                <Button color='inherit' variant='outlined'><Typography>Resolver incidencia</Typography></Button>
              </Stack>
              <Divider />
              <Grid container pt={5}>
                <Grid item xs={8}>
                  <Typography variant='h5' pb={3}>
                    Detalles
                  </Typography>
                  <Grid container item xs={12}>
                    <Grid xs={2}>
                      <Typography pb={1} sx={{ color: 'gray' }}>Tipo:</Typography>
                      <Typography pb={1} sx={{ color: 'gray' }}>Prioridad:</Typography>
                    </Grid>
                    <Grid xs={3}>
                      <Typography pb={1} >{i.tipo}</Typography>
                      <Typography pb={1} > {i.prioridad}</Typography>
                    </Grid>
                    <Grid xs={2}>
                      <Typography pb={1} sx={{ color: 'gray' }}>Estado:</Typography>
                      <Typography pb={1} sx={{ color: 'gray' }}>Resolución:</Typography>
                    </Grid>
                    <Grid xs={3}>
                      <Typography pb={1} >{i.estado}</Typography>
                      <Typography pb={1} > {i.resolucion}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid xs={2}>
                      <Typography pb={1} sx={{ color: 'gray' }}>Versión(es) Afectada(s):</Typography>
                    </Grid>
                    <Grid xs={3}>
                      <Typography pb={1} >{i.versionAfectada}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid xs={2}>
                      <Typography pb={1} sx={{ color: 'gray' }}>Se tomará acción: </Typography>
                    </Grid>
                    <Grid xs={3}>
                      <Typography pb={1} >{i.tomaAccion}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='h5' pb={3}>
                    Personas
                  </Typography>
                  <Grid container item xs={12}>
                    <Grid xs={5}>
                      <Typography pb={1} sx={{ color: 'gray' }}>Responsable:</Typography>
                      <Typography pb={1} sx={{ color: 'gray' }}>Informador:</Typography>
                      <Typography pb={1} sx={{ color: 'gray' }}>Votos:</Typography>
                      <Typography pb={1} sx={{ color: 'gray' }}>Observadores:</Typography>
                    </Grid>
                    <Grid xs={6}>
                      <Typography pb={1} >{i.responsable}</Typography>
                      <Typography pb={1} > {i.informador}</Typography>
                      <Typography pb={1} >0</Typography>
                      <Typography pb={1} >0</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant='h5' py={3}>
                    Descripcion
                  </Typography>
                  <Typography pr={20}>
                    {i.descripcion}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='h5' py={3}>
                    Fechas
                  </Typography>
                  <Grid container item xs={12}>
                    <Grid xs={5}>
                      <Typography pb={1} sx={{ color: 'gray' }}>Creada:</Typography>
                      <Typography pb={1} sx={{ color: 'gray' }}>Actualizada:</Typography>
                    </Grid>
                    <Grid xs={6}>
                      <Typography pb={1} >{i.fechaCreacion}</Typography>
                      <Typography pb={1} > {i.fechaActualizacion}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant='h5' py={3}>
                    Historico de cambios
                  </Typography>
                  <HistoricoCambios values={i} />
                </Grid>
              </Grid>
            </React.Fragment>
          ))
        }
      </Grid>
    </>
  )

}
