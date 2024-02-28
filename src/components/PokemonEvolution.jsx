import Proptype from 'prop-types';
import { useState, useEffect } from 'react';
import './PokemonEvolution.scss';
import { TiArrowRightThick } from "react-icons/ti";
import LoadingScreen from './LoadingScreen';


const PokemonEvolution = ({ species }) => {

    const [isLoading, setIsLoading] = useState(true);

    const [firstEvolution, setFirstEvolution] = useState({
        name: '',
        imageUrl: ''
    });

    const [secondEvolution, setSecondEvolution] = useState({
        name: '',
        imageUrl: ''
    });
    
    const [thirdEvolution, setThirdEvolution] = useState({
        name: '',
        imageUrl: ''
    });

    useEffect(() => {
        fetch(species)
            .then(res => res.json())
            .then(data => {
                const evolutionChainUrl = data.evolution_chain.url;
                fetch(evolutionChainUrl)
                    .then(res => res.json())
                    .then(data => {
                        const evolutionChain = data.chain;
                        setFirstEvolution(prevState => ({
                            ...prevState,
                            name: evolutionChain.species.name,
                            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionChain.species.url.split('/')[6]}.png`
                        }));
                        if (evolutionChain.evolves_to.length > 0) {
                            setSecondEvolution(prevState => ({
                                ...prevState,
                                name: evolutionChain.evolves_to[0].species.name,
                                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionChain.evolves_to[0].species.url.split('/')[6]}.png`
                            }));
                            if (evolutionChain.evolves_to[0].evolves_to.length > 0) {
                                setThirdEvolution(prevState => ({
                                    ...prevState,
                                    name: evolutionChain.evolves_to[0].evolves_to[0].species.name,
                                    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionChain.evolves_to[0].evolves_to[0].species.url.split('/')[6]}.png`
                                }));
                            }
                        }
                        setIsLoading(false);
                    });
            });
    }, [species]);

    if (isLoading) {
        return <LoadingScreen/>;
    }

    return (
        <div className='evo'>
            {firstEvolution.name && (
                <div>
                    <img src={firstEvolution.imageUrl} alt={firstEvolution.name} />
                    <p>{firstEvolution.name}</p>
                </div>
            )}
            {secondEvolution.name && (
                <>
                    <TiArrowRightThick className='arrow'/>
                    <div>
                        <img src={secondEvolution.imageUrl} alt={secondEvolution.name} />
                        <p>{secondEvolution.name}</p>
                    </div>
                </>
            )}
            {thirdEvolution.name && (
                <>
                    <TiArrowRightThick className='arrow' />
                    <div>
                        <img src={thirdEvolution.imageUrl} alt={thirdEvolution.name} />
                        <p>{thirdEvolution.name}</p>
                    </div>
                </>
            )}
        </div>
    );
}

PokemonEvolution.propTypes = {
    species: Proptype.string.isRequired
};

export default PokemonEvolution;