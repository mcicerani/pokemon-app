import PropTypes from 'prop-types'
import './ShowPokemon.scss';
import StatsBar from './StatsBar';

function ShowPokemon({ selectedPokemon, hidePokemonDetails }) {

    return (
        <div className='pokemon__container'>
            <div className={`pokemonBig ${selectedPokemon?.types.map(type => type).join(' ')}`} onClick={hidePokemonDetails}>
                <p>#{selectedPokemon?.id}</p>
                <p>
                {selectedPokemon.types.map((type, index) => (
                    <img src={`../src/assets/${type}.svg`} alt={type} key={index} className='types' />
                ))}
                </p>
                <img className='pokemon__foto' src={selectedPokemon?.image} alt={selectedPokemon?.name} />
                <h2>{selectedPokemon?.name}</h2>
            </div>
            <div className='pokemon__details'>
                <p>Type: {selectedPokemon?.types.join(', ')}</p>
                <p>Height: {selectedPokemon?.height/10}m</p>
                <p>Weight: {selectedPokemon?.weight/10}kg</p>
                <p>Abilities: {selectedPokemon?.abilities.join(', ')}</p>
                <StatsBar selectedPokemon={selectedPokemon} />
            </div>
        </div>
    );
}

ShowPokemon.propTypes = {
    selectedPokemon: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        image: PropTypes.string,
        types: PropTypes.arrayOf(PropTypes.string),
        height: PropTypes.number,
        weight: PropTypes.number,
        abilities: PropTypes.arrayOf(PropTypes.string),
        stats: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                value: PropTypes.number
            })
        )
    }),
    hidePokemonDetails: PropTypes.func.isRequired,
};


export default ShowPokemon;


