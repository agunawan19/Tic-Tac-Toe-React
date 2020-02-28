import React, { useState } from 'react';
import Square from './square/square';

function Board (props) {
  const renderSquare = (i) => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }

  const renderGrid = () => {
    let board = [];

    for (let i = 0; i < 3; i++ ) {
      let columns = [];

      for (let j = 0; j < 3; j++) {
        columns.push(renderSquare(i + j + i * 2));
      }

      board.push(<div className="board-row">{columns}</div>);
    }

    return board;
  }


  return (
    <div>
      {renderGrid()}
    </div>
  );
}

export default Board;
