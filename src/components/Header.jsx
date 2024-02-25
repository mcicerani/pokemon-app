import React from 'react';
import { FaSearchPlus } from "react-icons/fa";
import './Header.scss';

// Funzione ricarca pokemon fa rimenere solo il pokemon cercato

function search() {
    const input = document.querySelector('input').value.toLowerCase();
    const pokemon = document.querySelectorAll('.pokemon');
    pokemon.forEach((poke) => {
        if(poke.id.includes(input)) {
            poke.style.display = 'flex';
        } else {
            poke.style.display = 'none';
        }
    });
}





function Header() {
    return(
        <React.Fragment>
            <header className="App-header">
                <h1><img src="../src/assets/pokèball.svg" alt="pokè ball"></img>Pokèdex</h1>
            </header>
            <div className='search__wrap'>
                <input name='Pokemon_search' type='text' placeholder='Search Pokemon'/>
                <button onClick={search}>
                <FaSearchPlus />
                </button>
            </div>
        </React.Fragment>
    )
}

export default Header