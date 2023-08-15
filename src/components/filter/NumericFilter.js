import * as React from 'react';
import { Grid, FormControl, TextField, FormHelperText, Autocomplete, } from '@mui/material';

export function NumericFilter ( props ){
    return (
        <>
            <Grid item xs={8} md={4} sx={{ mt:1 }}>
                <FormControl sx={{minWidth: '100%' }}>
                    <TextField
                    id="outlined-filter-value"
                    label="Igual"
                    variant="outlined"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={8} md={4} sx={{ mt:1 }}>
                <FormControl sx={{minWidth: '100%' }}>
                    <TextField
                    id="outlined-filter-value"
                    label="Desde"
                    variant="outlined"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={8} md={4} sx={{ mt:1 }}>
                <FormControl sx={{minWidth: '100%' }}>
                    <TextField
                    id="outlined-filter-value"
                    label="Hasta"
                    variant="outlined"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={24} md={12} sx={{ mt:1 }}>
                <FormControl sx={{minWidth: '100%' }}>
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={[]}
                        freeSolo
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            variant="outlined"
                            label="Rango de valores"
                            />
                        )}
                    />
                    <FormHelperText>Ingrese un valor y añadalo al rango con Enter</FormHelperText>
                </FormControl>
            </Grid>
        </>
    )
};