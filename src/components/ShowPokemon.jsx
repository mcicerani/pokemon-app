import PropTypes from 'prop-types'
import './ShowPokemon.scss';
import StatsBar from './StatsBar';
import PokemonDetails from './PokemonDetails';
import PokemonEvolution from './PokemonEvolution';
import React from 'react';



function ShowPokemon({ selectedPokemon, hidePokemonDetails }) {

    return (
        <React.Fragment>
            <div className='pokemon__container'>
                <div className={`pokemonBig ${selectedPokemon?.types.map(type => type).join(' ')}`} onClick={hidePokemonDetails}>
                    <p>#{selectedPokemon?.id.toString().padStart(3, '0')}</p>
                    <p>
                    {selectedPokemon.types.map((type, index) => (
                        <img src={`../svgs/${type}.svg`} alt={type} key={index} className={`types ${type}`} />
                    ))}
                    </p>
                    <img className='pokemon__foto' src={selectedPokemon?.image} alt={selectedPokemon?.name} />
                    <h2>{selectedPokemon?.name}</h2>
                </div>
                <div>
                    <PokemonDetails selectedPokemon={selectedPokemon} />  
                    <StatsBar selectedPokemon={selectedPokemon} />
                </div>
            </div>
                <PokemonEvolution species={selectedPokemon?.species} />
        </React.Fragment>

    );
}

ShowPokemon.propTypes = {
    selectedPokemon: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        image: PropTypes.string,
        species: PropTypes.string,
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


