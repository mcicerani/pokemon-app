import './App.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import ShowPokemon from './components/selectedPokemon';


function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch Pokemon');
      }
      const data = await res.json();
      const pokemon = data.results.map(async (result, index) => {
        const res = await fetch(result.url);
        if (!res.ok) {
          throw new Error('Failed to fetch Pokemon details');
        }
        const pokemonData = await res.json();
        return {
          ...result,
          id: index + 1,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
          types: pokemonData.types.map(type => type.type.name),
          abilities: pokemonData.abilities.map(ability => ability.ability.name),
          height: pokemonData.height,
          weight: pokemonData.weight,
          stats: pokemonData.stats.map(stat => ({
            name: stat.stat.name,
            value: stat.base_stat
          }))
        };
      });
      const pokemonList = await Promise.all(pokemon);
      setPokemonList(pokemonList);
    } catch (error) {
      console.error(error);
    }
  }

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    console.log(pokemon);
  }

  const hidePokemonDetails = () => {
    setSelectedPokemon(null);
    console.log(selectedPokemon);
}


//crea props per il componente ShowPokemon dal pokemon selezionato
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
    })
  };




    return (
      <div className="App">
        {selectedPokemon ? (
          <ShowPokemon selectedPokemon={selectedPokemon} hidePokemonDetails={hidePokemonDetails}/>
        ) : (
          <div className='pokemon__container'>
            {pokemonList.map(poke => (
              <div className={`pokemon ${poke.types[0]}`} id={poke.name} key={poke.id} onClick={() => handlePokemonClick(poke)}>
                <p>#{poke.id}</p>
                <p>
                  {poke.types.map((type, index) => (
                    <img src={`../src/assets/${type}.svg`} alt={type} key={index} className='types' />
                  ))}
                </p>
                <img className='pokemon__foto' src={poke.image} alt={poke.name} />
                <h3 className='name'>{poke.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }



export default App;
