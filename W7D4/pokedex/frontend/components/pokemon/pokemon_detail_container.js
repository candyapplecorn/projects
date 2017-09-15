import { connect } from 'react-redux';
import { selectAPokemon, selectItems } from '../../reducers/selectors';
import { requestAPokemon } from '../../actions/pokemon_actions';
import PokemonDetail from './pokemon_detail.jsx';


const mapStateToProps = state => ({
  pokemon: selectAPokemon(state),
  items: selectItems(state)
});

const mapDispatchToProps = dispatch => ({
  requestAPokemon: (id) => dispatch(requestAPokemon(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail);
