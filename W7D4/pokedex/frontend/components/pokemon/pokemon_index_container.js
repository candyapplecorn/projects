import { connect } from 'react-redux';
import { selectAllPokemon } from '../../reducers/selectors';
import PokemonIndex from './pokemon_index';
import {
  // receiveAllPokemon,
  requestAllPokemon,
  requestAPokemon
} from '../../actions/pokemon_actions';

const mapStateToProps = state => ({
  pokemon: selectAllPokemon(state)
});

const mapDispatchToProps = dispatch => ({
  requestAllPokemon: () => dispatch(requestAllPokemon()),
  // requestAPokemon:   (id) => dispatch(requestAPokemon(id))
  // receiveAllPokemon: pokemon => dispatch(receiveAllPokemon(pokemon))
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonIndex);
