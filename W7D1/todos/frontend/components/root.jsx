// this file is responsible for linking the
// redux store with all of provider's children
// and children's children, etc
import React from 'react';
import { Provider } from 'react-redux';
import App from './app';

// props { store: literally,allyourAppState }

export default ({ storeproperty }) => (
  <Provider store={storeproperty}>
    <App />
  </Provider>
);
