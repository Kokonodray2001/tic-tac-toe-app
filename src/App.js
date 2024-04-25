import { useState } from "react";
import { Board } from "./components/Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const newHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    // move is the index
    let description;
    if (move > 0) {
      description = `GO TO MOVE #${move}`;
    } else {
      description = `GO TO SATRT`;
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          xIsNext={xIsNext}
          squares={currentSquare}
          onplay={handlePlay}
        ></Board>
        <div className='game-info'>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}
