import {useState, useEffect} from 'react';
import './FilterByType.scss';
import {FaXmark} from 'react-icons/fa6';

function FilterByType() {

    const [type, setType] = useState('');

    useEffect(() => {
        const filter = () => {
            const pokemon = document.querySelectorAll('.pokemon');
            pokemon.forEach((poke) => {
                if (poke.classList.contains(type)) {
                    poke.style.display = 'flex';
                } else {
                    poke.style.display = 'none';
                }
            });
        }
        filter();
    }, [type]);

    function handleTypeClick(type) {
        setType(type);
    }

    return (
        <div className='filters'>
            <FaXmark className='types' onClick={() => setType('pokemon')}/>
            <img src='../svgs/bug.svg' alt='bug' className='types bug' onClick={() => handleTypeClick('bug')}/>
            <img src='../svgs/dragon.svg' alt='dragon' className='types dragon' onClick={() => handleTypeClick('dragon')}/>
            <img src='../svgs/electric.svg' alt='electric' className='types electric' onClick={() => handleTypeClick('electric')}/>
            <img src='../svgs/fairy.svg' alt='fairy' className='types fairy' onClick={() => handleTypeClick('fairy')}/>
            <img src='../svgs/fighting.svg' alt='fighting' className='types fighting' onClick={() => handleTypeClick('fighting')}/>
            <img src='../svgs/fire.svg' alt='fire' className='types fire' onClick={() => handleTypeClick('fire')}/>
            <img src='../svgs/flying.svg' alt='flying' className='types flying' onClick={() => handleTypeClick('flying')}/>
            <img src='../svgs/ghost.svg' alt='ghost' className='types ghost' onClick={() => handleTypeClick('ghost')}/>
            <img src='../svgs/grass.svg' alt='grass' className='types grass' onClick={() => handleTypeClick('grass')}/>
            <img src='../svgs/ground.svg' alt='ground' className='types ground' onClick={() => handleTypeClick('ground')}/>
            <img src='../svgs/ice.svg' alt='ice' className='types ice' onClick={() => handleTypeClick('ice')}/>
            <img src='../svgs/normal.svg' alt='normal' className='types normal' onClick={() => handleTypeClick('normal')}/>
            <img src='../svgs/poison.svg' alt='poison' className='types poison' onClick={() => handleTypeClick('poison')}/>
            <img src='../svgs/psychic.svg' alt='psychic' className='types psychic' onClick={() => handleTypeClick('psychic')}/>
            <img src='../svgs/rock.svg' alt='rock' className='types rock' onClick={() => handleTypeClick('rock')}/>
            <img src='../svgs/steel.svg' alt='steel' className='types steel' onClick={() => handleTypeClick('steel')}/>
            <img src='../svgs/water.svg' alt='water' className='types water' onClick={() => handleTypeClick('water')}/>
        </div>
    )
}

export default FilterByType;