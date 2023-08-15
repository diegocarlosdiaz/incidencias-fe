import * as React from 'react';
import { Button, IconButton, TextField, Badge, Modal,Box, FormControl,
Grid, Card, Divider, CardHeader, CardContent, CardActions } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {EntityFilter} from './EntityFilter';
import 'dayjs/locale/en-gb';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { WithNullFilter } from './WithNullFilter';

export default function AdvancedFilter ( props ) {

  const { columns, filters, setFilters, setOpen, submit } = props;

  dayjs.extend(customParseFormat)

  const DATE_FORMAT = 'YYMMDD'
  const LOCALE = 'en-gb'

  const handleSubmit = () => {
    submit()
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClear = () => {
    setFilters([]);
  };

  const handleChange = (event) => {
    const updatedFilters = [...filters];
    const filterIndex = updatedFilters.findIndex((obj) => obj.filter === event.target.id);
  
    if (filterIndex >= 0) {
      if (event.target.value !== '') {
        updatedFilters[filterIndex].value = event.target.value;
      } else {
        updatedFilters.splice(filterIndex, 1);
      }
    } else {
      updatedFilters.push({ filter: event.target.id, value: event.target.value });
    }
  
    setFilters(updatedFilters);
  };

  const handleChangeDate = (filterId, date) => {
    const updatedFilters = [...filters];
    const filterIndex = updatedFilters.findIndex((obj) => obj.filter === filterId);
  
    if (filterIndex >= 0) {
      if (date !== null) {
        const formattedDate = dayjs(date).format(DATE_FORMAT);
        updatedFilters[filterIndex].value = formattedDate;
      } else {
        updatedFilters.splice(filterIndex, 1);
      }
    } else {
      const formattedDate = dayjs(date).format(DATE_FORMAT);
      updatedFilters.push({ filter: filterId, value: formattedDate });
    }
  
    setFilters(updatedFilters);
  };

  return (
    <Box>
        <Card sx={style} id="advance-filter-card">
          <CardHeader id="advance-filter-card-header" titleTypographyProps={{ variant: 'subtitle1' }} title='Filtros Avanzados'  action={<IconButton aria-label="Cerrar" onClick={handleClose}><CloseOutlinedIcon /></IconButton>} />
          <Divider id="advance-filter-divider" />
          <CardContent id="advance-filter-card-content">
            <Box id="advance-filter-box">
              <Grid container spacing={1} component="form" sx={{ p: 0.5 }} key="advances-filter">
                {columns.map((column) => (
                  <>
                    { column.type == 'string' && 
                      <Grid item xs={6} md={3} sx={{ mt:1 }}>
                        <FormControl sx={{minWidth: '100%' }}>
                              <TextField
                                id={column.field + ".contains"}
                                key={column.field + ".contains"}
                                label={column.headerName}
                                variant="outlined"
                                onChange={handleChange}
                                value={filters.find((element) => element.filter === column.field + ".contains")?.value || ''}
                              />
                          </FormControl>
                      </Grid> 
                    }
                    { column.type == 'entity' && 
                      <Grid item xs={6} md={3} sx={{ mt:1 }}>
                        <EntityFilter column={column} filters={filters} setFilters={setFilters}/>
                      </Grid> 
                    }
                    { column.type == 'withNullFilter' && 
                      <Grid item xs={6} md={3} sx={{ mt:1 }}>
                        <WithNullFilter column={column} filters={filters} setFilters={setFilters}/>
                      </Grid> 
                    }
                    { column.type == 'numeric' && 
                      <>
                        <Grid item xs={6} md={3} sx={{ mt:1 }}>
                            <FormControl sx={{minWidth: '100%' }}>
                                <TextField
                                  id={column.field + ".equals"}
                                  key={column.field + ".equals"}
                                  label={column.headerName}
                                  type="number"
                                  variant="outlined"
                                  onChange={handleChange}
                                  value={filters.find((element) => element.filter === column.field + ".equals")?.value || ''}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={3} sx={{ mt:1 }}>
                            <FormControl sx={{minWidth: '100%' }}>
                                <TextField
                                  id={column.field + ".greaterThanOrEqual"}
                                  key={column.field + ".greaterThanOrEqual"}
                                  label={column.headerName + " - Desde"}
                                  type="number"
                                  variant="outlined"
                                  onChange={handleChange}
                                  value={filters.find((element) => element.filter === column.field + ".greaterThanOrEqual")?.value || ''}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={3} sx={{ mt:1 }}>
                            <FormControl sx={{minWidth: '100%' }}>
                                <TextField
                                  id={column.field + ".lessThanOrEqual"}
                                  key={column.field + ".lessThanOrEqual"}
                                  label={column.headerName + " - Hasta"}
                                  type="number"
                                  variant="outlined"
                                  onChange={handleChange}
                                  value={filters.find((element) => element.filter === column.field + ".lessThanOrEqual")?.value || ''}
                                />
                            </FormControl>
                        </Grid>
                    </>
                    }
                    {
                      column.type == 'date' && 
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={LOCALE}>
                        <Grid item xs={6} md={3} sx={{ mt:1 }}>
                          <FormControl sx={{minWidth: '100%' }}>
                              <DatePicker
                                id = {column.field + ".equals"}
                                key = {column.field + ".equals"}
                                label={column.headerName}
                                onChange={(date) => handleChangeDate(column.field + ".equals", date)}
                                slotProps={{
                                    actionBar: { actions: ['clear','ok'] },
                                  }}
                                value={filters.some((element) => element.filter === column.field + ".equals") ? 
                                  dayjs('20'+filters.find((element) => element.filter === column.field + ".equals")?.value, 'YYYYMMDD') : null}
                              />
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} md={3} sx={{ mt:1 }}>
                          <FormControl sx={{minWidth: '100%' }}>
                              <DatePicker
                                id = {column.field + ".greaterThanOrEqual"}
                                key = {column.field + ".greaterThanOrEqual"}
                                label={column.headerName + "- Desde"}
                                onChange={(date) => handleChangeDate(column.field + ".greaterThanOrEqual", date)}
                                slotProps={{
                                    actionBar: { actions: ['clear'] },
                                  }}
                                value={filters.some((element) => element.filter === column.field + ".greaterThanOrEqual") ? 
                                  dayjs('20'+filters.find((element) => element.filter === column.field + ".equals")?.value, 'YYYYMMDD') : null}
                              />
                              
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} md={3} sx={{ mt:1 }}>
                          <FormControl sx={{minWidth: '100%' }}>
                              <DatePicker
                                id = {column.field + ".lessThanOrEqual"}
                                key = {column.field + ".lessThanOrEqual"}
                                label={column.headerName + "- Hasta"}
                                onChange={(date) => handleChangeDate(column.field + ".lessThanOrEqual", date)}
                                slotProps={{
                                    actionBar: { actions: ['clear'] },
                                  }}
                                value={filters.some((element) => element.filter === column.field + ".lessThanOrEqual") ? 
                                  dayjs('20'+filters.find((element) => element.filter === column.field + ".equals")?.value, 'YYYYMMDD') : null}
                              />
                          </FormControl>
                        </Grid>
                      </LocalizationProvider>
                    }
                  </>
                ))}
              </Grid>
            </Box>
          </CardContent>
          <CardActions sx={{display: 'flex', justifyContent: 'flex-end', width: '100%' }} id="advance-filter-card-actions">
            <Button id="advance-filter-action-clear" size="medium" onClick={handleClear}>Limpiar Filtros</Button>
            <Button id="advance-filter-action-apply" size="medium" onClick={handleSubmit}>Aplicar</Button>
          </CardActions>
        </Card>
    </Box>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  maxHeight: '60%',
  overflow: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 12
};