import { SET_FAVORITE, SET_LOADING, SET_POKEMONS } from '../actions/types';
import { fromJS, setIn, getIn} from 'immutable';

//Con fromJS ahora es una estructura inmutable 
const initialState = fromJS({ 
  pokemons: [],
  loading: false,
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

<<<<<<< HEAD
      return { ...state, pokemons: newPokemonsList } */
      const currentPokemonIndex = state.get('pokemons').findIndex((pokemon) => {
          return pokemon.get('id') === action.payload.pokemonId;
      });

      if (currentPokemonIndex < 0) {
        return state;
      }
      const isFav = getIn(state,['pokemons', currentPokemonIndex, 'favorite']);
      return setIn(state,['pokemons', currentPokemonIndex, 'favorite'], !isFav)      
    case SET_LOADING:
      //return { ...state, loading: action.payload };
      return setIn(state ,["loading"], fromJS(action.payload))
=======
      return { ...state, pokemons: newPokemonsList }
    case SET_LOADING:
      return { ...state, loading: action.payload };
>>>>>>> 22445beedcc679a0756be0d5f091ae678520fa46
  default:
      return state;
  }
};