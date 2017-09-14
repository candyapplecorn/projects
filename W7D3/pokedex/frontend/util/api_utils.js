export default {
  fetchAllPokemon(){
    return $.ajax({
      url: '/api/pokemon',
      method: 'GET',
      dataType: 'JSON'
    });
  }
};
