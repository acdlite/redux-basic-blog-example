import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import promise from 'redux-promise';
import { Router, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'redux-simple-router'

import reducers from './reducers';
import { createRoutes } from './routes';

const reduxRouterMiddleware = syncHistory(browserHistory);

const reducer = combineReducers({
  ...reducers,
  routing: routeReducer
});

const createStoreWithMiddleware = applyMiddleware(
  promise,
  reduxRouterMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router routes={createRoutes(store)} history={browserHistory} />
  </Provider>
  , document.querySelector('.container'));
