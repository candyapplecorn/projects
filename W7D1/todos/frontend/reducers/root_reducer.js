/*
1. import all yo reducers
2. combine them with redux's combineReducers
3. export the mega-monster combined reducer
*/
import { combineReducers } from 'redux';
import todosReducer from './todos_reducers';

const reducers = {
  todos: todosReducer // can add more reducers for more slices of state
  //farmers: farmersReducer // can add more reducers for more slices of state
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
