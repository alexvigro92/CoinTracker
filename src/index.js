import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import 'bootstrap/dist/css/bootstrap.css'
import './Assets/css/styles.min.css';

const store = createStore(reducer,applyMiddleware( thunk, promise()));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
