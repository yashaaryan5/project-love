import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface FloatingHeartsProps {
  count?: number;
  onClick?: boolean;
}

const FloatingHearts = ({ count = 15, onClick = true }: FloatingHeartsProps) => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [clickHearts, setClickHearts] = useState<Heart[]>([]);

  // Generate initial floating hearts
  useEffect(() => {
    const initialHearts: Heart[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 4,
    }));
    setHearts(initialHearts);
  }, [count]);

  // Handle click to create hearts at cursor
  const handleClick = useCallback((e: MouseEvent) => {
    if (!onClick) return;
    
    const newHearts: Heart[] = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
      size: Math.random() * 15 + 10,
      delay: i * 0.1,
      duration: 2,
    }));
    
    setClickHearts(prev => [...prev, ...newHearts]);
    
    // Remove click hearts after animation
    setTimeout(() => {
      setClickHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
    }, 3000);
  }, [onClick]);

  useEffect(() => {
    if (onClick) {
      window.addEventListener('click', handleClick);
      return () => window.removeEventListener('click', handleClick);
    }
  }, [onClick, handleClick]);

  const HeartSVG = ({ size, color = "hsl(350, 80%, 60%)" }: { size: number; color?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className="drop-shadow-lg"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Background floating hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: '-50px',
          }}
          initial={{ y: 0, opacity: 0.6 }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(heart.id) * 50, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: heart.duration + 4,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <HeartSVG size={heart.size} color={`hsl(350, ${70 + Math.random() * 20}%, ${55 + Math.random() * 20}%)`} />
        </motion.div>
      ))}

      {/* Click-generated hearts */}
      <AnimatePresence>
        {clickHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.5, 1],
              opacity: [1, 1, 0],
              y: -150,
              x: (Math.random() - 0.5) * 100,
              rotate: (Math.random() - 0.5) * 60,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: "easeOut",
            }}
          >
            <HeartSVG size={heart.size} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts;
