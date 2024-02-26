import PropTypes from 'prop-types'
import './Pokemon.scss'

function Pokemon({pokemonList, handlePokemonClick}) {
    return (
        <div className='pokemon__container'>
        {pokemonList.map(poke => (
            <div className={`pokemon ${poke.types.map(type => type).join(' ')}`} id={poke.name} key={poke.id} onClick={() => handlePokemonClick(poke)}>
            <p>#{poke.id}</p>
            <p>
              {poke.types.map((type, index) => (
                <img src={`../src/assets/${type}.svg`} alt={type} key={index} className='types'/>
              ))}
            </p>
            <img className='pokemon__foto' src={poke.image} alt={poke.name} />
            <h3 className='name'>{poke.name}</h3>
          </div>
        ))}
      </div>
    );
}   

Pokemon.propTypes = {
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

export default Pokemon;