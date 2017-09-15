import React from 'react';
import { merge } from 'lodash';

class PokemonForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '', attack: '', defense: '',
      poke_type: '', move1: '', image_url: '',
      move2: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    event.preventDefault();
    const target = event.target;
    const { name, value } = target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    const moves = {moves: [this.state.move1, this.state.move2]};
    const pokemon = merge({}, this.state, moves);
    delete pokemon.move1;
    delete pokemon.move2;

    this.props.createPokemon(pokemon);
    this.setState({
      name: '', attack: '', defense: '',
      poke_type: '', move1: '', image_url: '',
      move2: ''
    });
  }

  render(){
    const {
      name, attack, defense, poke_type, move1, move2, image_url
    } = this.state;

    return (
      <form onChange={this.handleChange}
            onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Name
          <input name='name' type="text" value={name}></input>
        </label><br />
        <label>
          Attack
          <input name='attack' type="number" value={attack}></input>
        </label><br/>
        <label>
          Defense
          <input name='defense' type="number" value={defense}></input>
        </label><br/>
        <label>
          Type
          <input name='poke_type' type="text" value={poke_type}></input>
        </label><br/>
        <label>
          Move 1
          <input name='move1' type="text" value={move1}></input>
        </label><br/>
        <label>
          Move 2
          <input name='move2' type="text" value={move2}></input>
        </label><br/>
        <label>
          Image Url
          <input name='image_url' type="text" value={image_url}></input>
        </label><br/>
      <input type="submit" value="Create Pokemon" />
      </form>
    );
  }
}

export default PokemonForm;
