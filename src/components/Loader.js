"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Ultra-fast duration - only 0.9 seconds total
  const totalDuration = 0.9;
  const updateInterval = 16; // ~60fps for smooth animation

  // Predefined decorative element properties to avoid hydration errors
  // Using fixed values instead of random generation during rendering
  const decorations = [
    { width: 15, height: 15, top: 10, left: 20, delay: 0.1, x: 20, y: 30 },
    { width: 25, height: 25, top: 30, left: 80, delay: 0.2, x: -10, y: 20 },
    { width: 18, height: 18, top: 70, left: 15, delay: 0.3, x: 15, y: -25 },
    { width: 12, height: 12, top: 25, left: 60, delay: 0.15, x: -20, y: -10 },
    { width: 20, height: 20, top: 80, left: 75, delay: 0.25, x: 25, y: 15 },
    { width: 16, height: 16, top: 40, left: 30, delay: 0.35, x: -15, y: 25 },
    { width: 22, height: 22, top: 60, left: 50, delay: 0.4, x: 30, y: -20 },
    { width: 14, height: 14, top: 85, left: 40, delay: 0.2, x: -25, y: -15 },
    { width: 28, height: 28, top: 15, left: 90, delay: 0.3, x: 10, y: 20 },
    { width: 19, height: 19, top: 50, left: 10, delay: 0.1, x: -30, y: 10 },
  ];

  useEffect(() => {
    const intervalStep = (100 / (totalDuration * 1000)) * updateInterval;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          return 100;
        }
        return prevProgress + intervalStep;
      });
    }, updateInterval);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 z-50 overflow-hidden"
      animate={isComplete ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.2 }}
      onAnimationComplete={() => {
        if (isComplete) {
          document.querySelector(".loader-container")?.classList.add("hidden");
        }
      }}
    >
      {/* Decorative elements with fixed properties */}
      {decorations.map((dec, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gray-200"
          style={{
            width: `${dec.width}px`,
            height: `${dec.height}px`,
            top: `${dec.top}%`,
            left: `${dec.left}%`,
          }}
          initial={{ opacity: 0.2, scale: 0 }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [0, 1, 0],
            x: dec.x,
            y: dec.y,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: dec.delay,
          }}
        />
      ))}

      <div className="w-full max-w-lg px-4 text-center">
        {/* Larger logo */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src="/logoWhiteHeaven.png"
            className="h-16 md:h-20" // Much larger logo
            alt="White Heaven Logo"
          />
        </motion.div>

        <div className="mb-2 flex items-center justify-between">
          <span className="text-gray-600 font-light">
            Loading your experience
          </span>
          <span className="text-gray-700 font-medium text-lg">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Progress bar with shine effect */}
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner relative">
          <motion.div
            className="h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 relative"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          >
            {/* Shine effect */}
            <motion.div
              className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </div>

        {/* Subtle tagline */}
        <motion.p
          className="mt-4 text-sm text-gray-500 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Creating unforgettable entertainment experiences
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
