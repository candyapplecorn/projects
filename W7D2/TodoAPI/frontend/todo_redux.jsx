import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import APIUtil from './util/todo_api_util';


import {fetchTodos} from './actions/todo_actions';

window.APIUtil = APIUtil;
window.fetchTodos = fetchTodos;

document.addEventListener("DOMContentLoaded", function() {
  const store = configureStore();
  window.store = store;

  ReactDOM.render(
    <Root storeproperty={store} beans={"yum"} />, //{ store: { .... }, beans: 'yum'}
    document.getElementById('content')
  );
});
