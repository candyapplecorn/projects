import React from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.Component {
  constructor() {
    super();

    this.state = {
      time: new Date()
    };
  }

  tick(){
    this.setState({
      time: new Date()
    });
  }

  componentDidMount(){
    this.interval = window.setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  properHours(){
    let hours = this.state.time.getHours();
    return hours > 12 ? hours - 12 : hours;
  }

  renderTime() {
    const hours = this.properHours();
    const meridiem = this.state.time.getHours() > 12 ? ' PM' : ' AM';

    return [
      this.pad(hours),
      this.pad(this.state.time.getMinutes()),
      this.pad(this.state.time.getSeconds())
    ].join(" : ") + meridiem;
  }

  render(){
    return (
      <main className="clock">
        <section><div>Time: </div><div>{this.renderTime()}</div></section>
        <section>
          <div>Date: </div>
          <div>{(new Date()).toDateString()}</div>
        </section>
      </main>
    );
  }

  pad(num){
    return num >= 10 ? num : '0' + num;
  }
}

export default Clock;
