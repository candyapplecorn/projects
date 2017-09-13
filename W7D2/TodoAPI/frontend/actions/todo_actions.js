export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const RECEIVE_TODO = 'RECEIVE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
import APIUtil from '../util/todo_api_util';

export const receiveTodos = todos => ({
  type: RECEIVE_TODOS,
  todos
});

export const receiveTodo = function(todo){
  return {
    type: RECEIVE_TODO,
    todo
  };
};

export const removeTodo = todo => ({
  type: REMOVE_TODO,
  todo
});

export const fetchTodos = () => (dispatch) => {
  APIUtil.getTodos().then(function(todos) {
    dispatch(receiveTodos(todos));
  });
};

export const createTodo = (todo) => (dispatch) => {
  APIUtil.postTodo(todo).then(function(returnedTodo) {
    dispatch(receiveTodo(returnedTodo));
  });
};
