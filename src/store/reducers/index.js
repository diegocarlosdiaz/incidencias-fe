// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import estados from 'service/Estados';
import historialDeCambios from 'service/HistoricoCambios';

// ==============================|| COMBINE REDUCERS ||============================== //
const reducers = combineReducers({ menu, estados, historialDeCambios});

export default reducers;
