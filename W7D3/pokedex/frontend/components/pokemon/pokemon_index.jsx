import React from 'react';

class PokemonIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.requestAllPokemon();
  }

  render() {
    const { pokemon } = this.props;

    return (
      <ul>
        {
          pokemon.map( (p, idx) =>
            <li key={idx}>
              <span>{p.name}</span>
              <img src={p.image_url} />
            </li>
          )
        }
      </ul>
    );
  }
}

export default PokemonIndex;
