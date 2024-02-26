import './App.scss';
import { useState, useEffect } from 'react';
import ShowPokemon from './components/ShowPokemon';
import Pokemon from './components/Pokemon';


function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

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
          stats: pokemonData.stats.map(stat => ({
            name: stat.stat.name,
            value: stat.base_stat
          }))
        };
      });
      const pokemonList = await Promise.all(pokemon);
      setPokemonList(pokemonList);
  }

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    console.log(pokemon);
  }

  const hidePokemonDetails = () => {
    setSelectedPokemon(null);
}


  return (
    <div className="App">
      {selectedPokemon ? (
        <ShowPokemon selectedPokemon={selectedPokemon} hidePokemonDetails={hidePokemonDetails}/>
      ) : (
        <Pokemon pokemonList={pokemonList} handlePokemonClick={handlePokemonClick} />
      )}
    </div>
  );
}




export default App;
