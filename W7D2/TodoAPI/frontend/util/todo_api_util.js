
const APIUtil = {
  getTodos: function() {
    return $.ajax({
      method: 'GET',
      url: '/api/todos'
    });
  },

  postTodo: function(todo){
    return $.ajax({
      method: 'POST',
      url: '/api/todos',
      type: 'json',
      data: { todo: todo } // thaks aaron
      // will nest all the todo data so that require('todo') will
      // actually work ( for the controller, 'todo_params' )
    });
  }
};

export default APIUtil;
