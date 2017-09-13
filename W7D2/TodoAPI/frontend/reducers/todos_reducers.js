import {
  REMOVE_TODO, RECEIVE_TODOS, RECEIVE_TODO
} from '../actions/todo_actions';
import { merge } from 'lodash'; // Deep object copy for new states

const convertToObject = todos =>
    Array.isArray(todos) ?
    todos.reduce(function(acc, el) {
      acc[el.id] = el;
      return acc;
    }, {}) :
    todos
;

const todosReducer = (state = {}, action) => {
  Object.freeze(state);
  const { todo } = action;
  if (todo){
    var { id } = todo;
  }
  const newState = merge({}, state);

  switch(action.type) { // RECEIVE_TODO, or RECEIVE_TODOS
    // overwriting the initial state
    case RECEIVE_TODOS:
      return convertToObject(action.todos);
    // append todo to a copy of the existing state
    case RECEIVE_TODO:
      // use merge to make deep copy of state
      todo.done = todo.done || false;
      if (todo.id === undefined){
        const maxID = Math.max(... Object.keys(state).map(n => Number(n)));
        todo.id = maxID + 1;
      }
      if (id)
        newState[id] = todo;
      else
        newState[todo.id] = todo;

      return newState;
    case REMOVE_TODO:
      delete newState[id];
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
