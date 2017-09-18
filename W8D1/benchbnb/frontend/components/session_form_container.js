import { connect } from 'react-redux';
import SessionForm from './session_form';
import { withRouter } from 'react-router-dom'

import { login, signup } from '../actions/session_actions';

const mapStateToProps = (state, ownProps) => ({
  loggedIn: Boolean(state.session.currentUser),
  errors: state.errors.session.errors,
  formType: /login/.test(ownProps.location.pathname) ? 'login' : 'signup'
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  processForm: /login/.test(ownProps.location.pathname) ?
  (user) => dispatch(login(user)) :
  (user) => dispatch(signup(user))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm))
