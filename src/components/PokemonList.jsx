import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons }) => {
  const getPokemonAbilities = (abilities)=>{
    //console.log(abilities)
    return abilities.map(ability => ability.ability.name)
  }
  return (
    <div className='PokemonList'>
      {pokemons.map((pokemon) => {
        return <PokemonCard name={pokemon.name} 
        image={pokemon.sprites.front_default ?? pokemon.sprites.back_default} 
        abilities={getPokemonAbilities(pokemon.abilities)} 
        key={pokemon.name} 
        id={pokemon.id} 
        favorite={pokemon.favorite} 
        />;
      })}
    </div>
  );
};

PokemonList.defaultProps = {
  pokemons: Array(10).fill(''),
};

export default PokemonList;
