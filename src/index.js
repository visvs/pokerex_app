import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.hooks';
//import App from './App.connect';
import { pokemonsReducer } from './reducers/pokemons';
import { Provider } from 'react-redux';
import {applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import { featuring, logger } from './middlewares';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
//Compose nos sirve para encapsular todos los enhancers y middlewares que se quieran implementar
//Para poder pasarle como parametro los middlewares creados, como logger en este caso,
//se debe pasar primero por la funcion applyMiddleware como atributo
const composeEnhencers = compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(logger, featuring))

const store = createStore(pokemonsReducer, composeEnhencers);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
