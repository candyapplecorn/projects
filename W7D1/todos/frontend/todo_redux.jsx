import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';


document.addEventListener("DOMContentLoaded", function() {
  const store = configureStore();

  ReactDOM.render(
    <Root storeproperty={store} beans={"yum"} />, //{ store: { .... }, beans: 'yum'}
    document.getElementById('root')
  );
});
