export const bfs = (grid, start, end) => {
  let newGrid = grid.slice();
  const rowIter = start[0] < end[0] ? 1 : -1;
  const colIter = end[1] < start[1] ? 1 : -1;
  let row = start[0];
  let col = end[1];
  while (row !== end[0] || col !== start[1]) {
    if (row !== end[0]) {
      newGrid[row][start[1]] = {
        color: "red",
        coordinates: [row, start[1]]
      };
      row += rowIter;
    }
    if (col !== start[1]) {
      newGrid[end[0]][col] = {
        color: "red",
        coordinates: [end[0], col]
      };
      col += colIter;
    }
  }
  newGrid[row][start[1]] = {
    color: "red",
    coordinates: [row, start[1]]
  };
  return newGrid;
};
