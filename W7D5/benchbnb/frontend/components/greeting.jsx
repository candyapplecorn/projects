import React from 'react';
import { Link } from 'react-router-dom';

class Greeting extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
// some simpleee ternaryy logik
    const { currentUser, logout } = this.props;
    return (
      currentUser ? (
        <div>
          <h2>Hello, {currentUser.username}</h2>
          <button onClick={logout}>Log Out</button>
        </div>
      ) : (
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </div>
      )
    );
  }
}

export default Greeting;
