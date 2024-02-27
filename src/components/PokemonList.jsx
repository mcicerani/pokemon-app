import PropTypes from 'prop-types'
import './PokemonList.scss'

function PokemonList({pokemonList, handlePokemonClick}) {
    return (
        <div className='pokemon__container'>
        {pokemonList.map(poke => (
            <div className={`pokemon ${poke.types.map(type => type).join(' ')}`} id={poke.name} key={poke.id} onClick={() => handlePokemonClick(poke)}>
            <p>#{poke.id.toString().padStart(3, '0')}</p>
            <p>
              {poke.types.map((type, index) => (
                <img src={`../svgs/${type}.svg`} alt={type} key={index} className={`types ${type}`} />
              ))}
            </p>
            <img className='pokemon__foto' src={poke.image} alt={poke.name} />
            <h3 className='name'>{poke.name}</h3>
          </div>
        ))}
      </div>
    );
}   

PokemonList.propTypes = {
    pokemonList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            image: PropTypes.string,
            types: PropTypes.arrayOf(PropTypes.string),
        })
    ),
    handlePokemonClick: PropTypes.func.isRequired,
};

export default PokemonList;