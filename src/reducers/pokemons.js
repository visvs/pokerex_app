import { SET_FAVORITE, SET_LOADING, SET_POKEMONS } from '../actions/types';

const initialState = {
  pokemons: [],
  loading: false
};

export const pokemonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POKEMONS:
      return { ...state, pokemons: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_FAVORITE:
      const newPokemonList = [...state.pokemons];
      const currentPokemonIndex = newPokemonList.findIndex((pokemon)=>{
        return pokemon.id === action.payload.pokemonId
      }); //Si no existe = -1
      if(currentPokemonIndex < 0){
        return state;
      }
      newPokemonList[currentPokemonIndex] = !newPokemonList[currentPokemonIndex].favorite;
      return {...state, pokemons: newPokemonList}
  default:
      return state;
  }
};
