import * as React from 'react';
import { Grid, FormControl, TextField} from '@mui/material';

export function StringFilter ( props ){
    return (
        <Grid item xs={24} md={12} sx={{ mt:1 }}>
            <FormControl sx={{minWidth: '100%' }}>
                <TextField
                id="outlined-filter-string-value"
                label="Valor"
                variant="outlined"
                />
            </FormControl>
        </Grid>
    )
};