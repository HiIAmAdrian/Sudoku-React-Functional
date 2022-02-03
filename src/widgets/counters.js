import React from 'react';
import PropTypes from 'prop-types';
import Timer from './timer';

function Counters(props){
    let { lives, gameState, setGameStateFromChild, timeLimit, timeIsFinished} = props;
    let livesText = 'Lives left: ' + lives;
    
    return (
        <div className="counters-container">
          <p className="lives-left"> {livesText}</p>
          <Timer 
            setGameStateFromChild={setGameStateFromChild}
            gameState={gameState} 
            timeLimit={timeLimit}
            timeIsFinished={timeIsFinished}
            />
          <h2 className="message">{gameState === "LOST" ? "You Lost" : ""}</h2>
        </div>
    );
}

Counters.propTypes = {
  lives: PropTypes.number,
}

export default Counters;
