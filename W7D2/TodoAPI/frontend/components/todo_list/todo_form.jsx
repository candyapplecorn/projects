import React from 'react';
/*

has an input for title
  as user writes in it, we update this
  Component's state.

has a button
  when clicked, we dispatch a receiveTodo action

*/
class TodoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      title: '',
      body: ''
    });
  }

  handleSubmit(e){
    e.preventDefault();
    const { createTodo } = this.props;
    const todo = {
      title: this.state.title,
      body: this.state.body
    };
    this.resetState();
    createTodo(todo);
  }

  resetState(){
    this.setState({
      title: '',
      body: ''
    });
  }

  handleChange(e){
    e.stopPropagation();
    const { target: { value }} = e; // e.target.value
    if (e.target.name === "title") {
      this.setState({ title: value });
    } else {
      this.setState({ body: value });
    }
  }

  render(){
      const title = this.state.title;
      const body = this.state.body;

      return (
        <form className="todo-list-form" onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Title
            <input name="title" onChange={this.handleChange.bind(this)} type="text" value={title} />
          </label>
          <br />

          <label>
            Body
            <input name="body" onChange={this.handleChange.bind(this)} type="text" value={body} />
          </label>
          <br />

          <input type="Submit" value="Create todo!"/>
        </form>
      );
  }
}

export default TodoForm;
