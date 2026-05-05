import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

// Components
import { WelcomeOverlay } from './components/WelcomeOverlay';
import { RomanticDecorations } from './components/RomanticDecorations';
import { AudioPlayer } from './components/AudioPlayer';
import { HeroSection } from './components/HeroSection';
import { StorySection } from './components/StorySection';
import { QuoteSection } from './components/QuoteSection';
import { PhotoGallery } from './components/PhotoGallery';
import { SpecialMessageSection } from './components/SpecialMessageSection';
import { Footer } from './components/Footer';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [specialMessage, setSpecialMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [daysOfDevotion, setDaysOfDevotion] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  // Constants & Data
  const anniversaryDate = new Date('2024-10-01');
  const heartColors = [
    'text-accent-red/20', 'text-pink-500/20', 'text-rose-400/20', 
    'text-red-400/15', 'text-accent-gold/15'
  ];

  const hearts = React.useMemo(() => Array.from({ length: 50 }).map(() => ({
    delay: Math.random() * 30,
    x: `${Math.random() * 100}%`,
    color: heartColors[Math.floor(Math.random() * heartColors.length)],
    sizeMultiplier: 0.5 + Math.random() * 1.5
  })), []);

  const petals = React.useMemo(() => Array.from({ length: 40 }).map(() => ({
    delay: Math.random() * 30,
    x: `${Math.random() * 100}%`,
    sizeMultiplier: 0.8 + Math.random() * 1.2
  })), []);

  const stars = React.useMemo(() => Array.from({ length: 40 }).map(() => ({
    delay: Math.random() * 5,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`
  })), []);

  // Effects
  useEffect(() => {
    const calculateDays = () => {
      const today = new Date();
      const diffTime = today.getTime() - anniversaryDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      setDaysOfDevotion(diffDays > 0 ? diffDays : 0);
    };
    calculateDays();
    const timer = setInterval(calculateDays, 1000 * 60 * 60);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedMsg = localStorage.getItem('romantic_anniversary_message');
    if (savedMsg) {
      setSpecialMessage(savedMsg);
    } else {
      setSpecialMessage("Setiap momen bersamamu adalah potongan puzzle terindah yang melengkapi hidupku. Untuk Dian Anastasia, terima kasih telah menjadi alasan di balik senyumku setiap hari. Happy Anniversary, love! ❤️❤️");
    }
    
    const savedPhotos = localStorage.getItem('romantic_anniversary_photos');
    if (savedPhotos) setUploadedPhotos(JSON.parse(savedPhotos));
  }, []);

  // Handlers
  const saveMessage = (msg: string) => {
    setSpecialMessage(msg);
    localStorage.setItem('romantic_anniversary_message', msg);
    setIsEditing(false);
    handleBurst();
  };

  const handleStart = () => {
    setHasStarted(true);
    setIsPlaying(true);
    handleBurst();
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran foto terlalu besar (maks 2MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newPhotos = [...uploadedPhotos, base64String].slice(0, 11);
        setUploadedPhotos(newPhotos);
        localStorage.setItem('romantic_anniversary_photos', JSON.stringify(newPhotos));
        handleBurst();
        if (fileInputRef.current) fileInputRef.current.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = uploadedPhotos.filter((_, i) => i !== index);
    setUploadedPhotos(newPhotos);
    localStorage.setItem('romantic_anniversary_photos', JSON.stringify(newPhotos));
  };

  const resetPhotos = () => {
    localStorage.removeItem('romantic_anniversary_photos');
    setUploadedPhotos([]);
    setShowResetConfirm(false);
    handleBurst();
  };

  const handleBurst = () => {
    const end = Date.now() + 2 * 1000;
    const colors = ['#f43f6c', '#be1241', '#fecdd6'];
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  const scrollToMessage = () => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative sleek-atmosphere overflow-x-hidden font-sans text-sleek-50">
      <AnimatePresence>
        <WelcomeOverlay hasStarted={hasStarted} onStart={handleStart} />
      </AnimatePresence>

      <RomanticDecorations hearts={hearts} petals={petals} stars={stars} />

      <AudioPlayer 
        ref={audioRef}
        isPlaying={isPlaying} 
        hasStarted={hasStarted} 
        onToggle={toggleMusic} 
      />

      <HeroSection onUnveil={scrollToMessage} onBurst={handleBurst} />

      <StorySection daysOfDevotion={daysOfDevotion} />

      <QuoteSection />

      <PhotoGallery 
        photos={uploadedPhotos}
        onUpload={handlePhotoUpload}
        onRemove={removePhoto}
        onReset={resetPhotos}
        onBurst={handleBurst}
        fileInputRef={fileInputRef}
        showResetConfirm={showResetConfirm}
        setShowResetConfirm={setShowResetConfirm}
      />

      <SpecialMessageSection 
        specialMessage={specialMessage}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        messageRef={messageRef}
        onSave={saveMessage}
        onCancel={() => setIsEditing(false)}
      />

      <Footer />
    </div>
  );
}
