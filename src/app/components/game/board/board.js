import React, { Component } from 'react';
import Square from './square/square';

class Board extends Component {

  renderSquare = (i) => {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderGrid = () => {
    let board = [];

    for (let i = 0; i < 3; i++ ) {
      let columns = [];

      for (let j = 0; j < 3; j++) {
        columns.push(this.renderSquare(i + j + i * 2));
      }

      board.push(<div className="board-row">{columns}</div>);
    }

    return board;
  }

  render() {
    return (
      <div>
        {this.renderGrid()}
      </div>
    );
  }
}

export default Board;
