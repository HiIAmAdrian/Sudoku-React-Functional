import React from 'react';
import PropTypes from 'prop-types';
//import { transformBoardToStr } from "./widgets/helper";
//import sudoku from './sudokuGenerator/sudoku';

function ButtonPad(props){
    //let {selectedCell, lives, setLives, paused, finished, timer, setFinished, board, setBoard, setSelectedCell, setWinStatus} = props;
    let {onClickButton} = props;
    let pad = [];
    for (let i = 1; i <= 9; i++) {
      pad.push(
        <button
          key={'nb' + i}
          id={'nb' + i}
          onClick={() => onClickButton(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="number-pad-container">
        <div className="number-pad">{pad}</div>
      </div>
    );
}

ButtonPad.propTypes = {
  onClickButton: PropTypes.func,
}

export default ButtonPad;
