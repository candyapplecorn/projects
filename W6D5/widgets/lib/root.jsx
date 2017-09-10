import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock.jsx';
import Weather from './weather.jsx';
import AutoComplete from './auto_complete.jsx';
import Tabs from './tabs.jsx';

const TABSDATA = [
	{ title: "uno", content: "It's a popular card game" },
	{ title: "dos", content: "Spanish for the number two" },
	{ title: "tres", content: "Sounds somewhat like 'terrace'" }
];

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
				<Tabs tabData={TABSDATA} />
        <hr></hr>
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
