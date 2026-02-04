import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Music, RotateCcw, Sparkles } from 'lucide-react';

interface CelebrationProps {
  toName: string;
  onReplay: () => void;
}

const Celebration = ({ toName, onReplay }: CelebrationProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initial confetti burst
    const duration = 5000;
    const end = Date.now() + duration;

    const colors = ['#e11d48', '#f43f5e', '#fda4af', '#fecdd3', '#fbbf24', '#fef08a'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Big initial burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
    });

    frame();

    // Periodic confetti
    const interval = setInterval(() => {
      confetti({
        particleCount: 50,
        angle: 60 + Math.random() * 60,
        spread: 60,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
        colors: colors,
      });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const playMusic = () => {
    // Using a royalty-free romantic music URL (placeholder - would need actual audio file)
    if (!audioRef.current) {
      audioRef.current = new Audio('https://res.cloudinary.com/dvq5qqkqn/video/upload/v1770216807/Mann_Ka_Bhawana_zu3h6r.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }
    audioRef.current.play();
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    playMusic();
    return () => stopMusic();
  }, []);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-romantic relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Floating sparkles background */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-gold"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
      ))}

      <motion.div
        className="text-center z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 1 }}
      >
        {/* Animated hearts ring */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
            >
              <Heart
                className="w-8 h-8 text-primary-foreground fill-primary-foreground"
                style={{
                  transform: `translateX(${Math.cos((i * Math.PI * 2) / 8) * 80}px) translateY(${Math.sin((i * Math.PI * 2) / 8) * 80}px)`,
                }}
              />
            </motion.div>
          ))}
          
          {/* Center heart */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className="w-24 h-24 text-primary-foreground fill-primary-foreground drop-shadow-lg" />
          </motion.div>
        </div>

        <motion.h1
          className="text-5xl md:text-7xl font-script text-primary-foreground mb-6 drop-shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Thank You, {toName}!
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl font-elegant text-primary-foreground/90 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          You just made me the happiest person in the world!
        </motion.p>

        <motion.p
          className="text-xl font-elegant text-primary-foreground/80 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          💕 I love you with all my heart Bebdiiii Fuleidevi 💕
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <button
            onClick={() => audioRef.current?.paused ? playMusic() : stopMusic()}
            className="px-6 py-3 bg-primary-foreground/20 backdrop-blur text-primary-foreground 
                       rounded-full font-elegant text-lg flex items-center gap-2 mx-auto
                       hover:bg-primary-foreground/30 transition-colors"
          >
            <Music className="w-5 h-5" />
            Toggle Music
          </button>

          <button
            onClick={onReplay}
            className="px-6 py-3 bg-primary-foreground text-primary 
                       rounded-full font-elegant text-lg flex items-center gap-2 mx-auto
                       hover:bg-primary-foreground/90 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Replay Experience
          </button>
        </motion.div>
      </motion.div>

      {/* Love message at bottom */}
      <motion.p
        className="absolute bottom-8 text-primary-foreground/70 font-script text-2xl"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Forever and always ∞
      </motion.p>
    </motion.div>
  );
};

export default Celebration;
