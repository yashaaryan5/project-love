import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';


interface Photo {
  id: number;
  url: string;
  caption: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  onComplete: () => void;
}

const PhotoGallery = ({ photos, onComplete }: PhotoGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevPhoto = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const isLastPhoto = currentIndex === photos.length - 1;

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-soft"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-script text-primary mb-8 text-shadow-romantic"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Our Moments Together
      </motion.h2>

      <div className="relative w-full max-w-3xl">
        {/* Photo frame */}
        <motion.div
          key={currentIndex}
          className="relative bg-card rounded-lg shadow-2xl overflow-hidden border-8 border-cream"
          initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-[4/3] relative">
            <img
              src={photos[currentIndex].url}
              alt={photos[currentIndex].caption}
              className="w-full h-full object-cover"
            />
            
            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
            
            {/* Caption */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6 text-cream"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="font-elegant text-xl md:text-2xl text-center italic">
                "{photos[currentIndex].caption}"
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <button
          onClick={prevPhoto}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12
                     w-10 h-10 md:w-12 md:h-12 rounded-full bg-card shadow-lg
                     flex items-center justify-center text-primary
                     disabled:opacity-30 disabled:cursor-not-allowed
                     hover:bg-secondary transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextPhoto}
          disabled={isLastPhoto}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12
                     w-10 h-10 md:w-12 md:h-12 rounded-full bg-card shadow-lg
                     flex items-center justify-center text-primary
                     disabled:opacity-30 disabled:cursor-not-allowed
                     hover:bg-secondary transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex gap-2 mt-6">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary scale-125' 
                : 'bg-primary/30 hover:bg-primary/50'
            }`}
          />
        ))}
      </div>

      {/* Continue button */}
      <motion.button
        className="mt-8 px-8 py-4 bg-primary text-primary-foreground rounded-full 
                   font-elegant text-lg tracking-wider hover:bg-rose-dark transition-all 
                   duration-300 glow-rose flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
      >
        <Heart className="w-5 h-5 fill-current" />
        Now for the big question...
      </motion.button>
    </motion.div>
  );
};

export default PhotoGallery;
