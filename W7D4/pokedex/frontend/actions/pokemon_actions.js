import APIUtils from '../util/api_utils';

export const RECEIVE_ALL_POKEMON = 'RECEIVE_ALL_POKEMON';
export const RECEIVE_A_POKEMON = "RECEIVE_A_POKEMON";

export const receiveAllPokemon = (pokemon) => ({
  type: RECEIVE_ALL_POKEMON,
  pokemon
});

export const requestAllPokemon = () => {
  return (dispatch) => {
    APIUtils.fetchAllPokemon()
            .then( pokemon => dispatch(receiveAllPokemon(pokemon)));
  };
};

export const receiveAPokemon = (payload) => ({
  type: RECEIVE_A_POKEMON,
  pokemon: payload.pokemon,
  items: payload.items
});

export const requestAPokemon = (id) => {
  return (dispatch) => {
    APIUtils.fetchAPokemon(id)
            .then( pokemon => dispatch(receiveAPokemon(pokemon)));
  };
};

export const createPokemon = pokemon => {
  return dispatch => {
    return APIUtils.createPokemon(pokemon)
            .then(newPokemon => dispatch(receiveAPokemon(newPokemon)));
  };
};

window.createPokemon = APIUtils.createPokemon;

/*
 let p = {
 name: 'blah',
 attack: 9,
 defense: 4,
 poke_type: 'fire',
 moves: ['yada', 'derp', 'blurb'],
 image_url: '1.svg'
}
*/
