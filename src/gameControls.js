import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import sudoku from './sudokuGenerator/sudoku';
import { transformBoardToStr } from './widgets/helper';

function GameControls(props){

    let { restartGame, setGameStateFromChild, board,
       gameState, selectedCell, setIncomingValueFromChild } = props;
    const nrHints = useRef(3);
    const hintButtonText = nrHints.current > 0 ? 'Hint' : 'No Hints Left';
    const pauseButtonText = () => {
      if (gameState === "PAUSE"){
        return "Resume Game";
      } else if (gameState === "RUN"){
        return "Pause Game";
      } else if (gameState === "FINISHED" || gameState === "LOST"){
        return "Game Finished";
      }
    };

    if (gameState === "RESET"){
      nrHints.current = 3;
    }

    function giveHint(){
      if (selectedCell && nrHints.current > 0) {
        let i = parseInt(selectedCell.charAt(0));
        let j = parseInt(selectedCell.charAt(1));
        let hintNbIndex = i * 9 + j;
        let strBoard = transformBoardToStr(board);
        let strBoardSolved = sudoku.solve(strBoard);
        nrHints.current--;
        setIncomingValueFromChild(strBoardSolved.charAt(hintNbIndex));
      }
    }
    
    function pauseResume(){
      if (gameState === "RUN") {
        setGameStateFromChild("PAUSE");
        
      } else if (gameState === "PAUSE"){
        setGameStateFromChild("RUN");
      }
    }

    return (
      <div className="buttons-container">
         <button 
          onClick={restartGame} 
          className="start-button" 
          type="button"
         >
          Restart
        </button>
        <button
          onClick={giveHint}
          className="hint-button"
          type="button"
          disabled={nrHints.current > 0 && gameState === "RUN" ? false : true}
        >
          {hintButtonText}
        </button>
        <button 
          onClick={pauseResume} 
          className="pause-button"
          type="button"
          disabled={pauseButtonText() === "Game Finished" ? true : false}
        >
          {pauseButtonText()}
        </button>
        <p className="hint-message" type="button">
          Hints Left: {nrHints.current}
        </p>
      </div>
    );
}

GameControls.propTypes = {
  nrHints: PropTypes.number,
  restartGame: PropTypes.func,
  giveHint: PropTypes.func,
  pauseResumeGame: PropTypes.func,
  finished: PropTypes.bool,
}

export default GameControls;
