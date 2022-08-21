import { SET_FAVORITE, SET_POKEMONS } from '../actions/types';
import { fromJS, setIn, getIn} from 'immutable';

//Con fromJS ahora es una estructura inmutable 
const initialState = fromJS({ 
  pokemons: [],
});

export const pokemonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POKEMONS:
      //return { ...state, pokemons: action.payload };
      //return state.setIn(['pokemons'], fromJS(action.payload))
      return setIn(state, ['pokemons'], fromJS(action.payload))
    case SET_FAVORITE:
      /* const newPokemonsList = [...state.pokemons];
      const currentPokemonIndex = newPokemonsList.findIndex((pokemon) => {
        return pokemon.id === action.payload.pokemonId;
      });

      if (currentPokemonIndex < 0) {
        return state;
      }

      newPokemonsList[currentPokemonIndex].favorite = !newPokemonsList[currentPokemonIndex].favorite;

      return { ...state, pokemons: newPokemonsList } */
      const currentPokemonIndex = state.get('pokemons').findIndex((pokemon) => {
          return pokemon.get('id') === action.payload.pokemonId;
      });

      if (currentPokemonIndex < 0) {
        return state;
      }
      const isFav = getIn(state,['pokemons', currentPokemonIndex, 'favorite']);
      return setIn(state,['pokemons', currentPokemonIndex, 'favorite'], !isFav)          
  default:
      return state;
  }
};