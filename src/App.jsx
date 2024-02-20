import React from 'react'; // Import the React package
import { FaSearchPlus } from "react-icons/fa";
import './App.scss';





//colore del tipo di pokemon
/*
const typeColor = {
  normal: 'filter: brightness(0) saturate(100%) invert(74%) sepia(16%) saturate(627%) hue-rotate(21deg) brightness(88%) contrast(82%);',
  fire: 'filter: brightness(0) saturate(100%) invert(65%) sepia(70%) saturate(2963%) hue-rotate(341deg) brightness(99%) contrast(89%);',
  water: 'filter: brightness(0) saturate(100%) invert(51%) sepia(78%) saturate(1166%) hue-rotate(198deg) brightness(95%) contrast(97%);',
  electric: 'filter: brightness(0) saturate(100%) invert(93%) sepia(43%) saturate(7037%) hue-rotate(330deg) brightness(99%) contrast(95%)',
  grass: 'filter: brightness(0) saturate(100%) invert(100%) sepia(34%) saturate(3872%) hue-rotate(36deg) brightness(83%) contrast(82%);',
  ice: 'filter: brightness(0) saturate(100%) invert(97%) sepia(90%) saturate(410%) hue-rotate(111deg) brightness(90%) contrast(87%);',
  fighting: 'filter: brightness(0) saturate(100%) invert(27%) sepia(31%) saturate(5738%) hue-rotate(346deg) brightness(79%) contrast(90%);',
  poison: 'filter: brightness(0) saturate(100%) invert(28%) sepia(54%) saturate(1724%) hue-rotate(269deg) brightness(97%) contrast(86%);',
  ground: 'filter: brightness(0) saturate(100%) invert(100%) sepia(20%) saturate(6813%) hue-rotate(319deg) brightness(92%) contrast(91%);',
  flying: 'filter: brightness(0) saturate(100%) invert(64%) sepia(58%) saturate(1654%) hue-rotate(208deg) brightness(95%) contrast(101%);',
  psychic: 'filter: brightness(0) saturate(100%) invert(50%) sepia(83%) saturate(2756%) hue-rotate(312deg) brightness(100%) contrast(95%);',
  bug: 'filter: brightness(0) saturate(100%) invert(66%) sepia(74%) saturate(472%) hue-rotate(23deg) brightness(90%) contrast(92%);',
  rock: 'filter: brightness(0) saturate(100%) invert(60%) sepia(94%) saturate(318%) hue-rotate(13deg) brightness(89%) contrast(85%);',
  ghost: 'filter: brightness(0) saturate(100%) invert(37%) sepia(6%) saturate(4004%) hue-rotate(224deg) brightness(95%) contrast(81%);',
  dragon: 'filter: brightness(0) saturate(100%) invert(37%) sepia(96%) saturate(7481%) hue-rotate(256deg) brightness(103%) contrast(98%);',
  dark: 'filter: brightness(0) saturate(100%) invert(37%) sepia(5%) saturate(2788%) hue-rotate(341deg) brightness(88%) contrast(86%);',
  steel: 'filter: brightness(0) saturate(100%) invert(98%) sepia(40%) saturate(4982%) hue-rotate(180deg) brightness(85%) contrast(88%);',
  fairy: 'filter: brightness(0) saturate(100%) invert(66%) sepia(84%) saturate(324%) hue-rotate(292deg) brightness(86%) contrast(94%);'
}
*/



//Estrae i dati da pokeapi e li mostra in una lista

fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  .then((response) => response.json())
  .then((data) => {
    data.results.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokeData) => {
          const pokemonDiv = document.createElement('div');
          pokemonDiv.classList.add('pokemon');
          pokemonDiv.classList.add(pokeData.types[0].type.name);
          pokemonDiv.id = pokemon.name;
          pokemonDiv.innerHTML = `
            <p class='number'>#${pokeData.id}</p>
            <p>
              ${pokeData.types.map((type) => (
                `<img src="./icons/${type.type.name}.svg" alt="${type.type.name}" id="${type.type.name}" class="pokemon__types ${type.type.name}"/>`
              )).join('')}
            </p>
            <img src="${pokeData.sprites.front_default}" alt="${pokemon.name}" class="pokemon__foto"/>
            <h2>${pokemon.name}</h2>
            <p class='height'>Height: ${pokeData.height}</p>
            <p class='weight'>Weight: ${pokeData.weight}</p>
          `;
          document.querySelector('.pokemon__container').appendChild(pokemonDiv);
        });
    }
  )
}
)





//Search bar per cercare i pokemon dall'id

const search = () => {
  const search = document.querySelector('input').value.toLowerCase()
  const pokemon = document.getElementById(search)
  if (pokemon) {
    pokemon.scrollIntoView({ behavior: 'smooth' })
    const pokemonContainer = document.querySelector('.pokemon__container')
    const allPokemon = pokemonContainer.querySelectorAll('.pokemon')
    allPokemon.forEach((p) => {
      if (p.id === search) {
        p.style.display = 'block'
      } else {
        p.style.display = 'none'
      }
    })
  } else {
    alert('Pokemon not found')
  }
}




function App() {
  return(
    <React.Fragment> {/* Wrap the JSX code with a React.Fragment element */}
      <div className="App">
        <header className="App-header">
          <h1><img src="./icons/pokèball.svg" alt="pokè ball"></img>Pokèdex</h1>
        </header>
        <div className='search__wrap'>
          <input name='Pokemon_search' type='text' placeholder='Search Pokemon'/>
          <button onClick={search}>
            <FaSearchPlus />
          </button>
        </div>
        <div className='pokemon__container'>
        </div>
      </div>
    </React.Fragment>
  )
}




export default App