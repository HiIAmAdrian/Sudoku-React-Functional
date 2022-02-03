import React from 'react';
import PropTypes from 'prop-types';

function GameSelectors(props){
    let { changeDifficulty, changeTime } = props;

    return (
      <React.Fragment>
        <div className="difficulty-container">
          <div className="another">
            <p>Choose difficulty:</p>
            <div className="buttons-difficulty">
              <label htmlFor="easy">
                <input
                  onChange={changeDifficulty}
                  type="radio"
                  className="easy"
                  name="difficulty"
                  value="easy"
                />{' '}
                Easy
              </label>
              <label htmlFor="medium">
                <input
                  onChange={changeDifficulty}
                  type="radio"
                  className="medium"
                  name="difficulty"
                  value="medium"
                />{' '}
                Medium
              </label>
              <label htmlFor="hard">
                <input
                  onChange={changeDifficulty}
                  type="radio"
                  className="hard"
                  name="difficulty"
                  value="hard"
                />{' '}
                Hard
              </label>
            </div>
          </div>
        </div>
        <div className="choose-time-container">
          <div className="another">
            <p>Choose time: </p>
            <div className="time-options">
              <label htmlFor="5min">
                <input
                  onChange={changeTime}
                  type="radio"
                  name="time"
                  value="5"
                />{' '}
                5 min
              </label>
              <label htmlFor="7min">
                <input
                  onChange={changeTime}
                  type="radio"
                  name="time"
                  value="7"
                />{' '}
                7 min
              </label>
              <label htmlFor="10min">
                <input
                  onChange={changeTime}
                  type="radio"
                  name="time"
                  value="10"
                />{' '}
                10 min
              </label>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
}

GameSelectors.propTypes = {
  changeDifficulty: PropTypes.func,
  changeTimer: PropTypes.func,
}

export default GameSelectors;
