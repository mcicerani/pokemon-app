import './App.scss';
import { useState, useEffect } from 'react';
import ShowPokemon from './components/ShowPokemon';
import PokemonList from './components/PokemonList';
import LoadingScreen from './components/LoadingScreen';


function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map(async (result, index) => {
      const res = await fetch(result.url);
      const pokemonData = await res.json();
      return {
        ...result,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        types: pokemonData.types.map(type => type.type.name),
        abilities: pokemonData.abilities.map(ability => ability.ability.name),
        height: pokemonData.height,
        weight: pokemonData.weight,
        species: pokemonData.species.url,
        stats: pokemonData.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat
        })),
      };
    });
    const pokemonList = await Promise.all(pokemon);
    setPokemonList(pokemonList);
    setIsLoading(false);
  }

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  }

  const hidePokemonDetails = () => {
    setSelectedPokemon(null);
  }


  if (isLoading) {
    return (
      <div className="App">
        <LoadingScreen/>
      </div>
    );
  }

  return (
      <div className="App">
        {selectedPokemon ? (
          <ShowPokemon selectedPokemon={selectedPokemon} hidePokemonDetails={hidePokemonDetails}/>
        ) : (
          <PokemonList pokemonList={pokemonList} handlePokemonClick={handlePokemonClick} />
        )}
      </div>
  );
}




export default App;
