//import { combineReducers } from "redux-immutable";
import { combineReducers } from "redux";
import dataReducer from "../slices/dataSlice";
import uiReducer from '../slices/uiSlice'
//import { pokemonsReducer } from "./pokemons";
//import { uiReducer } from "./ui";

export const rootReducer = combineReducers({ //Recibe objeto, cada propiedad es una propiedad del estado
    data: dataReducer,
    ui: uiReducer
})

