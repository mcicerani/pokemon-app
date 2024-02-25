import './App.scss';
import { useState, useEffect } from 'react';

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
  }

  const hidePokemonDetails = () => {
    setSelectedPokemon(null);
  }


  return (
    <div className="App">
      {selectedPokemon ? (
        <div className='pokemon__container'>
          <div className={`pokemonBig ${selectedPokemon.types[0]}`} onClick={hidePokemonDetails}>
            <h2>{selectedPokemon.name}</h2>
            <img className='pokemon__foto' src={selectedPokemon.image} alt={selectedPokemon.name} />
            <p>Height: {selectedPokemon.height}</p>
            <p>Weight: {selectedPokemon.weight}</p>
            <p>Types: {selectedPokemon.types.join(', ')}</p>
            <p>Abilities: {selectedPokemon.abilities.join(', ')}</p>
              {selectedPokemon.stats.map(stat => (
                <p key={stat.name}>{stat.name}: {stat.value}</p>
              ))}
          </div>
        </div>
      ):(
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
      )};
    </div>
  );
}



export default App;