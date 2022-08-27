import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.hooks';
import thunk from 'redux-thunk';
//import App from './App.connect';
//import { pokemonsReducer } from './reducers/pokemons';
import { Provider } from 'react-redux';
import {applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import { logger } from './middlewares';
import './index.css';
import { rootReducer } from './reducers/root.reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
//Compose nos sirve para encapsular todos los enhancers y middlewares que se quieran implementar
//Para poder pasarle como parametro los middlewares creados, como logger en este caso,
//se debe pasar primero por la funcion applyMiddleware como atributo
//Se crea un compose alternativo cuando se inplementa redux-thunk
const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhencers = composeAlt(
 /*  window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__(), */ 
  applyMiddleware(thunk,logger));

const store = createStore(rootReducer, composeEnhencers);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
