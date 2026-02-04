import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import FloatingHearts from '@/components/valentine/FloatingHearts';
import WelcomeScreen from '@/components/valentine/WelcomeScreen';
import LoveLetter from '@/components/valentine/LoveLetter';
import PhotoGallery from '@/components/valentine/PhotoGallery';
import TheQuestion from '@/components/valentine/TheQuestion';
import Celebration from '@/components/valentine/Celebration';

type Screen = 'welcome' | 'letter' | 'gallery' | 'question' | 'celebration';

// ============================================
// CUSTOMIZE YOUR VALENTINE'S EXPERIENCE HERE!
// ============================================

const VALENTINE_CONFIG = {
  // Your names
  fromName: "Yash",
  toName: "Fuleidevi",

  // Your love letter message
  loveMessage: "Meri Fuleidevi bebdi , App itna kuch karte ho mere liye itna time deyte ho itna sunte ho ,even mera bak bak jhelte ho  uske liye i love youu the most.   Apke software engineer wale baby ke taraf se ek bohot he chota supriseeee hai. i hope apka day har din special jayeeee and mein apko humesha special feel karwa pauuun. i love  you mostttttttttttt and i miss you humeshaaaaaaaaaa. ",

  // Your photos together (replace with your actual photo URLs)
  photos: [
    {
      id: 1,
      url: "https://res.cloudinary.com/dvq5qqkqn/image/upload/v1770215521/WhatsApp_Image_2026-02-04_at_20.01.34_ac0cgq.jpg",
      caption: "The moment our story began (16th Jan 2026)..."
    },
    {
      id: 2,
      url: "https://res.cloudinary.com/dvq5qqkqn/image/upload/v1770215147/WhatsApp_Image_2026-02-04_at_19.54.51_3_mauo8t.jpg",
      caption: "Every adventure is better with you"
    },
    {
      id: 3,
      url: "https://res.cloudinary.com/dvq5qqkqn/image/upload/v1770215351/WhatsApp_Image_2026-02-04_at_19.54.50_1_bekdwd.jpg",
      caption: "Your smile makes everything brighter"
    },
    {
      id: 4,
      url: "https://res.cloudinary.com/dvq5qqkqn/image/upload/v1770215393/WhatsApp_Image_2025-12-04_at_12.19.07_sydnw2.jpg",
      caption: "Together is my favorite place to be"
    },
  ],
};

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  const handleReplay = () => {
    setCurrentScreen('welcome');
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Floating hearts appear on all screens */}
      <FloatingHearts count={12} onClick={currentScreen !== 'celebration'} />

      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            key="welcome"
            fromName={VALENTINE_CONFIG.fromName}
            toName={VALENTINE_CONFIG.toName}
            onContinue={() => setCurrentScreen('letter')}
          />
        )}

        {currentScreen === 'letter' && (
          <LoveLetter
            key="letter"
            message={VALENTINE_CONFIG.loveMessage}
            onComplete={() => setCurrentScreen('gallery')}
          />
        )}

        {currentScreen === 'gallery' && (
          <PhotoGallery
            key="gallery"
            photos={VALENTINE_CONFIG.photos}
            onComplete={() => setCurrentScreen('question')}
          />
        )}

        {currentScreen === 'question' && (
          <TheQuestion
            key="question"
            onYes={() => setCurrentScreen('celebration')}
          />
        )}

        {currentScreen === 'celebration' && (
          <Celebration
            key="celebration"
            toName={VALENTINE_CONFIG.toName}
            onReplay={handleReplay}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
