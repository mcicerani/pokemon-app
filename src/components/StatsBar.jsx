import React from "react";
import PropTypes from 'prop-types'

function StatsBar({ selectedPokemon }) {
    return (
        <React.Fragment>
            {selectedPokemon.stats.map((stat) => (
                <div key={stat.name}>
                    <div>{stat.name}:{stat.value}</div>
                    <div
                        style={{
                            width: `${(stat.value / 150) * 100}%`,
                            backgroundColor: stat.value > 89 ? "green" : stat.value > 29 ? "orange" : "red",
                            height: "10px",
                        }}
                    ></div>
                </div>
            ))}
        </React.Fragment>
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