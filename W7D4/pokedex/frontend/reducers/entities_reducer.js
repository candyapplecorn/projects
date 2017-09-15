import { combineReducers } from 'redux';
import pokemonReducer from './pokemon_reducer';
import itemsReducer from './items_reducer';

export default combineReducers({
  pokemon: pokemonReducer,
  items: itemsReducer
});
