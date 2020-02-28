import React, { useState } from 'react';
import Board from './board/board';

function Game() {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
    lastSquare: -1
  }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const token = {
    X: 'X',
    O: 'O'
  };

  const calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  }

  const getCoordinate = square => {
    const coordinates = [];
    const columnCount = 3;
    const rowCount = 3;

    for (let row = 1; row <= rowCount; row++) {
      for (let col = 1; col <= columnCount; col++) {
          coordinates.push([col, row]);
      }
    }

    return coordinates[square];
  };

  const jumpTo = step => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const handleClick = i => {
    const moveHistory = history.slice(0, stepNumber + 1);
    const current = moveHistory[moveHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? token.X : token.O;

    setHistory(moveHistory.concat([{
        squares: squares,
        lastSquare: i,
    }]));
    setStepNumber(moveHistory.length);
    setXIsNext(!xIsNext);
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';

      console.log(step);
      console.log(move);
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
        <span>{step.lastSquare > -1 ? ` (${getCoordinate(step.lastSquare).toString()})` : ''}</span>
      </li>
    );
  });

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? token.X : token.O);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
