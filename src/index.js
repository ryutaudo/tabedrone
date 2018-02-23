import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import 'bootstrap/dist/css/bootstrap.css';
import reducer from './reducers/index';
import App from './containers/App';

const createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
