export default {
  fetchAllPokemon() {
    return $.ajax({
      url: '/api/pokemon',
      method: 'GET',
      dataType: 'JSON'
    });
  },

  fetchAPokemon(id) {
    return $.ajax({
      url: `/api/pokemon/${id}`,
      method: 'GET',
      dataType: 'JSON'
    });
  },

  createPokemon(pokemon) {
    return $.ajax({
      url: '/api/pokemon',
      method: 'POST',
      dataType: 'JSON',
      data: {pokemon: pokemon}
    });
  }
};
