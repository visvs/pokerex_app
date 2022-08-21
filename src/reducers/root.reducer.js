import { combineReducers } from "redux-immutable";
import { pokemonsReducer } from "./pokemons";
import { uiReducer } from "./ui";

export const rootReducer = combineReducers({ //Recibe objeto, cada propiedad es una propiedad del estado
    data: pokemonsReducer,
    ui: uiReducer
})

