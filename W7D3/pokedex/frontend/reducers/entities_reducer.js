import { combineReducers } from 'redux';
import pokemonReducer from './pokemon_reducer';

export default combineReducers({
  pokemon: pokemonReducer
});
