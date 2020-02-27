export const calculateWinner = (squares) => {
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

export const getCoordinate = (square) => {
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
