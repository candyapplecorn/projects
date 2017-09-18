import { RECEIVE_A_POKEMON } from '../actions/pokemon_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_A_POKEMON:
      const newState = merge({}, state);
      newState.pokeDisplay = action.pokemon.id;
      return newState;
    default:
      return state;
  }
};
