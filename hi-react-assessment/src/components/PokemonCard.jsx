import { memo } from 'react';
import { Link } from 'react-router-dom';
import './PokemonCard.css'

/**
 * Pokemon component
 */
const PokemonCard = memo( function Pokemoncard({name, id}) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  return (
    <Link to={`/detail/${id}`} className='pokemon-card__card'>
      <img
        src={imageUrl}
        alt={name}
        loading="lazy"
        className="pokemon-card__image"
      />
      <div className="pokemon-card-content">
        <span className="pokemon-card__id">#{`00${id}`}</span>
        <h3 className="pokemon-card__name">{name}</h3>
      </div>
    </Link>
  )
});

export default PokemonCard;
