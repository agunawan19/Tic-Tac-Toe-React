import React, { Component } from 'react';
import Board from './board/board';

class Game extends Component {
  token = {
    X: 'X',
    O: 'O'
  };

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        lastSquare: -1
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';

        console.log(step);
        console.log(move);
      return (
        <li key={move}>

          <button onClick={() => this.jumpTo(move)}>{desc}</button>
          <span>{step.lastSquare > -1 ? ` (${this.getCoordinate(step.lastSquare).toString()})` : ''}</span>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? this.token.X : this.token.O);
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? this.token.X : this.token.O;

    this.setState({
      history: history.concat([{
        squares: squares,
        lastSquare: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  calculateWinner = (squares) => {
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

  getCoordinate = (square) => {
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
}

export default Game;
