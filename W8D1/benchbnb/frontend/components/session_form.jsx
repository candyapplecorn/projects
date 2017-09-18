import React from 'react';
import { Link } from 'react-router-dom'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(key){
    return event => {
      this.setState({
        [key]: event.target.value
      });
    };
  }

  handleSubmit(event){
    event.preventDefault();
    const user = Object.assign({}, this.state);

    this.props.processForm(user)
              .then(this.props.history.push('/'))
  }

  render() {

    const errors = (
      <ul>
        {this.props.errors.map(err => <li>{err}</li>)}
      </ul>
    );

    return (
      <div>
        <header>
            <h1>
              {this.props.formType === 'login' ? 'Log in' : 'Sign up'}
            </h1>
        </header>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Username
            <input type="text" onChange={this.handleInput('username')}
                               value={this.state.username}/>
          </label><br />
          <label>
            Password
            <input type="text" onChange={this.handleInput('password')}
                               value={this.state.password}/>
          </label><br></br>

          <input type='submit' value={ this.props.formType } />
        </form>

        {
          this.props.formType === 'login' ? (
            <Link to="/signup" />
          ) : (
            <Link to="/login" />
          )
        }

        {
          this.props.errors && errors
        }
      </div>
    );
  }
}

export default SessionForm;
