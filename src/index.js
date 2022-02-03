import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ButtonPad from './buttonpad';
import Board from './board';
import Counters from './widgets/counters';
import GameControls from './gameControls';
import GameSelectors from './widgets/gameSelectors';
import {fillBoard} from './widgets/helper';
import sudoku from './sudokuGenerator/sudoku';

function App(){
  const [selectedCell, setSelectedCell] = useState(null);
  const [gameState, setGameState] = useState("RUN");
  const [difficulty, setDifficulty] = useState('easy');
  const [timeLimit, setTimeLimit] = useState(5);
  const [incomingValue, setIncomingValue] = useState(null);
  const [board, setBoard] = useState(() => fillBoard(sudoku.generate('easy')));
  const lives = useRef(3);


  function handleClickedCell(key){
    if (selectedCell === key) {
      setSelectedCell(null);
    } else {
      setSelectedCell(key);
    }
  }

  function setBoardFromChild(newBoard){
    setBoard(newBoard);
  }


  function setIncomingValueFromChild(newValue){
    setIncomingValue(newValue);
  }

  function setGameStateFromChild(state){
    setGameState(state);
  }

  function timeIsFinished(){
    setGameState("LOST");
  }

  function setLivesFromChild(newLives){
    lives.current = newLives;
    if (lives.current === 0){
      setGameState("LOST");
    }
  }

  function changeDifficulty(event){
    setDifficulty(event.target.value);
  }

  function changeTime(event){
    setTimeLimit(parseInt(event.target.value))
  }

   function restartGame(){
    setGameState("RESET");
    setBoard(fillBoard(sudoku.generate(difficulty)));
    setSelectedCell(null);
    lives.current = 3;
    setTimeout(() => setGameState("RUN"), 50);
  }

    return (
      <div className="container">
        <div className="title-container">
          {' '}
          <h1>Welcome to Sudokkk</h1> <h4>a new version with nothing new</h4>
        </div>
        <Counters 
          lives={lives.current} 
          gameState={gameState} 
          setGameStateFromChild={setGameStateFromChild}
          timeIsFinished={timeIsFinished}
          timeLimit={timeLimit}
          />
        <GameSelectors changeDifficulty={changeDifficulty} changeTime={changeTime} />
        <GameControls
          restartGame={restartGame}
          setGameStateFromChild={setGameStateFromChild}
          gameState={gameState}
          incomingValue={incomingValue}
          setIncomingValue={setIncomingValue}
          selectedCell={selectedCell}
          setIncomingValueFromChild={setIncomingValueFromChild}
          board={board}
        />
        <Board
          onClickCell={handleClickedCell}
          selectedCell={selectedCell}
          gameState={gameState}
          incomingValue={incomingValue}
          setLivesFromChild={setLivesFromChild}
          lives={lives.current}
          board={board}
          setBoardFromChild={setBoardFromChild}
        />
        <ButtonPad onClickButton={setIncomingValueFromChild}/>
      </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
