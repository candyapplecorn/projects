import React from 'react';

class TodoList extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    // Phase 3, end: refactor li into todo_list_item.jsx!
    return (
      <ul>
        {
          this.props.todos.map((td, i) =>
            <li key={i}>{td.title}</li>)
        }
      </ul>
    );
  }
}

export default TodoList;
