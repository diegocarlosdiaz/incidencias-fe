// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import estados from 'service/Estados';





// ==============================|| COMBINE REDUCERS ||============================== //
const reducers = combineReducers({ menu, estados});

export default reducers;
