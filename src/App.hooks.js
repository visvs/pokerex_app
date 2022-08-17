import { useEffect } from 'react';
import { Col } from 'antd';
import Searcher from './components/Searcher';
import PokemonList from './components/PokemonList';
import { getPokemon, getPokemonDetail } from './api';
import { setPokemons } from './actions';
import logo from './statics/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

function App() {
  //obtener el estado y suscribir la variable a cambios
  const pokemons = useSelector(state => state.pokemons)
  const dispatcher = useDispatch();

  //console.log("🚀 ~ file: App.js ~ line 12 ~ App ~ pokemons", pokemons)
  
  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemonsRes = await getPokemon();
      const pokemonDetails = await Promise.all(pokemonsRes.map(getPokemonDetail));
      dispatcher(setPokemons(pokemonDetails));

    };

    fetchPokemons();
  }, []);

 

  return (
    <div className='App'>
      <Col span={4} offset={10}>
        <img src={logo} alt='Pokedux' />
      </Col>
      <Col span={8} offset={8}>
        <Searcher />
      </Col>
      <PokemonList pokemons={pokemons} />
    </div>
  );
}


export default App;
