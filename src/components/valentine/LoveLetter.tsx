import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, MailOpen } from 'lucide-react';

interface LoveLetterProps {
  message: string;
  onComplete: () => void;
}

const LoveLetter = ({ message, onComplete }: LoveLetterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (isOpen && displayedText.length < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(message.slice(0, displayedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else if (displayedText.length === message.length) {
      setIsTypingComplete(true);
    }
  }, [isOpen, displayedText, message]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-soft"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            className="cursor-pointer"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            onClick={() => setIsOpen(true)}
          >
            <div className="relative">
              <motion.div
                className="w-64 h-44 md:w-80 md:h-56 bg-cream rounded-lg shadow-2xl border-2 border-gold/30
                           flex items-center justify-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Mail className="w-20 h-20 text-primary" />
              </motion.div>
              
              {/* Envelope flap */}
              <div className="absolute -top-1 left-0 right-0">
                <svg viewBox="0 0 320 60" className="w-full">
                  <path
                    d="M0,60 L160,10 L320,60 L320,0 L0,0 Z"
                    fill="hsl(40, 50%, 95%)"
                    stroke="hsl(45, 90%, 55%)"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                </svg>
              </div>

              {/* Wax seal */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full 
                           bg-primary flex items-center justify-center shadow-lg glow-rose"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-7 h-7 text-primary-foreground fill-primary-foreground" />
              </motion.div>
            </div>
            
            <motion.p
              className="mt-8 text-center text-muted-foreground font-elegant text-lg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Click to open the letter...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            className="w-full max-w-2xl"
            initial={{ scale: 0.8, opacity: 0, rotateX: -90 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="relative bg-cream rounded-lg shadow-2xl p-8 md:p-12 border border-gold/20">
              {/* Decorative corners */}
              <div className="absolute top-2 left-2 text-gold/40">❧</div>
              <div className="absolute top-2 right-2 text-gold/40 rotate-90">❧</div>
              <div className="absolute bottom-2 left-2 text-gold/40 -rotate-90">❧</div>
              <div className="absolute bottom-2 right-2 text-gold/40 rotate-180">❧</div>

              <div className="flex justify-center mb-6">
                <MailOpen className="w-10 h-10 text-primary" />
              </div>

              <div className="font-elegant text-lg md:text-xl leading-relaxed text-foreground min-h-[200px]">
                {displayedText}
                {!isTypingComplete && (
                  <motion.span
                    className="inline-block w-0.5 h-6 bg-primary ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </div>

              {isTypingComplete && (
                <motion.div
                  className="mt-8 text-right"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="font-script text-3xl text-primary">With all my love ♥</p>
                </motion.div>
              )}
            </div>

            {isTypingComplete && (
              <motion.button
                className="mt-8 mx-auto block px-8 py-4 bg-primary text-primary-foreground rounded-full 
                           font-elegant text-lg tracking-wider hover:bg-rose-dark transition-all 
                           duration-300 glow-rose"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
              >
                Continue...
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoveLetter;
