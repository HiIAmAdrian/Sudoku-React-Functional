import Square from './square';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import sudoku from './sudokuGenerator/sudoku';
import { transformBoardToStr } from './widgets/helper';

function Board(props){
  let { selectedCell, onClickCell, gameState, board, setBoardFromChild,
      incomingValue, lives, setLivesFromChild } = props;

  function renderSquare(i, j){
    return (
      <Square
        key={i.toString() + j.toString()}
        id={i.toString() + j.toString()}
        value={board[i][j]}
        onClickCell={onClickCell}
        selectedCell={selectedCell}
      />
    );
  }

  useEffect(() => {
    if (selectedCell && gameState === "RUN") {
      let selectedNb = parseInt(incomingValue);
      let copyBoard = board.map(arr => arr.slice());
      let coordX = parseInt(selectedCell.slice(0, 1));
      let coordY = parseInt(selectedCell.slice(1));
      
      copyBoard[coordX][coordY] = selectedNb;
      setBoardFromChild(copyBoard);
      let isWrong = verifyMistake(copyBoard);
      handleLivesLeft(isWrong);
    }
  },[incomingValue])

  function verifyMistake(copyBoard){
    let copyCopyBoard = board.map(arr => arr.slice());

    if (!sudoku.solve(transformBoardToStr(copyBoard))) {
      let timer;
      timer = setTimeout(() => {
        setBoardFromChild(copyCopyBoard);
        clearTimeout(timer);
      }, 1000);
      return true;
    }
    return false;
  }

  function handleLivesLeft(isWrong){
    isWrong && lives--;
    setLivesFromChild(lives);
  }

    let rows = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        rows.push(renderSquare(i, j));
      }
    }
    return <div className="board-container">{rows}</div>;
}

Board.propTypes = {
  selectedCell: PropTypes.string,
  onClickCell: PropTypes.func,
  finished: PropTypes.bool,
  board: PropTypes.array,
}

export default Board;
