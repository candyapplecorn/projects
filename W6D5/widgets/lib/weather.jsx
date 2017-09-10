import React from 'react';
import ReactDOM from 'react-dom';
import APIUtil from './APIUtils.js';

class Weather extends React.Component {
  constructor() {
    super();
    this.state = { temp: '', city: '' };
  }

  getPos() {
    navigator.geolocation.getCurrentPosition(this.getWeather.bind(this));
  }

  componentDidMount(){
    this.getPos();
  }

  getWeather(pos) {
    APIUtil.openWeatherAPI(pos, (res) => {
      // main: { temp: temp },
      const { name: city } = res;
      const temp = Math.round((res.main.temp) * (9/5) - 459.67) + '°';
      this.setState({ temp, city });
    });
  }

  render() {
    return (
      <main className="weather">
        <section><div>Temp:</div> <div>{this.state.temp}</div></section>
        <section><div>City:</div> <div>{this.state.city}</div></section>
      </main>
    );
  }
}

export default Weather;
