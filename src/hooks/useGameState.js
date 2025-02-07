// hooks/useGameState.js
import { useState, useEffect } from 'react';

export const useGameState = (gridSize = 3) => {
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const initializeTiles = () => {
    let numbers;
    do {
      numbers = Array.from({ length: gridSize * gridSize }, (_, i) => i);
      // Shuffle array
      for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }
    } while (!isSolvable(numbers) || isPuzzleSolved(numbers));
    
    setTiles(numbers);
    setMoves(0);
    setIsComplete(false);
  };

  // Check if the puzzle is solvable
  const isSolvable = (numbers) => {
    let inversions = 0;
    const emptyTileRow = Math.floor(numbers.indexOf(gridSize * gridSize - 1) / gridSize);

    for (let i = 0; i < numbers.length - 1; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[i] > numbers[j] && 
            numbers[i] !== gridSize * gridSize - 1 && 
            numbers[j] !== gridSize * gridSize - 1) {
          inversions++;
        }
      }
    }

    // For a 3x3 puzzle:
    // If the empty tile is on an even row counting from the bottom,
    // the number of inversions must be odd for the puzzle to be solvable
    // If the empty tile is on an odd row counting from the bottom,
    // the number of inversions must be even for the puzzle to be solvable
    const emptyTileRowFromBottom = gridSize - 1 - emptyTileRow;
    return emptyTileRowFromBottom % 2 === inversions % 2;
  };

  // Check if the puzzle is solved
  const isPuzzleSolved = (currentTiles) => {
    // The last tile (empty space) should be at the bottom right
    if (currentTiles[currentTiles.length - 1] !== currentTiles.length - 1) {
      return false;
    }

    // Check if all other tiles are in order
    for (let i = 0; i < currentTiles.length - 1; i++) {
      if (currentTiles[i] !== i) {
        return false;
      }
    }
    return true;
  };

  const moveTile = (index) => {
    const emptyIndex = tiles.indexOf(gridSize * gridSize - 1);
    if (!isAdjacent(index, emptyIndex)) return;

    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
    setTiles(newTiles);
    setMoves(moves + 1);

    // Check if puzzle is solved after the move
    if (isPuzzleSolved(newTiles)) {
      setIsComplete(true);
    }
  };

  const isAdjacent = (index1, index2) => {
    const row1 = Math.floor(index1 / gridSize);
    const col1 = index1 % gridSize;
    const row2 = Math.floor(index2 / gridSize);
    const col2 = index2 % gridSize;
    
    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
  };
  const forceGameComplete = () => {
    setIsComplete(true);
  };
  return {
    tiles,
    moves,
    isComplete,
    initializeTiles,
    moveTile,
    forceGameComplete // ✅ Add this
  };
};