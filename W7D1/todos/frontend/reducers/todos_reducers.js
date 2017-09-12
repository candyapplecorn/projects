import { RECEIVE_TODOS, RECEIVE_TODO } from '../actions/todo_actions';
import { merge } from 'lodash'; // Deep object copy for new states

const initialState = {
  1: {
    id: 1,
    title: 'wash car',
    body: 'with soap',
    done: false
  },
  2: {
    id: 2,
    title: 'wash dog',
    body: 'with shampoo',
    done: true
  }
};

const convertToObject = todos =>
    Array.isArray(todos) ?
    todos.reduce(function(acc, el) {
      acc[el.id] = el;
      return acc;
    }, {}) :
    todos
;

const todosReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch(action.type) { // RECEIVE_TODO, or RECEIVE_TODOS
    // overwriting the initial state
    case RECEIVE_TODOS:
      return convertToObject(action.todos);
    // append todo to a copy of the existing state
    case RECEIVE_TODO:
      // use merge to make deep copy of state
      const newState = merge({}, state);
      const { id } = action.todo;
      newState[id] = action.todo;
      return newState;
    default:
      return state; // defaults to returning an empty blank slate state
  }
};

export default todosReducer;
// switch(action.type)
//      case "ACTION 1":
            // logic for action 1
            // break
//        case "A"
