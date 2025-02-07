import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';


const WinScreen = ({ stats, onReplay, onNewGame }) => {
  return (
    <motion.div 
      className="min-h-screen bg-[#1e1e2f] text-white p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-lg mx-auto">
        <Header />
        
        <motion.div 
          className="space-y-16 mt-12"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          <div className="bg-gray-200 rounded-lg py-3 px-6">
            <h2 className="text-2xl font-bold text-black text-center">
              Puzzle Complete!  
            </h2>
          </div>

          <div className="text-center space-y-2">
            <p className="text-lg">Time Taken</p>
            <p className="text-6xl font-bold">{stats.time}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={onReplay}
              className="w-full bg-teal-600 text-white py-4 px-6 rounded hover:bg-teal-700 transition-colors"
              aria-label="Replay current puzzle"
            >
              Replay
            </button>
            <button
              onClick={onNewGame}
              className="w-full bg-white text-black py-4 px-6 rounded hover:bg-gray-100 transition-colors"
              aria-label="Start new game"
            >
              New game
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WinScreen;