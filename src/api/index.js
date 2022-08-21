import axios from 'axios';

export const getPokemon = () => {
  return axios
    .get('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then((res) => res.data.results)
    .catch((err) => console.log(err));
};

export const getPokemonDetail = (pokemon) =>{
    return axios.get(pokemon.url)
    .then(res => {
      const favorite = res.data.favorite ?? false
      const rta = {...res.data, favorite}
      return rta
    })
    .catch(err =>console.log(err))
}