import React from 'react';
import { Provider } from 'react-redux';
import PokemonIndexContainer from './pokemon/pokemon_index_container';

export default ({ store }) => (
  <Provider store={store}>
    <PokemonIndexContainer />
  </Provider>
);
