import { useState, useEffect } from 'react';
import { FaSearchPlus } from "react-icons/fa";
import './Header.scss';
import React from 'react';
import FilterByType from './FilterByType.jsx'


function Header() {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    useEffect(() => {
        const search = () => {
            const input = query.toLowerCase();
            const pokemon = document.querySelectorAll('.pokemon');
            pokemon.forEach((poke) => {
                if (poke.id.includes(input)) {
                    poke.style.display = 'flex';
                } else {
                    poke.style.display = 'none';
                }
            });
        }
        search();
    }, [query]);

    return (
        <React.Fragment>
            <header className="App-header">
                <h1>
                    <img src="../svgs/pokèball.svg" alt="pokè ball"></img>
                    Pokèdex
                    <img src="../svgs/pokèball.svg" alt="pokè ball"></img>
                </h1>
            </header>
            <div className='search__wrap'>
                <input name='Pokemon_search' type='text' placeholder='Search Pokemon' onChange={handleChange} />
                <button>
                    <FaSearchPlus />
                </button>
            </div>
            <FilterByType />
        </React.Fragment>
    )
}

export default Header;