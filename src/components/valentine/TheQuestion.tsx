import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Heart, X } from 'lucide-react';

interface TheQuestionProps {
  onYes: () => void;
}

const TheQuestion = ({ onYes }: TheQuestionProps) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const noMessages = [
    "No",
    "Are you sure Fuleidevi?",
    "Achaaa babyyyy?",
    "Think again Gandu!",
    "Please? 🥺",
    "Pretty please?",
    "With a cherry on top?",
    "I'll be sad 😢",
    "You're breaking my heart!",
    "Just say yes!",
  ];

  const runAwayFromCursor = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const buttonWidth = 140;
    const buttonHeight = 56;
    
    // Calculate random position within container bounds
    const maxX = container.width - buttonWidth - 40;
    const maxY = container.height - buttonHeight - 40;
    
    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;
    
    // Add some randomness to make it more playful
    if (Math.random() > 0.5) {
      newX = newX < container.width / 2 ? maxX * 0.7 + Math.random() * maxX * 0.3 : Math.random() * maxX * 0.3;
    }
    if (Math.random() > 0.5) {
      newY = newY < container.height / 2 ? maxY * 0.6 + Math.random() * maxY * 0.4 : Math.random() * maxY * 0.4;
    }
    
    setNoButtonPosition({ x: newX, y: newY });
    setNoAttempts(prev => Math.min(prev + 1, noMessages.length - 1));
  }, [noMessages.length]);

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-soft relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-center z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
      >
        <motion.div
          className="flex justify-center mb-8"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart className="w-24 h-24 text-primary fill-primary drop-shadow-lg" />
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-script text-primary mb-12 text-shadow-romantic"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Will You Be My Valentine?
        </motion.h1>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* YES Button - Big and inviting */}
          <motion.button
            className="px-12 py-6 bg-primary text-primary-foreground rounded-full font-elegant text-2xl 
                       tracking-wider shadow-lg animate-pulse-glow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onYes}
          >
            <span className="flex items-center gap-3">
              <Heart className="w-6 h-6 fill-current" />
              YES!
              <Heart className="w-6 h-6 fill-current" />
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* NO Button - Runs away! */}
      <motion.button
        className="absolute px-8 py-4 bg-muted text-muted-foreground rounded-full font-elegant text-lg 
                   tracking-wider shadow-lg hover:bg-muted transition-colors flex items-center gap-2"
        style={{
          left: noButtonPosition.x || '60%',
          top: noButtonPosition.y || '70%',
        }}
        animate={{
          x: noButtonPosition.x ? 0 : undefined,
          y: noButtonPosition.y ? 0 : undefined,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseEnter={runAwayFromCursor}
        onTouchStart={runAwayFromCursor}
      >
        <X className="w-4 h-4" />
        {noMessages[noAttempts]}
      </motion.button>

      {noAttempts >= 3 && (
        <motion.p
          className="absolute bottom-10 left-0 right-0 text-center text-muted-foreground font-elegant italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          (The "No" button seems to have a mind of its own... 😉)
        </motion.p>
      )}
    </motion.div>
  );
};

export default TheQuestion;
