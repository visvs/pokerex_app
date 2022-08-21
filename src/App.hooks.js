import { useEffect } from 'react';
import { Col, Spin } from 'antd';
import Searcher from './components/Searcher';
import PokemonList from './components/PokemonList';
import { getPokemon, getPokemonDetail } from './api';
import { getPokemonsWithDetails, setLoading, setPokemons } from './actions';
import logo from './statics/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

function App() {
  //obtener el estado y suscribir la variable a cambios
  const pokemons = useSelector(state => state.pokemons)
  const loading = useSelector(state => state.loading)

  const dispatch = useDispatch();

  //console.log("🚀 ~ file: App.js ~ line 12 ~ App ~ pokemons", pokemons)
  
  useEffect(() => {
    const fetchPokemons = async () => {
      dispatch(setLoading(true));
      const pokemonsRes = await getPokemon();
      dispatch(getPokemonsWithDetails(pokemonsRes))
      dispatch(setLoading(false))
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
      {loading && <Col span={12} offset={12}>
        <Spin spinning={true}/>
      </Col>}
      {!loading && <PokemonList pokemons={pokemons} />}
    </div>
  );
}


export default App;
