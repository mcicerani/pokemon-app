import PropTypes from 'prop-types'

function ShowPokemon({ selectedPokemon, hidePokemonDetails }) {

    return (
        <div className='pokemon__container' onClick={hidePokemonDetails}>
            <div className={`pokemonBig ${selectedPokemon?.types[0]}`}>
                <p>#{selectedPokemon?.id}</p>
                <h2>{selectedPokemon?.name}</h2>
                <img className='pokemon__foto' src={selectedPokemon?.image} alt={selectedPokemon?.name} />
                <p>
                    {selectedPokemon?.types.map((type, index) => (
                        <img src={`../src/assets/${type}.svg`} alt={type} key={index} className='types' />
                    ))}
                </p>
                <p>Types: {selectedPokemon?.types.join(', ')}</p>
                <p>Height: {selectedPokemon?.height}</p>
                <p>Weight: {selectedPokemon?.weight}</p>
                <p>Abilities: {selectedPokemon?.abilities.join(', ')}</p>
                {selectedPokemon?.stats.map(stat => (
                    <p key={stat.name}>{stat.name}: {stat.value}</p>
                ))}
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


