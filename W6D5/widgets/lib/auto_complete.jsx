import React from 'react';
import ReactDOM from 'react-dom';

class AutoComplete extends React.Component {
  constructor({ names }){
    super({names});
    this.names = names;
    this.state = { inputVal: '' };
  }

  handleChange(e){
    e.preventDefault();
    const newVal = e.target.value;

    this.setState({ inputVal: newVal });
  }

  handleClick(e) {
    e.preventDefault();

    if (e.target.classList.contains("nameListItem")) {
      this.setState({ inputVal: e.target.innerText});
    }
  }

  renderList(){
    const lis = this.names
    .filter(n => n.toUpperCase()
                  .indexOf(this.state.inputVal.toUpperCase()) !== -1)
    .map((n, i) => <li key={n + i} className="nameListItem">{n}</li>);
    return <ul onClick={this.handleClick.bind(this)}>{ lis }</ul>;
  }

  render(){
    return (
      <main className="autoComplete">
        <input onChange={this.handleChange.bind(this)} type="text" value={this.state.inputVal}></input>
        {' '}
        { this.renderList() }
      </main>
    );
  }
}

export default AutoComplete;
