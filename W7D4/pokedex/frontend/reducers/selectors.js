import { values } from 'lodash';

export const selectAllPokemon = (state) => {
  return values(state.entities.pokemon);
};

export const selectAPokemon = (state) => {
  const id = state.ui.pokeDisplay;
  return state.entities.pokemon[id];
};

export const selectItem = (state, itemId) => {
  return state.entities.items[itemId];
};

export const selectItems = (state) => {
  const id = state.ui.pokeDisplay;
  if (!id) return;
  const itemIds = state.entities.pokemon[id].item_ids;

  const items = itemIds.reduce((acc, itemId) => {
    acc.push(state.entities.items[itemId]);
    return acc;
  }, []);

  return items;
};
