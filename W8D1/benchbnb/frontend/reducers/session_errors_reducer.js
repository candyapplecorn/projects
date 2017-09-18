import {
  RECEIVE_CURRENT_USER, RECEIVE_ERRORS
} from '../actions/session_actions';

const initialState = {
  currentUser: null,
  errors: []
};

export default (state = initialState, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_ERRORS:
      newState.errors = action.errors;
      return newState;
    case RECEIVE_CURRENT_USER:
      newState.errors = [];
      return newState;
    default:
      return state;
  }
};
