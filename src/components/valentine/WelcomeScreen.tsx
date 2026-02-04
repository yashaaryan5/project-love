import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface WelcomeScreenProps {
  fromName: string;
  toName: string;
  onContinue: () => void;
}

const WelcomeScreen = ({ fromName, toName, onContinue }: WelcomeScreenProps) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-soft"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.div
          className="flex justify-center mb-8"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart className="w-16 h-16 text-primary fill-primary" />
        </motion.div>

        <motion.p
          className="text-lg text-muted-foreground mb-4 font-elegant tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          A special message
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl font-script text-primary mb-4 text-shadow-romantic"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          From {fromName}
        </motion.h1>

        <motion.div
          className="flex items-center justify-center gap-4 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <Heart className="w-4 h-4 text-primary fill-primary" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </motion.div>

        <motion.h2
          className="text-5xl md:text-7xl font-script text-primary text-shadow-romantic"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.1, duration: 0.8 }}
        >
          To {toName}
        </motion.h2>

        <motion.button
          className="mt-12 px-8 py-4 bg-primary text-primary-foreground rounded-full font-elegant text-lg 
                     tracking-wider hover:bg-rose-dark transition-all duration-300 animate-pulse-glow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
        >
          Open My Heart ♥
        </motion.button>

        <motion.p
          className="mt-6 text-sm text-muted-foreground font-elegant italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
        >
          Click anywhere to spread the love ✨
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
