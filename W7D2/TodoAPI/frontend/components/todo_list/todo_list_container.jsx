import React from "react";
import allTodos from "../../reducers/selectors";
import {
  receiveTodo, receiveTodos, removeTodo, fetchTodos, createTodo
} from "../../actions/todo_actions";
import { connect } from "react-redux";
import TodoList from "./todo_list.jsx";

const mapStateToProps = (state) => ({
  todos: allTodos(state)
});

const mapDispatchToProps = dispatch => ({
  createTodo: (todos) => dispatch(createTodo(todos)),
  receiveTodos: (todos) => dispatch(receiveTodos(todos)),
  removeTodo: (todo) => dispatch(removeTodo(todo)),
  fetchTodos: (todos) => dispatch(fetchTodos(todos))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
