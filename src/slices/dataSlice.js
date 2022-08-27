import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemon, getPokemonDetail } from "../api";

const initialState ={
    pokemons : []
}
//Recibe nameAction, 
//payloadCreator: cb que se ejecuta al disparar la accion
export const fetchPokemonsWithDetails = createAsyncThunk(
    'data/fetchPokemonsWithDetails',
    /**Recibe
     * 1.Params (Example: ID)
     * 2. thunkAPI -->desestructura el dispatch      
     */
    async(_,{dispatch})=>{
        //dispatch del loader
        //fetch
        const pokemonRes = await getPokemon();
        const pokemonsDetailed = await Promise
        .all(pokemonRes.map((pokemon) => getPokemonDetail(pokemon))); //--> Consultar la API
        //Dispatch
        dispatch(setPokemons(pokemonsDetailed))
    }
)

//Not return
export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPokemons: (state, action) =>{ //Action {type, payload} --> convencion nombreSlice/actionCreator data/setPokemons        
            state.pokemons = action.payload; //Inmutable, aunque no lo parezca
        },
        setFavorite: (state, action) =>{
            const currentPokemonIndex = state.pokemons.findIndex((poke) => poke.id === action.payload.pokemonId);
            if(currentPokemonIndex >= 0){
                const isFav = state.pokemons[currentPokemonIndex].favorite
                state.pokemons[currentPokemonIndex].favorite = !isFav;
            }
        }
    }
})

//Export actions
export const {setFavorite, setPokemons} = dataSlice.actions;
//Export reducers
export default dataSlice.reducer;