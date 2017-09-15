import { RECEIVE_ALL_POKEMON, RECEIVE_A_POKEMON } from '../actions/pokemon_actions';
import { merge, values } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_ALL_POKEMON:
      newState = merge({}, action.pokemon, state);
      return newState;
    case RECEIVE_A_POKEMON:
      newState = merge({}, state);
      const { pokemon, items } = action;
      const { id } = pokemon;
      pokemon.item_ids = values(items).map(i => i.id);
      newState[id] = pokemon;
      return newState;
    default:
      return state;
  }
};
