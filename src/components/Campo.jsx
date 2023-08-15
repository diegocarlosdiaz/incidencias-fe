import React from 'react'
import { MenuItem, RadioGroup, Select, Stack, TextField, TextareaAutosize, Typography } from '../../node_modules/@mui/material/index'
import { styled } from '@mui/system';

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };
const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    min-width: 280px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

export const Campo = ({label, input, children, required}) => {
  return (
    <>
        <Stack direction='row' alignItems='center' justifyContent='space-between' py={2}>
            <Typography color='gray'>{label}</Typography>
            {input == "select"
            ?
            <Select sx={{minWidth:280}}>
                <MenuItem value={10}>Value</MenuItem>
            </Select>
            : 
            input == "textarea" 
            ?
            <StyledTextarea minRows={4}/>
            :
            input == 'radio-group'
            ?
            <RadioGroup>{children}</RadioGroup>
            :
            input == 'date'
            ?
            <TextField
                      id="date"
                      type="date"
                      defaultValue="2017-05-24"
                      sx={{ width: 280 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
            :
            <TextField sx={{minWidth:280}}/>
            }
        </Stack>
    </>
  )
}
