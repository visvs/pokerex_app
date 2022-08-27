import { useEffect, useState } from 'react';
import { Col, Spin } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {Searcher} from './components/Searcher';
import PokemonList from './components/PokemonList';
//import { getPokemon } from './api';
//import { getPokemonsWithDetails, setLoading } from './actions';
import logo from './statics/logo.svg';
import './App.css';
//import { getIn } from 'immutable';
import { fetchPokemonsWithDetails , setPokemons} from './slices/dataSlice';
import { setLoading } from './slices/uiSlice';

function App() {
  //const pokemons = useSelector((state) => state.pokemons);
  //Con immutable
  //const pokemons = useSelector((state) => getIn(state,['data', 'pokemons']), shallowEqual).toJS(); //Si no se pone ToJS Retorna a pokemons como una estructura de datos de immutable
  
  //Con Redux-Toolkit (SLICES)
  const pokemons = useSelector((state) => state.data.pokemons, shallowEqual)
  const loading = useSelector(state => state.ui.loading)
  //useSelector((state) => getIn(state, ['ui', 'loading']));
  //useSelector((state) => state.loading);
  const [search, setSearch] = useState('')
  const [pokeRender, setPokerender] = useState([])
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
    /* const fetchPokemons = async () => {
      dispatch(setLoading(true));
      const pokemonsRes = await getPokemon();
      dispatch(getPokemonsWithDetails(pokemonsRes));
      dispatch(setLoading(false));
    };
    fetchPokemons(); */    
    dispatch(setLoading(true))
    dispatch(fetchPokemonsWithDetails())    
    dispatch(setLoading(false))
  }, []);

   useEffect(() => {
      setPokerender(pokemons)
  }, [pokemons]);
  const handleOnChange = (event)=>{ 
    setSearch(event.target.value)   
    if(event.target.value.length >= 1 && event.target.value.length !== '') {
      const pokeTemp = pokemons.filter(poke => poke.name.toUpperCase().startsWith(event.target.value.toUpperCase()))
      setPokerender(pokeTemp)
    }else{
      setPokerender(pokemons)   
    }
  }

  return (
    <div className='App'>
      <Col span={4} offset={10}>
        <img src={logo} alt='Pokedux' />
      </Col>      
      {loading ? (
        <Col offset={12}>
          <Spin spinning size='large' />
        </Col>
      ) : (
        <>
        <Col span={8} offset={8}>
          <Searcher searchWord={search} onChange={handleOnChange}/>
        </Col>
        <PokemonList pokemons={pokeRender} />
        </>
      )}
    </div>
  );
}

export default App;
