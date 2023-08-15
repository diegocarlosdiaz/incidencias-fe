import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { EntityFilter } from './EntityFilter';

function SimpleFilters(props) {
    const DATE_FORMAT = 'YYMMDD';
    const LOCALE = 'en-gb';

    const { columns, filters, setFilters, submit } = props;

    const handleChange = (event) => {
        const updatedFilters = [...filters];
        const filterIndex = updatedFilters.findIndex((obj) => obj.filter === event.target.id);
        if (filterIndex >= 0) {
            event.target.value !== '' ? (updatedFilters[filterIndex].value = event.target.value) : updatedFilters.splice(filterIndex, 1);
        } else {
            updatedFilters.push({ filter: event.target.id, value: event.target.value });
        }
        setFilters(updatedFilters);
    };

    const handleChangeDate = (filterId, date) => {
        const updatedFilters = [...filters];
        const filterIndex = updatedFilters.findIndex((obj) => obj.filter === filterId);

        if (filterIndex >= 0) {
            date !== null ? (updatedFilters[filterIndex].value = dayjs(date).format(DATE_FORMAT)) : updatedFilters.splice(filterIndex, 1);
        } else {
            updatedFilters.push({ filter: filterId, value: dayjs(date).format(DATE_FORMAT) });
        }
        setFilters(updatedFilters);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'space-between',
                gap: '10px'
            }}
        >
            {columns.map((column) => (
                <>
                    {column.type == 'string' && column.simpleFilter && (
                        <FormControl sx={{ flex: 1 }}>
                            <TextField
                                id={column.field + '.contains'}
                                key={column.field + '.contains'}
                                label={column.headerName}
                                variant="outlined"
                                onChange={handleChange}
                                value={filters.find((element) => element.filter === column.field + '.contains')?.value || ''}
                            />
                        </FormControl>
                    )}
                    {column.type == 'numeric' && column.simpleFilter && (
                        <FormControl sx={{ flex: 1 }}>
                            <TextField
                                id={column.field + '.equals'}
                                key={column.field + '.equals'}
                                label={column.headerName}
                                type="number"
                                onChange={handleChange}
                                value={filters.find((element) => element.filter === column.field + '.equals')?.value || ''}
                            />
                        </FormControl>
                    )}

                    {column.type == 'date' && column.simpleFilter && (
                        <FormControl sx={{ flex: 1 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={LOCALE}>
                                <DatePicker
                                    id={column.field + '.equals'}
                                    key={column.field + '.equals'}
                                    label={column.headerName}
                                    onChange={(date) => handleChangeDate(column.field + '.equals', date)}
                                    slotProps={{
                                        actionBar: { actions: ['clear', 'ok'] }
                                    }}
                                    value={
                                        filters.some((element) => element.filter === column.field + '.equals')
                                            ? dayjs(
                                                  '20' + filters.find((element) => element.filter === column.field + '.equals')?.value,
                                                  'YYYYMMDD'
                                              )
                                            : null
                                    }
                                />
                            </LocalizationProvider>
                        </FormControl>
                    )}

                    {column.type == 'entity'  && column.simpleFilter && <EntityFilter column={column} filters={filters} setFilters={setFilters} />}
                </>
            ))}

            <Button sx={{ flex: 1 }} variant="contained" onClick={() => submit()}>
                Buscar
            </Button>
        </Box>
    );
}

export default SimpleFilters;
