import React from 'react';
import { Route } from 'react-router-dom';
import PokemonIndexItem from './pokemon_index_item';
import PokemonDetailContainer from './pokemon_detail_container';
import PokemonFormContainer from './pokemon_form_container';

class PokemonIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.requestAllPokemon();
  }

  render() {
    const { pokemon, requestAPokemon } = this.props;

    return (
      <section className="pokedex">
        <ul>
          {pokemon.map( (p, idx) =>
            <PokemonIndexItem
              key={idx}
              requestAPokemon={requestAPokemon}
              pokemon={p} />)}
        </ul>
        <Route exact path="/" component={PokemonFormContainer} />
        <Route path="/pokemon/:id" component={PokemonDetailContainer} />
      </section>
    );
  }
}

export default PokemonIndex;
