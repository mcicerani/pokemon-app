import PropTypes from 'prop-types'
import './StatsBar.scss';

function StatsBar({ selectedPokemon }) {

    return (
        <div className='stats__container'>
            {selectedPokemon.stats.map((stat) => (
                <div key={stat.name}>
                    <div className="stats"><span className="bold">{stat.name}:</span> {stat.value}</div>
                    <div
                        style={{
                            width: `${(stat.value / 250) * 100}%`,
                            backgroundColor: stat.value > 89 ? "green" : stat.value > 29 ? "yellow" : "orange",
                            height: "10px",
                        }}
                    ></div>
                </div>
            ))}
        </div>
    );
}


StatsBar.propTypes = {
    selectedPokemon: PropTypes.shape({
        stats: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                value: PropTypes.number
            })
        )
    }),
};


export default StatsBar;