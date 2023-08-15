import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function ExportButton ( props ){

    const {isLoading, handleExport} = props;

    return (
        <>
            <LoadingButton loading={isLoading} loadingPosition="start" variant="text" color="primary" size="small" onClick={handleExport} startIcon={<FileDownloadIcon />} id="export-button" disabled={isLoading} >
                Exportar
            </LoadingButton>
        </>
    )
};

 
