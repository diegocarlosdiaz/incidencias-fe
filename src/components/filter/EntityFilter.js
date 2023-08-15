import * as React from 'react';
import { MenuItem, FormControl, Select, InputLabel, ListItemIcon, Checkbox, ListItemText, Stack, Chip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { filter, update } from 'lodash';

export function EntityFilter(props) {
    const { column, filters, setFilters } = props;
    const [selected, setSelected] = React.useState([]);
    const label = React.useRef('');
    const [allSelected, setAllSelected] = React.useState(false);
    const data = column.data ? column.data : [];
    const filterId = column.filterName ? column.filterName + '.in' : column.filter + '.in';
    const dispatch = useDispatch();

    const handleChange = (event, dependsDispatch) => {
        let value = event.target.value;
        const option = value.pop();

        if (option == 'all') {
            if (allSelected) {
                setAllSelected(false);
                value = [];
            } else {
                setAllSelected(true);
                value = data;
            }
        } else {
            if (value.length == 0) {
                const entity = data.find((element) => element.id == option);
                value.push(entity);
            } else {
                const exist = value.some((element) => element.id == option);
                if (exist) {
                    value = value.filter((element) => element.id !== option);
                    if (allSelected) {
                        setAllSelected(false);
                    }
                } else {
                    value.push(data.find((element) => element.id == option));
                }
            }
        }
        label.current = value.length >= 0 ? value.length + ' opcion/es seleccionadas' : '';
        setSelected(value);
        if (dependsDispatch !== null && typeof dependsDispatch === 'function') {
            const values = value.map((element) => element.id).join(',');
            let params = {};
            params[filterId] = values;
            if (value.length > 0) {
                dependsDispatch(params);
            } else {
                dependsDispatch();
            }
        }
    };

    const handleClose = (event) => {
        let updatedFilters = [...filters];
        const filterIndex = updatedFilters.findIndex((obj) => obj.filter === filterId);
        const filterValue = selected.map((element) => element.id).join(',');

        if (filterIndex >= 0) {
            if (selected.length > 0) {
                updatedFilters[filterIndex].value = filterValue;
            } else {
                updatedFilters.splice(filterIndex, 1);
            }
        } else {
            if (selected.length > 0) {
                updatedFilters.push({ filter: filterId, value: filterValue });
            }
        }

        if (column.dependsColumns?.length > 0) {
            column.dependsColumns.map((columnName) => {
                updatedFilters = updatedFilters.filter((element) => element.filter !== columnName + '.in');
            });
        }
        setFilters(updatedFilters);
    };

    React.useEffect(() => {
        if (filters.length === 0) {
            label.current = '';
            setSelected([]);
            setAllSelected(false);
        } else {
            updateLabels();
        }
    }, [filters]);

    const updateLabels = () => {
        const updatedFilters = [...filters];
        const filterIndex = updatedFilters.findIndex((obj) => obj.filter === filterId);
        let options = [];

        if (filterIndex >= 0) {
            const values = updatedFilters[filterIndex].value.split(',');
            values.map((value) => {
                const obj = data.find((element) => element.id == value);
                if (obj !== null) options.push(obj);
            });
            if (options.length == data.length) setAllSelected(true);
            label.current = options.length >= 0 ? options.length + ' opcion/es seleccionadas' : '';
            setSelected(options);
        } else {
            label.current = '';
            setSelected([]);
            setAllSelected(false);
        }
    };

    return (
        <div style={{ flex: 1 }}>
            <FormControl sx={{ minWidth: '100%' }}>
                <InputLabel id={column.filter + '-label'}>{column.headerName}</InputLabel>
                <Select
                    id={filterId}
                    key={filterId}
                    variant="outlined"
                    multiple
                    onChange={(event) => handleChange(event, column.dependsDispatch)}
                    value={selected}
                    renderValue={(selected) => {
                        return label.current;
                    }}
                    onClose={handleClose}
                >
                    {data.length !== 0 ? (
                        <MenuItem value="all">
                            <ListItemIcon>
                                <Checkbox checked={allSelected} />
                            </ListItemIcon>
                            <ListItemText primary="Seleccionar todos" />
                        </MenuItem>
                    ) : (
                        <MenuItem disabled value="all">
                            <ListItemText primary="No hay opciones disponibles" />
                        </MenuItem>
                    )}
                    {data.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            <ListItemIcon key={option.id + 'icon'}>
                                <Checkbox key={option.id + 'checkbox'} checked={selected.indexOf(option) >= 0} />
                            </ListItemIcon>
                            <ListItemText key={option.id + 'text'} primary={option.descripcion} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
