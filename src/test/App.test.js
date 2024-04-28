import Game from "../App";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Board } from "../components/Board";
import { Square } from "../components/Square";

const onClick = jest.fn(() => {});
test("Game renders correctly", () => {
  render(<Game />);
});

test("Board renders correctly", () => {
  const handlePlay = jest.fn(() => {});
  const testSquare = Array(9).fill(null);
  render(<Board xIsNext={true} squares={testSquare} onplay={handlePlay} />);
  const boardElement = screen.getByTestId("board");
  expect(boardElement).toBeInTheDocument();
});

test("each square renders correctly", () => {
  render(<Square value={"X"} onSquareClick={onClick} />);
  const squareButtonElement = screen.getByTestId("square");
  expect(squareButtonElement).toBeInTheDocument();
  const valueElement = screen.getByText("X");
  expect(valueElement).toBeInTheDocument();
});

test("game info renders correctly", () => {
  render(<Game />);
  const movesListItems = screen.getAllByRole("listitem");
  const movesText = movesListItems.map((item) => item.textContent).join(" ");
  expect(movesText).toBe("GO TO SATRT");
});

test("displays initial move", () => {
  render(<Game />);
  const nextPlayerDisplayText = screen.getByText("Next Player : X");
  expect(nextPlayerDisplayText).toBeInTheDocument();
  const moveButtonText = screen.getByText("GO TO SATRT");
  expect(moveButtonText).toBeInTheDocument();
});
