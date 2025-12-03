import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Spinner() {
  const [loadingStep, setLoadingStep] = useState(0);
  
  const loadingSteps = [
    "Connecting to job database...",
    "Searching for matching positions...",
    "Filtering results...",
    "Almost done..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % loadingSteps.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <motion.div 
        className="custom-spinner"
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          rotate: { duration: 1, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="spinner-ring"></div>
        <div className="spinner-ring-2"></div>
        <div className="spinner-ring-3"></div>
      </motion.div>
      
      <motion.div
        className="loading-text"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {loadingSteps[loadingStep]}
      </motion.div>
      
      <motion.div
        className="loading-subtitle"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        This usually takes 3-5 seconds
      </motion.div>
    </div>
  );
}
