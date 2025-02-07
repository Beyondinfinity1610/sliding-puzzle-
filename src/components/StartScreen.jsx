import React, { useState } from 'react';
import Header from './Header';

const StartScreen = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      onStartGame(playerName);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e2f] text-white p-8">
      <div className="max-w-lg mx-auto">
        
        <Header/>
        
        <form onSubmit={handleSubmit} className="space-y-8 mt-5">
          <div className="space-y-2">
            <label htmlFor="playerName" className="block text-lg">
              Enter your name
            </label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-200 text-black"
              placeholder="Player Name"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-6 rounded hover:bg-teal-700 transition-colors"
          >
            Start game
          </button>
        </form>

        <div className="mt-16 space-y-6">
          <h2 className="text-xl font-bold">Gameplay Rules</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2">1. Sliding Moves:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Only tiles that are adjacent (above, below, left, or right) to the empty space can move.</li>
                <li>When you click or tap an adjacent tile, it slides into the empty space.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">2. Goal:</h3>
              <ul className="list-disc pl-5">
                <li>Arrange the tiles so that they are in order, with the empty space at the bottom-right, in the least number of moves.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">3. Winning Condition:</h3>
              <ul className="list-disc pl-5">
                <li>Complete the puzzle with the least number of moves in the shortest time possible.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;