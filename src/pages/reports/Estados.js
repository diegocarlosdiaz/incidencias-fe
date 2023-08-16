import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEstados } from "service/Estados";


import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import CompenenteReporte from "../../components/reports/CompenenteReporte";
dayjs.extend(customParseFormat)


const Estados = () => {


    const dispatch = useDispatch()
    
    //const rows = useSelector((state) => state.estados.entities);
    const rows = useSelector((state) => state.estados.entities)
    console.log(rows)
    const isLoading = useSelector((state) => state.estados.isLoading);
    const error = useSelector((state) => state.estados.error);
    const totalItems = useSelector((state) => state.estados.totalItems);


    const columns = [
		{
            field: "id",
            headerName: "#",    
            simpleFilter: true,
            type: "numeric",
            editable: false,
            disableColumnMenu: true,
        },
        {
            field: "codigo",
            headerName: "Código",    
            simpleFilter: true,
            type: "string",
            editable: false,
            disableColumnMenu: true,
        },
        {
            field: "descripcion",
            headerName: "Descripción",    
            simpleFilter: true,
            type: "string",
            editable: false,
            disableColumnMenu: true,
        },
    ];

    console.log()

    return (
        <CompenenteReporte
            columns={columns}
            rows={rows}
            totalItems={totalItems}
            isLoading={isLoading}
            error={error}
            dispatch={dispatch}
            title="Estados"
            getEntities={getEstados}
        ></CompenenteReporte>
    )
}

export default Estados