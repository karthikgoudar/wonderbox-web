'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Printer,
  Mic,
  Volume2,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Layers,
  Award,
  Mail,
  Star,
  Users,
  School,
  Play,
  Pause,
  Phone,
  Heart,
  Check,
  Video,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Languages,
  Globe2,
  Menu,
  X
} from 'lucide-react';

export default function WonderBoxLandingPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'parent' | 'school' | 'partner'>('parent');
  const [ageGroup, setAgeGroup] = useState<'3-5' | '6-8' | '9-12'>('6-8');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Mobile navigation drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive Sticker Studio state
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  // Audio player state and ref
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState('0:00');
  const [audioDuration, setAudioDuration] = useState('0:30');

  // Mobile Carousel states
  const [sec2CarouselIdx, setSec2CarouselIdx] = useState(0);
  const [sec3CarouselIdx, setSec3CarouselIdx] = useState(0);
  const [uspCarouselIdx, setUspCarouselIdx] = useState(0);

  // --- MULTILINGUAL VOICE PROMPT TYPEWRITER SIMULATION (WITH HINGLISH & KANGLISH CODE-MIXING) ---
  const voiceLanguages = [
    {
      code: 'en',
      label: 'English',
      nativeLabel: 'English',
      flag: '🇬🇧',
      prompt: 'Tell me a story about a brave baby dinosaur flying to space!',
      audioSnippet: '“Toby tied two huge palm leaves to his arms and climbed the cliff...”',
      stickerTag: 'Toby T-Rex (Coloring Sheet) 🎨',
      audioPath: '/audio/story_english.mp3',
    },
    {
      code: 'hi',
      label: 'Hinglish',
      nativeLabel: 'हिन्दी / Hinglish',
      flag: '🇮🇳',
      prompt: 'मुझे स्पेस में फ्लाई करने वाले एक ब्रेव बेबी डायनासोर की स्टोरी सुनाओ!',
      audioSnippet: '“टोबी ने पाम लीव्स से विंग्स बनाया और स्पेस रॉक पर जंप किया...”',
      stickerTag: 'टोबी टी-रेक्स (Sticker Sheet) 🎨',
      audioPath: '/audio/story_hindi.mp3',
    },
    {
      code: 'kn',
      label: 'Kanglish',
      nativeLabel: 'ಕನ್ನಡ / Kanglish',
      flag: '🇮🇳',
      prompt: 'ಸ್ಪೇಸ್‌ಗೆ ಫ್ಲೈ ಮಾಡೋ ಒಂದು ಬ್ರೇವ್ ಬೇಬಿ ಡೈನೋಸಾರ್ ಸ್ಟೋರಿ ಹೇಳು!',
      audioSnippet: '“ಟೋಬಿ ಪಾಮ್ ಲೀವ್ಸ್ ಕಟ್ಟಿ ವಿಂಗ್ಸ್ ಮಾಡ್ಕೊಂಡು ಸ್ಪೇಸ್ ರಾಕ್ ಮೇಲೆ ಜಂಪ್ ಮಾಡಿದ...”',
      stickerTag: 'ಟೋಬಿ ಟಿ-ರೆಕ್ಸ್ (Sticker Sheet) 🎨',
      audioPath: '/audio/story_kannada.mp3',
    },
  ];

  const [activeLangIdx, setActiveLangIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Helper to split text safely into grapheme clusters for Indian scripts (Kannada, Hindi)
  const getGraphemeClusters = (text: string): string[] => {
    if (typeof Intl !== 'undefined' && (Intl as any).Segmenter) {
      const segmenter = new (Intl as any).Segmenter(undefined, { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text), (s: any) => s.segment);
    }
    return Array.from(text);
  };

  useEffect(() => {
    // If audio is actively playing, freeze the typewriter on the current language!
    if (isPlayingAudio) return;

    const currentLang = voiceLanguages[activeLangIdx];
    const fullClusters = getGraphemeClusters(currentLang.prompt);
    const displayedClusters = getGraphemeClusters(displayedText);

    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedClusters.length < fullClusters.length) {
        // Typing forward
        timeout = setTimeout(() => {
          setDisplayedText(fullClusters.slice(0, displayedClusters.length + 1).join(''));
        }, 55);
      } else {
        // Pause at the end of the sentence before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayedClusters.length > 0) {
        // Backspacing
        timeout = setTimeout(() => {
          setDisplayedText(displayedClusters.slice(0, displayedClusters.length - 1).join(''));
        }, 25);
      } else {
        // Switch to the next language in loop
        setIsDeleting(false);
        setActiveLangIdx((prev) => (prev + 1) % voiceLanguages.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, activeLangIdx, isPlayingAudio]);

  // Audio player handlers
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      // Lock and fully show the prompt text for the current language
      setDisplayedText(voiceLanguages[activeLangIdx].prompt);
      setIsDeleting(false);
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch((err) => {
        console.log('Audio file preview simulation:', err);
        setIsPlayingAudio(true);
      });
    }
  };

  const handleAudioEnded = () => {
    setIsPlayingAudio(false);
    setAudioCurrentTime('0:00');
    // Once current language audio finishes, smoothly advance to the next language!
    const nextIdx = (activeLangIdx + 1) % voiceLanguages.length;
    setActiveLangIdx(nextIdx);
    setIsDeleting(false);
    setDisplayedText(voiceLanguages[nextIdx].prompt);
    if (audioRef.current) {
      audioRef.current.src = voiceLanguages[nextIdx].audioPath;
      audioRef.current.load();
    }
  };

  const handleSelectLanguage = (idx: number) => {
    setActiveLangIdx(idx);
    setIsDeleting(false);
    setDisplayedText(voiceLanguages[idx].prompt);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
      setAudioCurrentTime('0:00');
      audioRef.current.src = voiceLanguages[idx].audioPath;
      audioRef.current.load();
    }
  };

  // Section 2 Feature Cards Data
  const featureCards = [
    {
      tag: '100% Kid-Led',
      index: '01',
      title: 'Active Agency',
      icon: Sparkles,
      deckColor: 'bg-[#FEF08A]',
      bgTint: 'bg-amber-50/70',
      iconBg: 'bg-[#FEF08A]',
      imagePath: '/features/active_agency.png',
      imageTitle: 'Active Agency Image',
      imageSubtitle: 'Child imagining & directing',
      description: 'Children lead the story in English, Hinglish, or Kanglish, never passive screen time.'
    },
    {
      tag: 'Bedtime Safe',
      index: '02',
      title: 'Immersive Audio',
      icon: Volume2,
      deckColor: 'bg-[#BFDBFE]',
      bgTint: 'bg-blue-50/70',
      iconBg: 'bg-[#BFDBFE]',
      imagePath: '/features/immersive_audio.png',
      imageTitle: 'Immersive Audio Image',
      imageSubtitle: 'Audio adventure & soundscapes',
      description: 'Spatial soundscapes and character voices that build deep listening skills without eye strain.'
    },
    {
      tag: 'Zero Ink',
      index: '03',
      title: 'Physical Prints',
      icon: Printer,
      deckColor: 'bg-[#FF7A59]',
      bgTint: 'bg-rose-50/70',
      iconBg: 'bg-[#FF7A59]',
      imagePath: '/features/physical_prints.png',
      imageTitle: 'Physical Prints Image',
      imageSubtitle: 'Thermal coloring sticker roll',
      description: 'Spoken ideas turn into real black-and-white stickers in 4 seconds, ready for crayons.'
    },
    {
      tag: 'Keepsake',
      index: '04',
      title: 'The Wonder Album',
      icon: Award,
      deckColor: 'bg-[#BBF7D0]',
      bgTint: 'bg-emerald-50/70',
      iconBg: 'bg-[#BBF7D0]',
      imagePath: '/features/wonder_album.png',
      imageTitle: 'Wonder Album Image',
      imageSubtitle: 'Pasted album & crayons',
      description: 'Kids peel, color, and collect their creations into permanent keepsakes they cherish.'
    }
  ];

  // Section 3 Step Cards Data
  const stepCards = [
    {
      step: 'Step 01',
      badge: 'VOICE',
      title: 'SPEAK',
      icon: Mic,
      deckColor: 'bg-[#FEF08A]',
      bgTint: 'bg-amber-50/70',
      iconBg: 'bg-[#FEF08A]',
      imagePath: '/steps/step_01_speak.png',
      imageTitle: 'Child Speaking to WonderBox',
      imageSubtitle: '“ಸ್ಪೇಸ್‌ಗೆ ಫ್ಲೈ ಮಾಡೋ ಬೇಬಿ ಡೈನೋಸಾರ್!”',
      description: 'A child speaks in English, Hinglish, or Kanglish as WonderBox understands natural mixed speech.'
    },
    {
      step: 'Step 02',
      badge: 'AUDIO',
      title: 'LISTEN',
      icon: Volume2,
      deckColor: 'bg-[#BFDBFE]',
      bgTint: 'bg-blue-50/70',
      iconBg: 'bg-[#BFDBFE]',
      imagePath: '/steps/step_02_listen.png',
      imageTitle: 'Device Playing Story Audio',
      imageSubtitle: 'Music notes, soundscapes & choices',
      description: 'WonderBox weaves an adaptive audio adventure with sound effects and character voices in their language.'
    },
    {
      step: 'Step 03',
      badge: 'PRINT',
      title: 'PRINT',
      icon: Printer,
      deckColor: 'bg-[#BBF7D0]',
      bgTint: 'bg-emerald-50/70',
      iconBg: 'bg-[#BBF7D0]',
      imagePath: '/steps/step_03_print.png',
      imageTitle: 'Thermal Sticker & Album',
      imageSubtitle: 'B&W sticker prints, color with crayons',
      description: 'Out rolls an ink-free thermal sticker to peel, color with real crayons, and collect in their Wonder Album.'
    }
  ];

  // Trilingual USP Cards Data with Code-Mixing (Hinglish & Kanglish)
  const trilingualCards = [
    {
      flag: '🇬🇧',
      badge: 'Global AI',
      badgeColor: 'bg-stone-100 text-stone-900',
      title: 'English',
      desc: 'Natural storytelling, voice riddles, and interactive creative story adventures.',
      prompt: '“Tell me a story about a brave dragon flying to a castle!”',
      footer: 'Full voice & thermal print engine',
    },
    {
      flag: '🇮🇳',
      badge: 'Hinglish Supported',
      badgeColor: 'bg-[#BFDBFE] text-stone-900',
      title: 'हिन्दी + Hinglish',
      desc: 'बच्चे जैसे घर पर बोलते हैं, शुद्ध हिन्दी या हिन्दी + इंग्लिश मिक्स (Hinglish), वंडरबॉक्स सब समझता है!',
      prompt: '“मुझे एक ब्रेव लॉयन (Lion) और उसके जंगल फ्रेंड्स की स्टोरी सुनाओ!”',
      footer: 'नेचुरल हिंग्लिश वॉइस & प्रिंट इंजन',
    },
    {
      flag: '🇮🇳',
      badge: 'Kanglish Supported',
      badgeColor: 'bg-[#BBF7D0] text-stone-900',
      title: 'ಕನ್ನಡ + Kanglish',
      desc: 'ಮನೆಯಲ್ಲಿ ಮಕ್ಕಳು ಮಾತಾಡೋ ಹಾಗೆ, ಕನ್ನಡ + ಇಂಗ್ಲಿಷ್ ಮಿಕ್ಸ್ (Kanglish), ಎಲ್ಲವನ್ನೂ ವಂಡರ್‌ಬಾಕ್ಸ್ ಸಲೀಸಾಗಿ ಅರ್ಥ ಮಾಡಿಕೊಳ್ಳುತ್ತೆ!',
      prompt: '“ಸ್ಪೇಸ್‌ಗೆ (Space) ಹೋಗೋ ಒಂದು ಸೂಪರ್ ಹೀರೋ ಬೇಬಿ ಡೈನೋಸಾರ್ ಸ್ಟೋರಿ ಹೇಳು!”',
      footer: 'ನ್ಯಾಚುರಲ್ ಕಾಂಗ್ಲಿಷ್ ವಾಯ್ಸ್ & ಪ್ರಿಂಟ್ ಎಂಜಿನ್',
    },
  ];

  // Auto-advance mobile carousel for Section 2
  useEffect(() => {
    const timer = setInterval(() => {
      setSec2CarouselIdx((prev) => (prev + 1) % featureCards.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featureCards.length]);

  // Auto-advance mobile carousel for Section 3
  useEffect(() => {
    const timer = setInterval(() => {
      setSec3CarouselIdx((prev) => (prev + 1) % stepCards.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [stepCards.length]);

  // Auto-advance mobile carousel for Trilingual USP Section
  useEffect(() => {
    const timer = setInterval(() => {
      setUspCarouselIdx((prev) => (prev + 1) % trilingualCards.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [trilingualCards.length]);

  const sampleStories = [
    {
      id: 'dino',
      title: 'Brave Baby Dinosaur',
      category: 'Prehistoric Discovery',
      icon: '🦕',
      prompt: '“Make a story about a tiny baby T-Rex named Toby who wants to fly to space!”',
      audioSnippet: '“Toby tied two huge palm leaves to his arms and climbed the highest mossy cliff...”',
      stickerName: 'Captain Toby T-Rex #042',
    },
    {
      id: 'dragon',
      title: 'Pip the Cloud Dragon',
      category: 'Mythical Fantasy',
      icon: '🐉',
      prompt: '“A cute purple dragon that sneezes rainbow rain over thirsty flower gardens!”',
      audioSnippet: '“Every time Pip let out a tiny puff, lavender raindrops danced across the sunflowers...”',
      stickerName: 'Pip & The Rainbow Drops #018',
    },
    {
      id: 'robot',
      title: 'Sparky the Garden Bot',
      category: 'Future Explorer',
      icon: '🤖',
      prompt: '“A friendly clockwork robot searching the enchanted forest for glowing butterflies!”',
      audioSnippet: '“Sparky’s brass antenna whistled cheerfully as a golden butterfly rested on his metallic thumb...”',
      stickerName: 'Sparky & The Firefly #077',
    },
  ];

  const currentStory = sampleStories[activeStoryIdx];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF7A59', '#FACC15', '#93C5FD', '#86EFAC', '#C084FC'],
      });
    } catch {
      // safe fallback if canvas is not ready
    }
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role, ageGroup, timestamp: new Date().toISOString() }),
      });
      setStatus('success');
      setEmail('');
      triggerConfetti();
    } catch {
      setStatus('success');
      setEmail('');
      triggerConfetti();
    }
  };

  // Helper to render a Section 2 Feature Card
  const renderFeatureCard = (item: typeof featureCards[0]) => {
    const IconComp = item.icon;
    return (
      <div className="w-full h-full bg-white border-3 border-stone-900 rounded-[32px] overflow-hidden shadow-[6px_6px_0px_0px_#1c1917] flex flex-col justify-between hover:-translate-y-1 transition duration-200">
        
        {/* Upper Image Tier */}
        <div className="p-5 shrink-0 flex flex-col">
          <div className="h-6 flex items-center justify-between mb-3.5">
            <span className="text-[10px] font-black uppercase tracking-wider bg-stone-100 border border-stone-900 px-2.5 py-0.5 rounded-full text-stone-950">
              {item.tag}
            </span>
            <span className="text-xs font-black text-stone-400 font-mono">{item.index}</span>
          </div>

          <div className="w-full aspect-square rounded-2xl border-2 border-stone-900 bg-[#FFFDF9] overflow-hidden relative flex items-center justify-center shadow-[inset_0px_2px_4px_rgba(0,0,0,0.04)]">
            <img
              src={item.imagePath}
              alt={item.title}
              className="w-full h-full object-contain select-none"
            />
          </div>
        </div>

        {/* Lower Tier: Opaque Color Deck */}
        <div className={`${item.deckColor} border-t-3 border-stone-900 p-4 sm:p-5 flex-1 flex flex-col items-center text-center justify-start min-h-[125px]`}>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border-2 border-stone-900 text-xs sm:text-sm font-black text-stone-950 shadow-[2px_2px_0px_0px_#1c1917] mb-2.5 shrink-0">
            <IconComp className="w-3.5 h-3.5 text-stone-950" />
            <span>{item.title}</span>
          </div>
          <p className="text-xs sm:text-[13px] font-bold text-stone-950 leading-relaxed">
            {item.description}
          </p>
        </div>

      </div>
    );
  };

  // Helper to render a Section 3 Step Card
  const renderStepCard = (item: typeof stepCards[0]) => {
    const IconComp = item.icon;
    return (
      <div className="w-full h-full bg-white border-3 border-stone-900 rounded-[32px] overflow-hidden shadow-[6px_6px_0px_0px_#1c1917] flex flex-col justify-between hover:-translate-y-1 transition duration-200">
        
        {/* Upper Tier */}
        <div className="p-5 sm:p-6 shrink-0 flex flex-col">
          <div className="h-7 flex items-center justify-between mb-4">
            <span className="bg-stone-100 border-2 border-stone-900 px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider text-stone-950">
              {item.step}
            </span>
            <span className="text-xs font-black text-stone-400 font-mono uppercase">{item.badge}</span>
          </div>

          <div className="w-full aspect-square rounded-2xl border-2 border-stone-900 bg-[#FFFDF9] overflow-hidden relative flex items-center justify-center shadow-[inset_0px_2px_4px_rgba(0,0,0,0.04)]">
            <img
              src={item.imagePath}
              alt={item.title}
              className="w-full h-full object-contain select-none"
            />
          </div>
        </div>

        {/* Lower Tier: Opaque Color Deck */}
        <div className={`${item.deckColor} border-t-3 border-stone-900 p-5 flex-1 flex flex-col items-center text-center justify-start min-h-[135px]`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-stone-900 text-xs sm:text-sm font-black text-stone-950 mb-3 shadow-[2px_2px_0px_0px_#1c1917] shrink-0">
            <IconComp className="w-4 h-4 text-stone-950" />
            <span>{item.title}</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-stone-950 leading-relaxed">
            {item.description}
          </p>
        </div>

      </div>
    );
  };

  // Helper to render a Trilingual Card
  const renderTrilingualCard = (item: typeof trilingualCards[0]) => {
    return (
      <div className="w-full h-full bg-white border-3 border-stone-900 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1c1917] flex flex-col justify-between hover:-translate-y-1 transition duration-200">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">{item.flag}</span>
            <span className={`text-[10px] font-black uppercase tracking-wider ${item.badgeColor} border border-stone-900 px-2 py-0.5 rounded-full`}>
              {item.badge}
            </span>
          </div>
          <h3 className="text-xl font-black text-stone-950 mb-1">{item.title}</h3>
          <p className="text-xs font-semibold text-stone-600 mb-3 leading-relaxed">
            {item.desc}
          </p>
          <div className="bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs font-bold text-stone-900 italic">
            {item.prompt}
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-stone-200 text-[11px] font-black text-emerald-700 flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 shrink-0" />
          <span>{item.footer}</span>
        </div>
      </div>
    );
  };

  const currentVoiceLang = voiceLanguages[activeLangIdx];

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-stone-900 font-sans selection:bg-[#FF7A59]/20 selection:text-stone-900">
      
      {/* Inline styles for guaranteed smooth marquee animation */}
      <style>{`
        @keyframes wonderboxMarqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .wb-marquee-animated {
          display: inline-flex !important;
          width: max-content !important;
          white-space: nowrap !important;
          animation: wonderboxMarqueeScroll 25s linear infinite !important;
          will-change: transform;
        }
        .wb-marquee-animated:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* --- TOP TRACTION & BATCH 1 ALERT TICKER (SINGLE LINE WITH FIXED ACTION LINK) --- */}
      <div className="bg-[#FEF08A] border-b-2 border-stone-900 h-10 sm:h-11 flex items-center justify-between overflow-hidden relative select-none">
        
        {/* Left Side: Smooth Single-Line Infinite Marquee Ticker */}
        <div className="flex-1 overflow-hidden relative flex items-center h-full">
          <div className="wb-marquee-animated flex items-center text-xs sm:text-sm font-bold text-stone-900">
            <span className="inline-flex items-center gap-2 px-4 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              ✨ <strong>First 1,000 Units Production Run</strong>: English, Hindi, Kannada + <strong>10 More Indian Languages Coming Soon!</strong>
              <span className="text-stone-400 mx-2">•</span>
              🎉 <strong>Early Bird Allocation Active</strong>
              <span className="text-stone-400 mx-2">•</span>
              Zero Screen Time Physical AI
              <span className="text-stone-400 mx-2">•</span>
            </span>
            <span className="inline-flex items-center gap-2 px-4 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              ✨ <strong>First 1,000 Units Production Run</strong>: English, Hindi, Kannada + <strong>10 More Indian Languages Coming Soon!</strong>
              <span className="text-stone-400 mx-2">•</span>
              🎉 <strong>Early Bird Allocation Active</strong>
              <span className="text-stone-400 mx-2">•</span>
              Zero Screen Time Physical AI
              <span className="text-stone-400 mx-2">•</span>
            </span>
          </div>
        </div>

        {/* Right Side: Fixed Action Link (Never Scrolls, Always Clickable) */}
        <div className="relative z-10 shrink-0 bg-[#FEF08A] pl-3 sm:pl-4 pr-3 sm:pr-4 flex items-center h-full shadow-[-12px_0_12px_#FEF08A]">
          <a
            href="#waitlist-top"
            className="inline-flex items-center gap-1 bg-white sm:bg-transparent border border-stone-900 sm:border-0 px-2.5 py-1 sm:p-0 rounded-lg text-[11px] sm:text-xs font-black text-stone-950 underline decoration-stone-900 decoration-2 underline-offset-2 hover:text-[#FF7A59] transition whitespace-nowrap shadow-[1px_1px_0px_0px_#1c1917] sm:shadow-none"
          >
            Lock Early Batch Spot →
          </a>
        </div>

      </div>

      {/* --- NAVBAR --- */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between relative z-40">
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FACC15] border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1c1917] flex items-center justify-center font-black text-xl text-stone-950">
            W
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-stone-950 block leading-none">
              WonderBox
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-stone-500">
              Mindfield Pvt Ltd
            </span>
          </div>
        </Link>

        {/* Desktop Links (Large Screens) */}
        <div className="hidden lg:flex items-center gap-7 text-sm font-bold text-stone-700">
          <a href="#pure-creativity" className="hover:text-[#FF7A59] transition">Features</a>
          <a href="#trilingual-usp" className="hover:text-[#FF7A59] transition flex items-center gap-1">
            <Globe2 className="w-4 h-4 text-[#FF7A59]" /> Core Innovation
          </a>
          <a href="#how-it-works" className="hover:text-[#FF7A59] transition">How It Works</a>
          <a href="#sticker-studio" className="hover:text-[#FF7A59] transition">Sticker Studio</a>
          <a href="#parent-app" className="hover:text-[#FF7A59] transition">Parent App</a>
        </div>

        {/* Right CTA + Mobile/Tablet Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#waitlist-top"
            className="bg-[#FF7A59] hover:bg-[#ff6842] text-stone-950 font-black px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1c1917] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition shrink-0"
          >
            Reserve Unit
          </a>

          {/* Mobile & Tablet Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden w-10 h-10 rounded-xl bg-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] flex items-center justify-center text-stone-950 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition hover:bg-stone-50 shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE & TABLET NAVIGATION DRAWER OVERLAY --- */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-32 z-50 bg-white border-3 border-stone-900 rounded-3xl p-5 shadow-[8px_8px_0px_0px_#1c1917] space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <span className="text-xs font-black uppercase text-stone-500 tracking-wider">Navigation Menu</span>
            <span className="text-[10px] font-bold bg-[#FEF08A] px-2 py-0.5 rounded border border-stone-900 text-stone-900">
              Batch #1 Active
            </span>
          </div>

          <div className="grid gap-2">
            <a
              href="#pure-creativity"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border-2 border-stone-900 hover:bg-[#FEF08A] font-black text-sm text-stone-950 transition"
            >
              <span className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-500" /> Pure Creativity (Features)
              </span>
              <span className="text-xs text-stone-400">→</span>
            </a>

            <a
              href="#trilingual-usp"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border-2 border-stone-900 hover:bg-[#FEF08A] font-black text-sm text-stone-950 transition"
            >
              <span className="flex items-center gap-2.5">
                <Globe2 className="w-4 h-4 text-[#FF7A59]" /> Core Innovation (3 Languages)
              </span>
              <span className="text-xs text-stone-400">→</span>
            </a>

            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border-2 border-stone-900 hover:bg-[#BFDBFE] font-black text-sm text-stone-950 transition"
            >
              <span className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-600" /> How It Works
              </span>
              <span className="text-xs text-stone-400">→</span>
            </a>

            <a
              href="#sticker-studio"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border-2 border-stone-900 hover:bg-[#BBF7D0] font-black text-sm text-stone-950 transition"
            >
              <span className="flex items-center gap-2.5">
                <Printer className="w-4 h-4 text-emerald-700" /> Sticker Studio
              </span>
              <span className="text-xs text-stone-400">→</span>
            </a>

            <a
              href="#parent-app"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border-2 border-stone-900 hover:bg-[#FEF08A] font-black text-sm text-stone-950 transition"
            >
              <span className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-amber-600" /> Parent Companion App
              </span>
              <span className="text-xs text-stone-400">→</span>
            </a>
          </div>

          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <a
              href="tel:+919980000000"
              className="flex items-center justify-center gap-2 bg-[#BBF7D0] text-stone-950 font-black py-2.5 rounded-xl text-xs border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917]"
            >
              <Phone className="w-3.5 h-3.5" /> Call or WhatsApp (+91 99800 00000)
            </a>
            <a
              href="#waitlist-top"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#FF7A59] text-stone-950 font-black py-3 rounded-xl text-xs border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917]"
            >
              Reserve Early Batch Spot →
            </a>
          </div>
        </div>
      )}

      {/* --- HERO SECTION WITH WAITLIST AT THE TOP --- */}
      <section id="waitlist-top" className="max-w-6xl mx-auto px-6 pt-6 sm:pt-10 pb-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value Prop + Waitlist Capture */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#BFDBFE] border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] text-stone-900 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-stone-950" /> 100% Screen-Free Physical AI
              </div>

              {/* USP BADGE: 3 LANGUAGES + CODE MIXING */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FEF08A] border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] text-stone-950 text-xs font-black">
                <Languages className="w-3.5 h-3.5 text-stone-950" />
                <span>English • हिन्दी (Hinglish) • ಕನ್ನಡ (Kanglish)</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-stone-950 tracking-tight leading-[1.05]">
              Where Imagination{' '}
              <span className="text-[#FF7A59] underline decoration-stone-900 decoration-4 underline-offset-4">
                Becomes Real.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-700 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Kids speak their wildest dreams directly to WonderBox in <strong>English, Hindi, or Kannada</strong>. The device narrates an immersive voice adventure and instantly prints a <strong>black-and-white coloring sticker</strong> to peel, color, and collect.
            </p>

            {/* --- PRIMARY WAITLIST CAPTURE CARD (FRONT AND CENTER) --- */}
            <div className="bg-white border-3 border-stone-900 rounded-3xl p-5 sm:p-7 shadow-[6px_6px_0px_0px_#1c1917] text-left">
              
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-stone-900">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  Reserve Your Spot • First 1,000 Units
                </span>
                <span className="text-[11px] font-bold bg-[#FEF08A] px-2.5 py-1 rounded-md border border-stone-900 text-stone-900">
                  Early Bird Perks
                </span>
              </div>

              {/* Role Selector Tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  { id: 'parent', label: '👨‍👩‍👧 Parent / Family' },
                  { id: 'school', label: '🏫 School / Educator' },
                  { id: 'partner', label: '🤝 Partner / Creator' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setRole(tab.id as 'parent' | 'school' | 'partner')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black border-2 border-stone-900 transition ${
                      role === tab.id
                        ? 'bg-[#FACC15] text-stone-950 shadow-[2px_2px_0px_0px_#1c1917]'
                        : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Age Group Selector for Parents/Schools */}
              {role !== 'partner' && (
                <div className="flex items-center gap-2 mb-4 text-xs font-bold text-stone-600 flex-wrap">
                  <span className="text-stone-500">Child Age Group:</span>
                  {(['3-5', '6-8', '9-12'] as const).map((age) => (
                    <button
                      key={age}
                      type="button"
                      onClick={() => setAgeGroup(age)}
                      className={`px-3 py-1 rounded-lg border-2 border-stone-900 text-xs font-extrabold transition ${
                        ageGroup === age
                          ? 'bg-[#BFDBFE] text-stone-950 shadow-[1px_1px_0px_0px_#1c1917]'
                          : 'bg-white text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {age} yrs
                    </button>
                  ))}
                </div>
              )}

              {/* Waitlist Form or Success State */}
              {status === 'success' ? (
                <div className="bg-[#BBF7D0] border-2 border-stone-900 rounded-2xl p-4 font-black text-sm text-stone-950 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-800 shrink-0" />
                  <div>
                    <div className="text-sm font-black">🎉 You’re on the priority list!</div>
                    <div className="text-xs font-semibold text-stone-800 mt-0.5">
                      We’ve reserved your priority spot as a {role}. Watch your inbox for batch #1 shipping updates!
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={`Enter your ${role} email address...`}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-stone-50 border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] focus:outline-none focus:ring-2 focus:ring-[#FF7A59] text-sm font-semibold text-stone-900 placeholder:text-stone-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-[#FF7A59] hover:bg-[#ff6842] text-stone-950 font-black px-6 py-3.5 rounded-xl text-sm border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1c1917] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition flex items-center justify-center gap-2 shrink-0"
                  >
                    {status === 'loading' ? 'Securing Spot...' : 'Get Priority Access'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Trust Badges */}
              <div className="mt-4 pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between text-[11px] font-bold text-stone-600 gap-2">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> 100% Screen-free
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> English • हिन्दी • ಕನ್ನಡ
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Hinglish & Kanglish Ready
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Ink-free thermal prints
                </span>
              </div>
            </div>

            {/* Traction Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="bg-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] px-3.5 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#FF7A59]" /> 200+ Parent Signups
              </div>
              <div className="bg-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] px-3.5 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-emerald-700" /> 10+ School Pilots
              </div>
              <div className="bg-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] px-3.5 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-blue-600" /> Trilingual + 10 Coming Soon
              </div>
            </div>
          </div>

          {/* Right Column: Clean Hardware Image + Animated Multilingual Voice Prompt */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md flex flex-col items-center">

              {/* 1. Only the clean WonderBox image present (outer frame and inner double border removed) */}
              <div className="w-full flex justify-center py-2">
                <img
                  src="/wonderbox_device.png"
                  alt="WonderBox Smart Creative Device"
                  className="w-full max-w-sm h-auto object-contain drop-shadow-md select-none"
                />
              </div>

              {/* 2. Interactive Voice Prompt Bubble with Animated Multilingual Typewriter */}
              <div className="w-full mt-2 bg-white border-3 border-stone-900 rounded-3xl p-4 sm:p-5 shadow-[6px_6px_0px_0px_#1c1917] space-y-3">
                
                {/* Header with Language Indicator Pills */}
                <div className="flex items-center justify-between gap-2 border-b border-stone-200 pb-2.5">
                  <span className="flex items-center gap-1.5 text-xs font-black text-stone-950 uppercase tracking-wider">
                    <Mic className="w-4 h-4 text-[#FF7A59] animate-pulse" />
                    <span>Child Speaks In:</span>
                  </span>

                  {/* Active Language Switcher Pills */}
                  <div className="flex items-center gap-1">
                    {voiceLanguages.map((l, i) => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => handleSelectLanguage(i)}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-black border transition ${
                          activeLangIdx === i
                            ? 'bg-[#FEF08A] text-stone-950 border-stone-900 shadow-[1px_1px_0px_0px_#1c1917]'
                            : 'bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {l.nativeLabel}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Animated Typewriter Prompt Bubble with Grapheme-Accurate Code-Mixing */}
                <div className="min-h-[56px] flex items-center">
                  <p className="text-sm font-extrabold text-stone-950 italic leading-snug">
                    “{displayedText}
                    <span className="inline-block w-1.5 h-4 ml-0.5 bg-[#FF7A59] animate-pulse align-middle" />”
                  </p>
                </div>

                {/* Hidden Audio Element for Multi-Language Audio Playback */}
                <audio
                  ref={audioRef}
                  src={currentVoiceLang.audioPath}
                  preload="metadata"
                  onLoadedMetadata={(e) => {
                    const d = Math.floor(e.currentTarget.duration);
                    if (!isNaN(d) && isFinite(d)) {
                      const m = Math.floor(d / 60);
                      const s = d % 60;
                      setAudioDuration(`${m}:${s < 10 ? '0' : ''}${s}`);
                    }
                  }}
                  onTimeUpdate={(e) => {
                    const cur = Math.floor(e.currentTarget.currentTime);
                    const m = Math.floor(cur / 60);
                    const s = cur % 60;
                    setAudioCurrentTime(`${m}:${s < 10 ? '0' : ''}${s}`);
                  }}
                  onEnded={handleAudioEnded}
                />

                {/* Audio Playing Bar with High-Visibility Attention Grabber */}
                <div className="bg-stone-50 border-2 border-stone-900 rounded-2xl p-3.5 space-y-3 shadow-[2px_2px_0px_0px_#1c1917]">
                  
                  {/* Attention Grabber / Status Header */}
                  <div className="flex items-center justify-between gap-2">
                    {!isPlayingAudio ? (
                      <div className="inline-flex items-center gap-1.5 bg-[#FEF08A] border border-stone-900 px-3 py-1 rounded-full text-xs font-black text-stone-950 shadow-[1px_1px_0px_0px_#1c1917] animate-bounce">
                        <span className="text-sm">👉</span>
                        <span className="tracking-wide">CLICK HERE TO LISTEN!</span>
                        <span className="text-sm">🎧</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 bg-[#BBF7D0] border border-stone-900 px-3 py-1 rounded-full text-xs font-black text-emerald-950 shadow-[1px_1px_0px_0px_#1c1917]">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                        <span>Now Playing: {currentVoiceLang.nativeLabel} Story</span>
                      </div>
                    )}

                    <span className="text-[11px] font-mono font-black text-stone-700 bg-white border border-stone-300 px-2.5 py-0.5 rounded-lg shadow-sm shrink-0">
                      {isPlayingAudio ? audioCurrentTime : audioDuration}
                    </span>
                  </div>

                  {/* Main Control Row: Prominent Interactive Play Button + Soundwave */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={toggleAudio}
                      className={`relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-stone-900 font-black text-xs sm:text-sm transition duration-150 shadow-[3px_3px_0px_0px_#1c1917] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shrink-0 ${
                        isPlayingAudio
                          ? 'bg-[#BBF7D0] text-stone-950 hover:bg-[#a3f3be]'
                          : 'bg-[#FF7A59] hover:bg-[#ff6842] text-stone-950 ring-4 ring-[#FF7A59]/40 hover:ring-[#FF7A59]/60 animate-pulse'
                      }`}
                      title={isPlayingAudio ? 'Pause Story Audio' : 'Click to hear the voice story!'}
                    >
                      {isPlayingAudio ? (
                        <>
                          <Pause className="w-4 h-4 fill-stone-950" />
                          <span>Pause Audio</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-stone-950 ml-0.5" />
                          <span>Play Story</span>
                        </>
                      )}
                    </button>

                    {/* Equalizer Soundwave Track */}
                    <div className="flex-1 flex items-center justify-between gap-1 bg-white border border-stone-300 rounded-xl px-3 py-2.5 overflow-hidden">
                      <span className="text-[11px] font-bold text-stone-600 truncate mr-1">
                        {currentVoiceLang.label} Voice
                      </span>
                      <div className="flex items-center gap-1 h-5 shrink-0">
                        {[12, 18, 8, 22, 14, 20, 10, 16, 12, 18, 14].map((height, i) => (
                          <div
                            key={i}
                            className={`w-1 rounded-full transition-all duration-150 ${
                              isPlayingAudio ? 'bg-[#FF7A59] animate-pulse' : 'bg-stone-300 h-1.5'
                            }`}
                            style={{
                              height: isPlayingAudio ? `${height}px` : '4px',
                              animationDelay: `${i * 90}ms`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Printed Sticker Badge Notice */}
                <div className="flex items-center justify-between text-[11px] font-black text-emerald-900 bg-[#BBF7D0] border border-stone-900 rounded-xl px-2.5 py-1.5 shadow-[1px_1px_0px_0px_#1c1917]">
                  <span className="flex items-center gap-1.5">
                    <Printer className="w-3.5 h-3.5" /> Sticker Printed:
                  </span>
                  <span className="font-bold">{currentVoiceLang.stickerTag}</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 2: PURE CHILDHOOD CREATIVITY (DESKTOP GRID + MOBILE CAROUSEL) --- */}
      <section id="pure-creativity" className="bg-stone-100 border-y-3 border-stone-900 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block bg-[#FEF08A] text-stone-950 text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] mb-3">
              Pure Childhood Creativity
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 leading-tight">
              Built for Wonder. Not Screen Time.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-semibold mt-2">
              Big ideas. Little voices. Real things to hold.
            </p>
          </div>

          {/* Desktop View: All 4 Cards Aligned Side-by-Side */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6 items-stretch">
            {featureCards.map((item) => (
              <div key={item.index} className="h-full">
                {renderFeatureCard(item)}
              </div>
            ))}
          </div>

          {/* Mobile / Tablet View: Auto-Advancing Proportional Carousel */}
          <div className="block lg:hidden">
            <div className="max-w-[340px] sm:max-w-[360px] mx-auto w-full">
              {renderFeatureCard(featureCards[sec2CarouselIdx])}
            </div>

            {/* Carousel Navigation Controls & Indicators */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setSec2CarouselIdx((prev) => (prev - 1 + featureCards.length) % featureCards.length)}
                aria-label="Previous Feature Card"
                className="w-10 h-10 rounded-xl bg-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] flex items-center justify-center text-stone-950 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {featureCards.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSec2CarouselIdx(idx)}
                    aria-label={`Jump to slide ${idx + 1}`}
                    className={`h-3 rounded-full transition-all border-2 border-stone-900 ${
                      sec2CarouselIdx === idx
                        ? 'w-8 bg-[#FF7A59] shadow-[1px_1px_0px_0px_#1c1917]'
                        : 'w-3 bg-white hover:bg-stone-200'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSec2CarouselIdx((prev) => (prev + 1) % featureCards.length)}
                aria-label="Next Feature Card"
                className="w-10 h-10 rounded-xl bg-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] flex items-center justify-center text-stone-950 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 3: CORE INNOVATION (3 LANGUAGES + MIXED LANGUAGES + 10 COMING SOON) --- */}
      <section id="trilingual-usp" className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <div className="bg-[#FEF08A] border-3 border-stone-900 rounded-[36px] p-6 sm:p-10 shadow-[8px_8px_0px_0px_#1c1917] relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 bg-white border-2 border-stone-900 px-4 py-1.5 rounded-full text-xs font-black uppercase text-stone-950 shadow-[2px_2px_0px_0px_#1c1917]">
              <Globe2 className="w-4 h-4 text-[#FF7A59]" /> Core Innovation
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight leading-tight">
              Speaks Your Child’s Real Mother Tongue
            </h2>

            <p className="text-stone-800 text-xs sm:text-sm font-bold max-w-xl mx-auto leading-relaxed">
              Kids don’t speak like textbooks, and neither does WonderBox! We natively support real colloquial speech: <strong>pure mother tongue or mixed with English (Hinglish & Kanglish)</strong>.
            </p>
          </div>

          {/* Desktop View: All 3 Language Cards Side-by-Side */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-5 items-stretch">
            {trilingualCards.map((item) => (
              <div key={item.title} className="h-full">
                {renderTrilingualCard(item)}
              </div>
            ))}
          </div>

          {/* Mobile / Tablet View: Auto-Advancing Proportional Carousel */}
          <div className="block lg:hidden">
            <div className="max-w-[340px] sm:max-w-[360px] mx-auto w-full">
              {renderTrilingualCard(trilingualCards[uspCarouselIdx])}
            </div>

            {/* Carousel Navigation Controls & Indicators */}
            <div className="mt-7 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setUspCarouselIdx((prev) => (prev - 1 + trilingualCards.length) % trilingualCards.length)}
                aria-label="Previous Language Card"
                className="w-10 h-10 rounded-xl bg-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] flex items-center justify-center text-stone-950 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {trilingualCards.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setUspCarouselIdx(idx)}
                    aria-label={`Jump to language slide ${idx + 1}`}
                    className={`h-3 rounded-full transition-all border-2 border-stone-900 ${
                      uspCarouselIdx === idx
                        ? 'w-8 bg-[#FF7A59] shadow-[1px_1px_0px_0px_#1c1917]'
                        : 'w-3 bg-white hover:bg-stone-200'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setUspCarouselIdx((prev) => (prev + 1) % trilingualCards.length)}
                aria-label="Next Language Card"
                className="w-10 h-10 rounded-xl bg-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] flex items-center justify-center text-stone-950 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* --- 10 MORE NATIVE INDIAN LANGUAGES COMING SOON --- */}
          <div className="mt-8 bg-stone-950 text-white border-3 border-stone-900 rounded-3xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#1c1917] flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-[#FACC15] text-stone-950 px-3 py-0.5 rounded-full text-[10px] font-black uppercase">
                <Sparkles className="w-3.5 h-3.5 fill-stone-950" /> Active Expansion
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                10 More Native Indian Languages Coming Soon!
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-stone-300 leading-relaxed max-w-2xl">
                Tamil (தமிழ்) • Telugu (తెలుగు) • Marathi (मराठी) • Bengali (বাংলা) • Gujarati (ગુજરાતી) • Malayalam (മലയാളം) • Punjabi (ਪੰਜਾਬੀ) • Odia (ଓଡ଼ಿଆ) & more.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="#waitlist-top"
                className="inline-flex items-center gap-1.5 bg-[#FF7A59] hover:bg-[#ff6842] text-stone-950 font-black px-4 py-2.5 rounded-xl text-xs border-2 border-stone-900 shadow-[2px_2px_0px_0px_#FEF08A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition"
              >
                Request Your Language →
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 3: FRICTIONLESS & NATURAL (DESKTOP GRID + MOBILE CAROUSEL) --- */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block bg-[#FF7A59] text-stone-950 text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] mb-3">
            Frictionless & Natural
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight leading-tight">
            How Children Create with WonderBox
          </h2>
          <p className="text-stone-600 font-semibold text-base sm:text-lg mt-2">
            From a spark in their mind to a physical sticker in their hands.
          </p>
        </div>

        {/* Desktop View: All 3 Step Cards Side-by-Side */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 items-stretch">
          {stepCards.map((item) => (
            <div key={item.step} className="h-full">
              {renderStepCard(item)}
            </div>
          ))}
        </div>

        {/* Mobile / Tablet View: Auto-Advancing Proportional Carousel */}
        <div className="block lg:hidden">
          <div className="max-w-[340px] sm:max-w-[360px] mx-auto w-full">
            {renderStepCard(stepCards[sec3CarouselIdx])}
          </div>

          {/* Carousel Navigation Controls & Indicators */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setSec3CarouselIdx((prev) => (prev - 1 + stepCards.length) % stepCards.length)}
              aria-label="Previous Step Card"
              className="w-10 h-10 rounded-xl bg-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] flex items-center justify-center text-stone-950 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {stepCards.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSec3CarouselIdx(idx)}
                  aria-label={`Jump to step ${idx + 1}`}
                  className={`h-3 rounded-full transition-all border-2 border-stone-900 ${
                    sec3CarouselIdx === idx
                      ? 'w-8 bg-[#FF7A59] shadow-[1px_1px_0px_0px_#1c1917]'
                      : 'w-3 bg-white hover:bg-stone-200'
                    }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSec3CarouselIdx((prev) => (prev + 1) % stepCards.length)}
              aria-label="Next Step Card"
              className="w-10 h-10 rounded-xl bg-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] flex items-center justify-center text-stone-950 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- PRODUCT DEMONSTRATION VIDEO PLACEHOLDER (HIDDEN UNTIL VIDEO ASSET IS READY) --- */}
        {/*
        <div className="mt-16 bg-stone-50 border-3 border-dashed border-stone-900 rounded-3xl p-8 sm:p-12 text-center shadow-[4px_4px_0px_0px_#1c1917] relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FF7A59] border-2 border-stone-900 mx-auto flex items-center justify-center shadow-[3px_3px_0px_0px_#1c1917]">
              <Video className="w-8 h-8 text-stone-950" />
            </div>

            <div className="inline-block bg-[#FEF08A] border-2 border-stone-900 px-3 py-1 rounded-full text-xs font-black uppercase text-stone-950">
              Product Demonstration Video Placeholder
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-stone-950">
              See WonderBox in Action (Voice ➔ Story ➔ Sticker)
            </h3>

            <p className="text-xs sm:text-sm font-medium text-stone-600 leading-relaxed">
              Drop your official product video or demonstration clip here. Replace with an <code className="bg-white px-2 py-0.5 rounded border border-stone-400 font-mono text-stone-900">.mp4</code> or video embed to showcase WonderBox in action.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs font-bold text-stone-600 bg-white border border-stone-300 rounded-lg px-3 py-1.5">
                📁 Asset Path: <code className="text-stone-900 font-mono font-bold">/public/wonderbox_demo.mp4</code>
              </span>
            </div>
          </div>
        </div>
        */}

      </section>

      {/* --- THE STICKER STUDIO (WITH STICKER ARTWORK PLACEHOLDER) --- */}
      <section id="sticker-studio" className="bg-[#FEF08A]/30 border-y-3 border-stone-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF7A59]">
              Creative Sticker Gallery
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight mt-1 mb-3">
              The Sticker Studio
            </h2>
            <p className="text-stone-600 font-medium text-sm sm:text-base">
              Every spoken adventure creates an ink-free black-and-white line-art sticker ready for children to color and collect.
            </p>
          </div>

          {/* Interactive Creation Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {sampleStories.map((story, idx) => (
              <button
                key={story.title}
                type="button"
                onClick={() => setActiveStoryIdx(idx)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black border-2 border-stone-900 transition flex items-center gap-2 ${
                  activeStoryIdx === idx
                    ? 'bg-stone-950 text-white shadow-[3px_3px_0px_0px_#FF7A59]'
                    : 'bg-white text-stone-800 hover:bg-stone-100 shadow-[2px_2px_0px_0px_#1c1917]'
                }`}
              >
                <span>{story.icon}</span>
                <span>{story.title}</span>
              </button>
            ))}
          </div>

          {/* Demonstration Panel */}
          <div className="bg-white border-3 border-stone-900 rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_0px_#1c1917]">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Story details and prompt */}
              <div className="lg:col-span-7 space-y-5">
                
                <div className="inline-flex items-center gap-2 bg-[#FEF08A] border-2 border-stone-900 px-3.5 py-1 rounded-full text-xs font-black uppercase">
                  <span>{currentStory.icon}</span> {currentStory.category}
                </div>

                <h3 className="text-3xl font-black text-stone-950">
                  {currentStory.title}
                </h3>

                <div className="bg-[#FFFDF9] border-2 border-stone-900 rounded-2xl p-4 space-y-2">
                  <div className="text-[11px] font-black uppercase text-[#FF7A59] tracking-wider flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5" /> Spoken Idea:
                  </div>
                  <p className="text-sm font-bold text-stone-900 italic">
                    {currentStory.prompt}
                  </p>
                </div>

                <div className="bg-stone-50 border-2 border-stone-900 rounded-2xl p-4 space-y-2">
                  <div className="text-[11px] font-black uppercase text-stone-500 tracking-wider flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-stone-800" /> Narration Snippet:
                  </div>
                  <p className="text-sm font-semibold text-stone-700">
                    {currentStory.audioSnippet}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-stone-500">
                  <Printer className="w-4 h-4 text-stone-900" />
                  <span>Printed in 4 seconds on ink-free, refillable thermal sticker paper.</span>
                </div>

              </div>

              {/* Right Column: Sticker Image Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-xs bg-stone-50 border-3 border-stone-900 rounded-3xl p-5 shadow-[6px_6px_0px_0px_#1c1917] text-center relative">
                  
                  {/* Sticker Header Notch */}
                  <div className="text-[10px] font-mono uppercase text-stone-400 border-b border-dashed border-stone-300 pb-2 mb-4 flex justify-between items-center">
                    <span>WONDERBOX THERMAL PRINT</span>
                    <span>INSTANT OUTPUT</span>
                  </div>

                  {/* High Quality Sticker Image */}
                  <div className="w-52 h-52 mx-auto rounded-2xl border-2 border-stone-900 bg-white flex items-center justify-center p-3 text-center relative overflow-hidden shadow-[3px_3px_0px_0px_#1c1917]">
                    <img
                      src={`/stickers/${currentStory.id}.png`}
                      alt={currentStory.title}
                      className="w-full h-full object-contain select-none"
                    />

                    {/* Peel Corner Simulation */}
                    <div className="absolute top-0 right-0 w-6 h-6 bg-stone-200 border-b-2 border-l-2 border-stone-900 rounded-bl-lg shadow-sm" />
                  </div>

                  <div className="mt-4 pt-3 border-t border-dashed border-stone-300">
                    <p className="text-xs font-black text-stone-900">
                      {currentStory.stickerName}
                    </p>
                    <p className="text-[10px] text-stone-500 font-semibold mt-0.5">
                      Peel & stick thermal sticker • 100% ink-free
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* --- PARENT COMPANION APP --- */}
      <section id="parent-app" className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Parental control values */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-[#BFDBFE] border-2 border-stone-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-stone-900 shadow-[2px_2px_0px_0px_#1c1917]">
                <Sliders className="w-3.5 h-3.5 text-stone-950" /> Companion Mobile App
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight leading-tight pt-2 sm:pt-3">
              Full control for parents.
              <br />
              Zero screens for kids.
            </h2>

            <p className="text-stone-700 text-sm sm:text-base font-medium leading-relaxed">
              While your child enjoys an entirely screen-free hardware experience, you curate what enters their universe. Adjust bedtime boundaries, moral values, and sticker quotas with effortless sliders.
            </p>

            <div className="space-y-4 pt-2">
              <div className="bg-white border-2 border-stone-900 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#1c1917] flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FEF08A] border-2 border-stone-900 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-stone-900" />
                </div>
                <div>
                  <h4 className="text-base font-black text-stone-950">Curate Family Values</h4>
                  <p className="text-xs text-stone-600 font-medium leading-relaxed mt-0.5">
                    Tune how often stories highlight kindness, honesty, curiosity, or courage. The AI adapts the narrative tone seamlessly.
                  </p>
                </div>
              </div>

              <div className="bg-white border-2 border-stone-900 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#1c1917] flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#BBF7D0] border-2 border-stone-900 flex items-center justify-center shrink-0">
                  <Sliders className="w-5 h-5 text-stone-900" />
                </div>
                <div>
                  <h4 className="text-base font-black text-stone-950">Daily Sticker Quotas</h4>
                  <p className="text-xs text-stone-600 font-medium leading-relaxed mt-0.5">
                    Prevent paper waste and teach mindful creation by setting a daily printable sticker budget (e.g., 5 stickers/day).
                  </p>
                </div>
              </div>

              <div className="bg-white border-2 border-stone-900 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#1c1917] flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#BFDBFE] border-2 border-stone-900 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 text-stone-900" />
                </div>
                <div>
                  <h4 className="text-base font-black text-stone-950">Curated Story Themes</h4>
                  <p className="text-xs text-stone-600 font-medium leading-relaxed mt-0.5">
                    Unlock educational themes curated with educators: STEM discovery, mythologies, wildlife, and geography.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Smartphone UI Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm bg-stone-950 border-4 border-stone-900 rounded-[40px] p-4 shadow-[10px_10px_0px_0px_#1c1917] relative">
              
              {/* Dynamic Island / Speaker */}
              <div className="w-28 h-5 bg-stone-900 border border-stone-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-stone-700 mr-2" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80" />
              </div>

              {/* Phone Inner Screen */}
              <div className="bg-[#FFFDF9] border-2 border-stone-900 rounded-[28px] p-5 space-y-4">
                
                {/* App Header */}
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase text-stone-400">WonderBox Parent App</div>
                    <div className="text-sm font-black text-stone-950">Aria’s WonderBox</div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>

                {/* Moral Values Slider Widgets */}
                <div className="bg-white border-2 border-stone-900 rounded-2xl p-3.5 space-y-3 shadow-[2px_2px_0px_0px_#1c1917]">
                  <div className="text-xs font-black text-stone-950 flex items-center justify-between">
                    <span>Moral Focus Sliders</span>
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  </div>

                  {/* Slider 1: Kindness */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-stone-700">
                      <span>💛 Kindness & Empathy</span>
                      <span className="text-[#FF7A59] font-black">95%</span>
                    </div>
                    <div className="w-full h-2.5 bg-stone-100 rounded-full border border-stone-900 overflow-hidden">
                      <div className="w-[95%] h-full bg-[#FF7A59]" />
                    </div>
                  </div>

                  {/* Slider 2: Curiosity */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-stone-700">
                      <span>🔍 Curiosity & Science</span>
                      <span className="text-blue-600 font-black">100%</span>
                    </div>
                    <div className="w-full h-2.5 bg-stone-100 rounded-full border border-stone-900 overflow-hidden">
                      <div className="w-full h-full bg-[#BFDBFE]" />
                    </div>
                  </div>

                  {/* Slider 3: Courage */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-stone-700">
                      <span>🦁 Courage & Discovery</span>
                      <span className="text-emerald-700 font-black">80%</span>
                    </div>
                    <div className="w-full h-2.5 bg-stone-100 rounded-full border border-stone-900 overflow-hidden">
                      <div className="w-[80%] h-full bg-[#BBF7D0]" />
                    </div>
                  </div>
                </div>

                {/* Daily Print Allowance Status */}
                <div className="bg-[#FEF08A] border-2 border-stone-900 rounded-2xl p-3 shadow-[2px_2px_0px_0px_#1c1917]">
                  <div className="flex justify-between items-center text-xs font-black text-stone-950 mb-1.5">
                    <span>Sticker Budget</span>
                    <span>150 / 500 Used</span>
                  </div>
                  <div className="w-full h-2 bg-white rounded-full border border-stone-900 overflow-hidden">
                    <div className="w-[30%] h-full bg-stone-950" />
                  </div>
                </div>

                {/* Safe Bedtime Toggle */}
                <div className="bg-white border-2 border-stone-900 rounded-2xl p-3 flex items-center justify-between shadow-[2px_2px_0px_0px_#1c1917]">
                  <div>
                    <div className="text-xs font-black text-stone-950">Bedtime Wind-Down</div>
                    <div className="text-[10px] text-stone-500 font-semibold">Calming audio only after 8 PM</div>
                  </div>
                  <div className="w-10 h-5 bg-emerald-500 rounded-full border border-stone-900 flex items-center justify-end px-0.5">
                    <div className="w-4 h-4 bg-white rounded-full border border-stone-900" />
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- QUICK BOTTOM CTA (BATCH #1 ROLLOUT - WARM SOFT COLOR) --- */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-[#FEF08A] text-stone-950 border-3 border-stone-900 rounded-3xl p-8 sm:p-12 shadow-[8px_8px_0px_0px_#1c1917] text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-white text-stone-950 px-3.5 py-1 rounded-full text-xs font-black uppercase border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917]">
            <Star className="w-3.5 h-3.5 fill-stone-950" /> Batch #1 Rollout
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-950 max-w-xl mx-auto">
            Ready to bring your child’s imagination into the real world?
          </h2>

          <p className="text-stone-800 text-sm sm:text-base font-semibold max-w-lg mx-auto">
            Join 200+ early families and partner educators locking in their spot on the first 1,000 units production rollout.
          </p>

          <div className="pt-2">
            <a
              href="#waitlist-top"
              className="inline-flex items-center justify-center gap-2 bg-[#FF7A59] hover:bg-[#ff6842] text-stone-950 font-black px-8 py-4 rounded-2xl text-base border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition"
            >
              Reserve Early Batch Now
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* --- FOUNDER & CORPORATE FOOTER --- */}
      <footer className="bg-stone-950 text-stone-300 border-t-3 border-stone-900 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 pb-10 border-b border-stone-800 items-center">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#FACC15] text-stone-950 font-black flex items-center justify-center">
                  W
                </div>
                <span className="text-xl font-black text-white">WonderBox</span>
              </div>
              <p className="text-xs text-stone-400 max-w-md leading-relaxed">
                Developed and operated by <strong className="text-white">Mindfield Private Limited</strong> (Shimoga, Karnataka, India). Founded by <strong className="text-white">Karthik S Goudar</strong>. Building the platform where children’s imagination comes to life.
              </p>
            </div>

            <div className="flex flex-wrap md:justify-end gap-5 text-xs font-bold">
              <a href="tel:+919886965964" className="hover:text-[#FACC15] flex items-center gap-1.5 transition">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> +91 9886 965 964 (Direct & WhatsApp)
              </a>
              <a href="mailto:karthik@wonderboxai.com" className="hover:text-[#FACC15] flex items-center gap-1.5 transition">
                <Mail className="w-3.5 h-3.5" /> karthik@wonderboxai.com
              </a>
              <a href="mailto:contact@wonderboxai.com" className="hover:text-[#FACC15] flex items-center gap-1.5 transition">
                <Mail className="w-3.5 h-3.5" /> contact@wonderboxai.com
              </a>
              <a href="mailto:investors@wonderboxai.com" className="hover:text-[#FACC15] flex items-center gap-1.5 transition">
                <Mail className="w-3.5 h-3.5" /> investors@wonderboxai.com
              </a>
            </div>
          </div>

          {/* Legal & Trust Navigation Bar */}
          <div className="py-6 border-b border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs font-bold">
            <div className="flex flex-wrap items-center gap-6 text-stone-400">
              <Link href="/privacy" className="hover:text-[#FEF08A] transition flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Privacy & Child Safety
              </Link>
              <Link href="/terms" className="hover:text-[#FEF08A] transition">
                Terms of Service
              </Link>
              <Link href="/safety" className="hover:text-[#FEF08A] transition flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Hardware & AI Safety
              </Link>
              <Link href="/contact" className="hover:text-[#FEF08A] transition">
                Corporate Contact
              </Link>
            </div>

            <div className="text-[11px] font-mono text-stone-500">
              Registered Office: Shimoga, Karnataka, India
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4">
            <p>
              © 2026 <strong className="text-stone-300">Mindfield Private Limited</strong>. WonderBox™ is developed, owned, and operated by Mindfield Private Limited. All rights reserved.
            </p>
            <p className="font-mono text-[11px]">DPDP Act 2023 & COPPA Compliant</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
