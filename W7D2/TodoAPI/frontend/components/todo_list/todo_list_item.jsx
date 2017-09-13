import React from 'react';

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);

  }

  toggleDone(){
    const { todo, receiveTodo } = this.props;
    todo.done = !todo.done;
    receiveTodo(todo);
    // use receiveTodo but change .done first.
  }
  render() {
    const { title, todo, removeTodo } = this.props;
    return (
      <li className="todo-list-item">
        <div>{title}</div>
        <div>
          <button onClick={this.toggleDone.bind(this)}>{todo.done ? "undo" : "done"}</button>
          <button onClick={removeTodo.bind(this, todo)}>Delete</button>
        </div>
      </li>
    );
  }

}

export default TodoListItem;
