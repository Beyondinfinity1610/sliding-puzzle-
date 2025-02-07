import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.div 
      className="flex items-center justify-center gap-6"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
    
      <div className="w-20 h-20">
        <img 
          src='src\assets\WhatsApp_Image_2025-02-03_at_13.55.11_717e7ccd-removebg-preview.png'   
          alt="Slide Logo" 
          className="w-full h-full object-contain backdrop-opacity-0 mix-blend-normal border-collapse"
        />
      </div>
      
      {/* "Slide!" text */}
      <h1 className="text-4xl text-teal-500" style={{ fontFamily: 'cursive' }}>
        Slide!
      </h1>
    </motion.div>
  );
};

export default Header;