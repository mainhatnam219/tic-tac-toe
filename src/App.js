import { useState } from 'react';

// FEATURE 4: Square component with winning highlight
function Square({ value, onSquareClick, winning }) {
  return (
    <button 
      className={`square ${winning ? 'winning' : ''}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

// FEATURE 2: Board rewritten with two loops
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    const winnerInfo = calculateWinner(squares);
    if (winnerInfo || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    // FEATURE 5: Pass square index to track location
    onPlay(nextSquares, i);
  }

  const winnerInfo = calculateWinner(squares);
  let status;
  
  if (winnerInfo) {
    status = 'Winner: ' + winnerInfo.winner;
  } else if (squares.every(square => square !== null)) {
    // FEATURE 4: Check for draw
    status = 'Draw - No one wins!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // FEATURE 2: Use two loops instead of hardcoding squares
  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const squaresInRow = [];
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      const isWinningSquare = winnerInfo && winnerInfo.line.includes(index);
      squaresInRow.push(
        <Square 
          key={index}
          value={squares[index]} 
          onSquareClick={() => handleClick(index)}
          winning={isWinningSquare}
        />
      );
    }
    boardRows.push(
      <div key={row} className="board-row">
        {squaresInRow}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}

export default function Game() {
  // FEATURE 5: Modified history to store location data
  const [history, setHistory] = useState([{squares: Array(9).fill(null), location: null}]);
  const [currentMove, setCurrentMove] = useState(0);
  // FEATURE 3: State for sort toggle
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, squareIndex) {
    // FEATURE 5: Calculate row and col from square index
    const row = Math.floor(squareIndex / 3);
    const col = squareIndex % 3;
    
    const nextHistory = [
      ...history.slice(0, currentMove + 1), 
      {squares: nextSquares, location: {row, col}}
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // FEATURE 3: Toggle sort order function
  function toggleSort() {
    setIsAscending(!isAscending);
  }

  const moves = history.map((step, move) => {
    let description;
    
    // ✅ FEATURE 1: Show "You are at move #..." for current move
    if (move === currentMove) {
      description = move === 0 
        ? 'You are at game start' 
        : `You are at move #${move}`;
      
      // ✅ FEATURE 5: Add location to current move
      if (move > 0 && step.location) {
        description += ` (${step.location.row}, ${step.location.col})`;
      }
      
      return (
        <li key={move}>
          <span className="current-move">{description}</span>
        </li>
      );
    }
    
    // Show button for other moves
    if (move > 0) {
      description = `Go to move #${move}`;
      // ✅ FEATURE 5: Add location to move history
      if (step.location) {
        description += ` (${step.location.row}, ${step.location.col})`;
      }
    } else {
      description = 'Go to game start';
    }
    
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // FEATURE 3: Sort moves based on toggle
  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        {/* FEATURE 3: Sort toggle button */}
        <button className="sort-button" onClick={toggleSort}>
          Sort: {isAscending ? 'Ascending ↓' : 'Descending ↑'}
        </button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
}

// FEATURE 4: Modified to return winner and winning line
function calculateWinner(squares) {
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
      return {winner: squares[a], line: [a, b, c]};
    }
  }
  return null;
}
