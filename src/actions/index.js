import { getPokemonDetail } from '../api';
import { SET_POKEMONS, SET_LOADING, SET_FAVORITE } from './types';

export const setPokemons = (payload) => ({
  type: SET_POKEMONS,
  payload,
});

export const setLoading = (payload) =>({
  type: SET_LOADING,
  payload
})

//funcion que retorna otra funcion
export const getPokemonsWithDetails = (pokemonList = []) => async (dispatch) =>{
  //La funcion recibe el dispatch, (next) --> permite que la accion llegue al reducer
  //Se dispara la accion
  const pokemonDetails = await Promise.all(pokemonList.map(getPokemonDetail));
  dispatch(setPokemons(pokemonDetails))
}

export const setFavorite = (payload) => ({
  type: SET_FAVORITE,
  payload //--> recibe 
})