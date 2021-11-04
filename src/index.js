import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { orderReducer } from './store/reducers/order';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth';
import reducer from './store/reducers/burgerBuilder';

const rootReducer = combineReducers({
  auth: authReducer,
  burgerBuilder: reducer,
  order: orderReducer,
});

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
