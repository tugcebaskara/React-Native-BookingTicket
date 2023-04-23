import {combineReducers} from 'redux';
import SystemReducer from './system/SystemReducer';


export const rootReducer = combineReducers({
  system: SystemReducer,
});
