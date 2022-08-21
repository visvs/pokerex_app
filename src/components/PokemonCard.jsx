import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import './PokemonList.css';
import { StarButton } from './StarButton';
import {useDispatch} from 'react-redux'
import {setFavorite} from '../actions'

const PokemonCard = ({ name, image , abilities, id, favorite}) => {
  //console.log(abilities.join(', '))
  const dispatch = useDispatch();
  const handleOnFavorite = ()=>{
    dispatch(setFavorite({ pokemonId:id}))
  }
  return (
    <Card
      title={name}
      cover={
        <img
          src={image}
          alt={name}
        />
      }
      extra={<StarButton isFavorite={favorite} onClick={handleOnFavorite}/>}
    >
      <Meta description={abilities.join(', ')}/>
    </Card>
  );
};

export default PokemonCard;
