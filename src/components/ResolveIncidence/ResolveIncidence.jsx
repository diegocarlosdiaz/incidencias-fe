import React, { useEffect, useRef, useState } from 'react'
import { Campo } from 'components/Campo'
import { Button, Dialog, DialogActions, DialogContent, FormControlLabel, Grid, Radio, Typography } from '../../../node_modules/@mui/material/index'
import { ResolveIncidenceButton } from './ResolveIncidenceButton';
import { ResolveIncidenceModal } from './ResolveIncidenceModal';

export const ResolveIncidence = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <ResolveIncidenceButton onClick={handleOpen}/>
            <ResolveIncidenceModal open={open} handleClose={handleClose}/>
        </>
    )
}
