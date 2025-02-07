import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameState } from '../hooks/useGameState';
import { useTimer } from '../hooks/useTimer';
import { usePixabayImages } from '../hooks/usePixabayImages';
import Header from './Header';

const GameBoard = ({ playerName, onGameComplete }) => {
  const { tiles, moves, isComplete, initializeTiles, moveTile,forceGameComplete } = useGameState(3);
  const { time, formatTime, startTimer, stopTimer, resetTimer } = useTimer();
  const { image, isLoading } = usePixabayImages();

  useEffect(() => {
    // Initialize game
    resetTimer();
    initializeTiles();
    startTimer();

    return () => stopTimer();
  }, []);

  useEffect(() => {
    if (isComplete && moves > 0) {
      stopTimer();
      onGameComplete({ moves, time: formatTime() });
    }
  }, [isComplete, moves]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1e1e2f] text-white flex items-center justify-center">
        <div className="text-xl">Loading puzzle...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1e2f] text-white p-8">
      <div className="w-full max-w-lg mx-auto">
        <Header />
  
        <div className="mt-8 mb-8">
          <div className="bg-white text-black px-6 py-2 rounded text-center">
            Moves: {moves}
          </div>
        </div>
  
        <div className="aspect-square w-full bg-gray-800 p-1 rounded">
          <div className="grid grid-cols-3 gap-1 h-full">
            <AnimatePresence>
              {tiles.map((tileIndex, currentIndex) => (
                <motion.div
                  key={tileIndex}
                  layout
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  onClick={() => moveTile(currentIndex)}
                  className={`relative ${tileIndex === 8 ? 'invisible' : ''}`}
                >
                  {tileIndex !== 8 && (
                    <div
                      className="w-full h-full bg-cover bg-no-repeat rounded cursor-pointer"
                      style={{
                        backgroundImage: `url(${image})`,
                        backgroundPosition: `${(tileIndex % 3) * 50}% ${Math.floor(tileIndex / 3) * 50}%`,
                        backgroundSize: '300%'
                      }}
                      aria-label={`Tile ${tileIndex + 1}`}
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
           
          </div>
        </div>
        <button   className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={forceGameComplete}>CLICK HERE TO END (min 1 move)
        </button>

      </div>
    </div>
  );
};

export default GameBoard;