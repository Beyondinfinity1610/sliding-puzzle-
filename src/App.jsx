import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameBoard from './components/GameBoard';
import GameWinScreen from './components/WinScreen';

const App = () => {
  const [gameState, setGameState] = useState('start'); // start, playing, complete
  const [playerName, setPlayerName] = useState('');
  const [gameStats, setGameStats] = useState(null);

  const handleStartGame = (name) => {
    setPlayerName(name);
    setGameState('playing');
  };

  const handleGameComplete = (stats) => {
    setGameStats(stats);
    setGameState('complete');
  };

  const handleReplay = () => {
    setGameState('playing');
  };

  const handleNewGame = () => {
    setGameState('start');
    setPlayerName('');
    setGameStats(null);
  };

  return (
    <div className="min-h-screen bg-[#1e1e2f]">
      {gameState === 'start' && <StartScreen onStartGame={handleStartGame} />}
      {gameState === 'playing' && (
        <GameBoard
          playerName={playerName}
          onGameComplete={handleGameComplete}
        />
      )}
      {gameState === 'complete' && (
        <GameWinScreen
          stats={gameStats}
          onReplay={handleReplay}
          onNewGame={handleNewGame}
        />
      )}
    </div>
  );
};

export default App;