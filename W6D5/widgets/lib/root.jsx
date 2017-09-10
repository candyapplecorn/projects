import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock.jsx';
import Weather from './weather.jsx';
import AutoComplete from './auto_complete.jsx';

const NAMES = [
  "Fransisco",
  "Conchilla",
  "Marco",
  "David",
  "Sally",
  "La Roux",
  "Lady Gaga",
  "AJ",
  "Joe",
  "Gordon",
  "Betty",
  "Joe"
];

class Root extends React.Component {
  render(){
    return (
      <div>
        <Clock />
        <hr></hr>
        <Weather />
        <hr></hr>
        <AutoComplete names={NAMES} />
      </div>
    );
  }
}

export default Root;
