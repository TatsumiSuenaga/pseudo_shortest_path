import React, { useReducer } from "react";
import styled from "styled-components";
import { bfs } from "../utils/BFS";

// graph size
const GRID_SIZE = 8;
/**
 * STYLES
 */
const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 75px;
  border: 1px solid black;
  cursor: pointer;
  background: ${(props) => props.color};
`;

/**
 * Init functions
 */
const initSquare = (coords) => {
  return {
    color: "white",
    coordinates: coords
  };
};

const initGrid = (size) => {
  let grid = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(initSquare([i, j]));
    }
    grid.push(row);
  }
  return grid;
};

const initialState = () => {
  return {
    grid: initGrid(GRID_SIZE),
    start: [0, 0]
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "BFS":
      const bfsGrid = bfs(initGrid(GRID_SIZE), state.start, action.destination);
      return { grid: bfsGrid, start: action.destination };
    default:
      throw new Error("Unhandled action found");
  }
};

export default () => {
  /**
   * This application returns UI representation of the pseudo-BFS shortest path
   * TODO: actually make this into BFS next time
   */
  const [state, dispatch] = useReducer(reducer, initialState());
  return (
    <Col>
      {state.grid.map((row, idx) => (
        <Row key={idx}>
          {row.map((square) => (
            <Square
              key={square.coordinates.join("/")}
              color={square.color}
              onClick={() => {
                dispatch({ type: "BFS", destination: square.coordinates });
              }}
            >
              [{square.coordinates[0] + 1}, {square.coordinates[1] + 1}]
            </Square>
          ))}
        </Row>
      ))}
    </Col>
  );
};
