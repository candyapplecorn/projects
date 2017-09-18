import React from 'react';
import { Link, Route } from 'react-router-dom';
import ItemDetailContainer from '../items/item_detail_container';

class PokemonDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { match, requestAPokemon } = this.props;
    requestAPokemon(match.params.id);
  }

  componentWillReceiveProps(newProps){
    if (!this.props.pokemon) return; // no pokemon? no problem!
    const requestAPokemon = this.props.requestAPokemon;
    const newId = newProps.match.params.id;
    const oldId = this.props.pokemon.id;

    if (newId != oldId) {
      requestAPokemon(newProps.match.params.id);
    }
  }

  render(){
    const { pokemon, items, location } = this.props;
    if ( pokemon === undefined ) {
      return <main className="pokemon-detail">Loading...</main>;
    }

    return (
      <main className="pokemon-detail">
        <img src={pokemon.image_url}></img>
        <h3>{pokemon.name}</h3>
        <h5>Type: {pokemon.poke_type}</h5>
        <h5>Attack: {pokemon.attack}</h5>
        <h5>Defense: {pokemon.defense}</h5>
        <h5>Moves: {pokemon.moves.join(", ")}</h5>
        <ul>
          <h3>Items</h3>
          {
            items.map(item => (
              <li key={item.id}>
                <Link to={`/pokemon/${pokemon.id}/item/${item.id}`} >
                  <img src={item.image_url} />
                </Link>
              </li>
            ))
          }
      </ul>
      <Route path="/pokemon/:id/item/:itemId"
             component={ItemDetailContainer} />
      </main>
    );
  }
}

export default PokemonDetail;
