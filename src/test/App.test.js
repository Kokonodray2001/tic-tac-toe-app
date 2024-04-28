import Game from "../App";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
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

test("displays initial text", () => {
  render(<Game />);
  const nextPlayerDisplayText = screen.getByText("Next Player : X");
  expect(nextPlayerDisplayText).toBeInTheDocument();
  const moveButtonText = screen.getByText("GO TO SATRT");
  expect(moveButtonText).toBeInTheDocument();
});

test("player should be able to make moves ", () => {
  render(<Game />);
  const gameBoard = screen.queryByTestId("board");
  expect(gameBoard).not.toBeNull();
  if (gameBoard) {
    const squares = gameBoard.querySelectorAll("button");
    fireEvent.click(squares[1]);
    expect(squares[1].textContent).toBe("X");
    fireEvent.click(squares[3]);
    expect(squares[3].textContent).toBe("O");
    fireEvent.click(squares[6]);
    expect(squares[6].textContent).toBe("X");
  }
});

test("Next Player is displayed correctly ", () => {
  render(<Game />);
  const gameBoard = screen.queryByTestId("board");
  expect(gameBoard).not.toBeNull();
  if (gameBoard) {
    const squares = gameBoard.querySelectorAll("button");
    fireEvent.click(squares[1]);
    expect(screen.getByText("Next Player : O")).toBeInTheDocument();
    fireEvent.click(squares[3]);
    expect(screen.getByText("Next Player : X")).toBeInTheDocument();
    fireEvent.click(squares[6]);
    expect(screen.getByText("Next Player : O")).toBeInTheDocument();
  }
});

test("Move History us displayed correctly ", () => {
  render(<Game />);
  const gameBoard = screen.queryByTestId("board");
  expect(gameBoard).not.toBeNull();
  if (gameBoard) {
    const squares = gameBoard.querySelectorAll("button");
    fireEvent.click(squares[1]);
    expect(screen.getByText("GO TO MOVE #1")).toBeInTheDocument();
    fireEvent.click(squares[3]);
    expect(screen.getByText("GO TO MOVE #2")).toBeInTheDocument();
    fireEvent.click(squares[6]);
    expect(screen.getByText("GO TO MOVE #3")).toBeInTheDocument();
  }
});

test("Winner is displayed correctly", () => {
  render(<Game />);
  const gameBoard = screen.queryByTestId("board");
  expect(gameBoard).not.toBeNull();
  if (gameBoard) {
    const squares = gameBoard.querySelectorAll("button");
    fireEvent.click(squares[0]);
    fireEvent.click(squares[3]);
    fireEvent.click(squares[1]);
    fireEvent.click(squares[6]);
    fireEvent.click(squares[2]);
    expect(screen.getByText("Winner:X")).toBeInTheDocument();
  }
});

test("Time travel is working correctly", () => {
  render(<Game />);
  const gameBoard = screen.queryByTestId("board");
  const gameInfo = screen.queryByTestId("game-info");
  expect(gameInfo).not.toBeNull();
  expect(gameBoard).not.toBeNull();
  var squares;
  if (gameBoard) {
    squares = gameBoard.querySelectorAll("button");
    fireEvent.click(squares[0]);
    fireEvent.click(squares[3]);
    fireEvent.click(squares[1]);
    fireEvent.click(squares[6]);
  }
  if (gameInfo) {
    const moves = gameInfo.querySelectorAll("button");
    fireEvent.click(moves[3]);
    expect(squares[0].textContent).toBe("X");
    expect(squares[3].textContent).toBe("O");
    expect(squares[1].textContent).toBe("X");
    expect(squares[6].textContent).toBe("");
  }
});
