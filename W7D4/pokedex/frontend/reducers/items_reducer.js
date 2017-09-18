import { RECEIVE_A_POKEMON } from '../actions/pokemon_actions';
import { merge, values } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_A_POKEMON:
      const { items } = action;
      const itemsObj = {};
      items.forEach( item => (itemsObj[item.id] = item) );

      const newState = merge({}, state, itemsObj);
      return newState;
    default:
      return state;
  }
};
