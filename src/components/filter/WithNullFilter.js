import * as React from 'react';
import { MenuItem, FormControl, Select, InputLabel, ListItemIcon, Checkbox, ListItemText, Stack, Chip } from '@mui/material';

export function WithNullFilter(props) {
    const { column, filters, setFilters } = props;
    const [selected, setSelected] = React.useState([]);
    const label = React.useRef('');
    const [allSelected, setAllSelected] = React.useState(false);
    const data = column.data ? column.data : [];
    const filterId = column.filterName ? column.filterName + '.in' : column.filter + '.in';
    const nullfilter = column.filterName ? column.filterName + '.orIsNull' : column.filter + '.orIsNull';

    const handleChange = (event) => {
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
                const entity = data.find((element) => element.value == option);
                value.push(entity);
            } else {
                const exist = value.some((element) => element.value == option);
                if (exist) {
                    value = value.filter((element) => element.value !== option);
                    if (allSelected) {
                        setAllSelected(false);
                    }
                } else {
                    value.push(data.find((element) => element.value == option));                      
                }
            }
        }
        label.current = value.length >= 0 ? value.length + ' opcion/es seleccionadas' : '';
        setSelected(value);
    };

    const handleClose = (event) => {
        let updatedFilters = [...filters];
        const filterIndex = updatedFilters.findIndex((obj) => obj.filter === filterId);
        const nullFilterIndex = updatedFilters.findIndex((obj) => obj.filter === nullfilter);
        let  values = selected;
        values = values.filter((element) => element.value !== "null")
        const filterValue = selected.length > 0 ? values.map((element) => element.value).join(',') : "";
        const nullValue = selected.find((element) => element.value == "null")

        if (filterIndex < 0 && filterValue !== "") {
            updatedFilters.push({ filter: filterId, value: filterValue });
        }

        if (filterIndex >= 0 && filterValue !== ""){
            updatedFilters[filterIndex].value = filterValue;
        }

        if( filterIndex >= 0 && filterValue == ""  ){
            updatedFilters.splice(filterIndex, 1);
        }

        if( nullFilterIndex < 0 && nullValue ){
            updatedFilters.push({ filter: nullfilter, value: true });
        }

        if( nullFilterIndex >= 0 && !nullValue ){
            updatedFilters.splice(nullfilter, 1);
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
        const nullFilterIndex = updatedFilters.findIndex((obj) => obj.filter === nullfilter);
        let options = [];

        if (nullFilterIndex >= 0) {
            let option = data.find((element) => element.value == "null");
            options.push(option)
        }

        if (filterIndex >= 0) {
            const values = updatedFilters[filterIndex].value.split(',');
            values.map((value) => {
                const obj = data.find((element) => element.value == value);
                if (obj !== null) options.push(obj);
            });
            
        } 

        if (options.length > 0) {
            if (options.length == data.length) 
                setAllSelected(true);
            label.current = options.length >= 0 ? options.length + ' opcion/es seleccionadas' : '';
            setSelected(options);
        }else{
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
                    onChange={handleChange}
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
                        <MenuItem key={option.value} value={option.value}>
                            <ListItemIcon key={option.value + 'icon'}>
                                <Checkbox key={option.value + 'checkbox'} checked={selected.indexOf(option) >= 0} />
                            </ListItemIcon>
                            <ListItemText key={option.value + 'text'} primary={option.label} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
