import React from 'react';
import PropTypes from 'prop-types';

function Square(props){
    let {selectedCell, id, value} = props;
    
    return (<div
      className={
        selectedCell === id ? 'square square-selected' : 'square'
      }
      onClick={
        value === '.'
          ? () => props.onClickCell(id)
          : null
      }
    >
      <p className="square-text">{value}</p>
    </div>);
}

Square.propTypes = {
  selectedCell: PropTypes.string,
  finished: PropTypes.bool,
  onClickCell: PropTypes.func,
  id: PropTypes.string,
}

export default Square;
