import PropTypes from 'prop-types'



function PokemonDetails({selectedPokemon}){
    return (
    <div className='pokemon__details'>
    <p><span className='bold'>Type:</span> {selectedPokemon?.types.join(', ')}</p>
    <p><span className='bold'>height:</span> {selectedPokemon?.height/10}m</p>
    <p><span className='bold'>weight:</span> {selectedPokemon?.weight/10}kg</p>
    <p><span className='bold'>abilities:</span> {selectedPokemon?.abilities.join(', ')}</p>
    </div>
    )
}

PokemonDetails.propTypes = {
    selectedPokemon: PropTypes.shape({
        types: PropTypes.arrayOf(PropTypes.string),
        height: PropTypes.number,
        weight: PropTypes.number,
        abilities: PropTypes.arrayOf(PropTypes.string),
    })
};

export default PokemonDetails;
