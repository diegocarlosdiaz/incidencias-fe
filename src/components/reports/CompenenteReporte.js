import React, { useEffect, useState } from 'react';

import SimpleFilters from 'components/filter/SimpleFilters';
import MainCard from 'components/MainCard';
import AdvancedFilters from 'components/filter/AdvancedFilters';
import ExportButton from 'components/ExportButton';
import CustomNoRowsOverlay from 'components/reports/CustomNoRowsOverlay';
import Snackbar from '@mui/material/Snackbar';
import LinearProgress from '@mui/material/LinearProgress';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, Badge, Modal, Box } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport, esES } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useNavigate, useParams } from '../../../node_modules/react-router-dom/dist/index';
dayjs.extend(customParseFormat);

function CompenenteReporte(props) {
    const { columns, rows, totalItems, isLoading, error, dispatch, loadingExport, getEntities, getEntitiesCSV, title, method, handleRowClick } = props;

    //Paginado
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 15,
        page: 0
    });
    const handlePaginationChange = (newPaginationModel) => {
        setPaginationModel(newPaginationModel);
    };

    //Ordenamiento
    const [sortModel, setSortModel] = useState([]);
    const handleSortModelChange = (sortModel) => {
        setSortModel(sortModel);
    };

    //Filtros
    const [filters, setFilters] = useState([]);
    const [openFilterModal, setOpenFilterModal] = useState(false);

    useEffect(() => {
        submit();
    }, [paginationModel, sortModel]);

    const submit = () => {
        let queryParams = {};
        let sorts = '';
        sortModel.map((sort) => {
            if (sortModel.indexOf(sort) > 0) {
                sorts += ',' + sort.field + ':' + sort.sort;
            } else {
                sorts += sort.field + ':' + sort.sort;
            }
        });
        if (sorts !== '') queryParams['sort'] = sorts;
        filters.map((element) => (queryParams[element.filter] = element.value));
        Object.entries(paginationModel).forEach(([key, value]) => {
            queryParams[key] = value;
        });
        if (method) {
            dispatch(getEntities({ params: queryParams, method: method }));
        } else {
            dispatch(getEntities(queryParams));
        }
    };

    const handleExport = () => {
        let queryParams = {};
        filters.map((element) => (queryParams[element.filter] = element.value));
        if (method) {
            dispatch(getEntities({ params: queryParams, method: method }));
        } else {
            dispatch(getEntitiesCSV(queryParams));
        }
    };

    
    const CustomFilterIcon = () => {
        return (
            <Badge
                id="advance-filter-badge-icon"
                badgeContent={filters.length}
                invisible={filters.length == 0}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
            >
                <FilterListIcon id="advance-filter-icon" />
            </Badge>
        );
    };

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%'
                    }}
                >
                    <Button
                        variant="text"
                        color="primary"
                        size="small"
                        onClick={setOpenFilterModal}
                        startIcon={<CustomFilterIcon />}
                        id="advance-filter-button"
                    >
                        Filtros Avanzados
                    </Button>
                    <ExportButton isLoading={loadingExport} handleExport={handleExport} />
                </div>
            </GridToolbarContainer>
        );
    }

    //error snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [prevError, setPrevError] = useState(error);
    const handleClose = (event, reason) => {
        setOpenSnackbar(false);
    };
    useEffect(() => {
        if ((isLoading == true && prevError !== '') || (loadingExport == true && prevError !== '')) {
            setPrevError('');
        }

        if (error !== null && isLoading == false && prevError == '') {
            setOpenSnackbar(true);
            setPrevError(error);
        }

        if (error !== null && loadingExport == false && prevError == '') {
            setOpenSnackbar(true);
            setPrevError(error);
        }
    }, [isLoading, loadingExport]);

    const snackAction = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <MainCard title={title} sx={{ width: '100%' }}>
            <Box sx={{ height: '70vh', width: '100%' }}>
                <SimpleFilters columns={columns} filters={filters} setFilters={setFilters} submit={submit}></SimpleFilters>

                <DataGrid
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    sx={{
                        height: '100%',
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#F8F8F8',
                            border: 0.1,
                            borderColor: '#F8F8F8'
                        },
                        '& .MuiDataGrid-row': {
                            outline: '1px solid #ebebeb'
                        },'& .MuiDataGrid-cell': {
							flex: 1,
							//display: "block"
                        }
                    }}
                    rows={rows}
                    rowCount={Number(totalItems)}
                    columns={columns}
                    getRowId={(row) => rows.indexOf(row)}
                    slots={{
                        noRowsOverlay: CustomNoRowsOverlay,
                        loadingOverlay: LinearProgress,
                        toolbar: getEntitiesCSV ? CustomToolbar : null
                    }}
                    loading={isLoading}
                    filterMode="server"
                    onFilterModelChange={(model) => setFilterModel(model)}
                    paginationMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={handlePaginationChange}
                    sortingMode="server"
                    onSortModelChange={handleSortModelChange}
                    pageSizeOptions={[5, 10, 15]}
                    onRowClick={handleRowClick}
                    
                    
                />
                <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleClose} message={error} action={snackAction} />
                <Modal open={openFilterModal} id="advance-filter-modal">
                    <AdvancedFilters
                        columns={columns}
                        filters={filters}
                        setFilters={setFilters}
                        setOpen={setOpenFilterModal}
                        submit={submit}
                    />
                </Modal>
            </Box>
        </MainCard>
    );
}

  
export default CompenenteReporte;
