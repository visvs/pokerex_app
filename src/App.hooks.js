import { useEffect } from 'react';
import { Col, Spin } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Searcher from './components/Searcher';
import PokemonList from './components/PokemonList';
import { getPokemon } from './api';
import { getPokemonsWithDetails, setLoading } from './actions';
import logo from './statics/logo.svg';
import './App.css';
import { getIn } from 'immutable';

function App() {
  //const pokemons = useSelector((state) => state.pokemons);
  const pokemons = useSelector((state) => getIn(state,['data', 'pokemons']), shallowEqual).toJS(); //Si no se pone ToJS Retorna a pokemons como una estructura de datos de immutable
  const loading = useSelector((state) => getIn(state, ['ui', 'loading']));//useSelector((state) => state.loading);
  const dispatch = useDispatch();
  //Al usar useSelector usa una comparacion estricta ===
  /**
   * 1 === 1 //true
   * 1 === '1' //false
   * 
   * const a = {
   *  b: 1,
   *  c: 2
   * }
   * const b = a
   * 
   * a === b //true
   * 
   * const c = {...a} 
   * 
   * a === c //false
   * 
   * Esto afecta porque pokemos al ser objetos y al usar inmutabilidad siempre va a dar false, 
   * es decir va a ser una referencia distinta y va a haber renderizados  innecesarios
   * es por eso que shallowEqual se utiliza, para inidicar que evalue los valores y no unicamente las referencias
   * 
   * 
   */

  useEffect(() => {
    const fetchPokemons = async () => {
      dispatch(setLoading(true));
      const pokemonsRes = await getPokemon();
      dispatch(getPokemonsWithDetails(pokemonsRes));
      dispatch(setLoading(false));
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
      {loading ? (
        <Col offset={12}>
          <Spin spinning size='large' />
        </Col>
      ) : (
        <PokemonList pokemons={pokemons} />
      )}
    </div>
  );
}

export default App;
