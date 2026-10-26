'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Printer,
  Mic,
  Volume2,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Gamepad2,
  BookOpen,
  Sliders,
  Layers,
  Award,
  QrCode,
  Mail,
  Star,
  Users,
  School,
  Cpu
} from 'lucide-react';

export default function WonderBoxLandingPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'parent' | 'school' | 'investor'>('parent');
  const [ageGroup, setAgeGroup] = useState<'3-5' | '6-8' | '9-12'>('6-8');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

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
    } catch {
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-stone-900 font-sans selection:bg-[#FF7A59]/20 selection:text-stone-900">
      
      {/* --- TOP TRACTION BAR --- */}
      <div className="bg-[#FEF08A] border-b-2 border-stone-900 px-4 py-2 text-center text-xs sm:text-sm font-bold text-stone-900 flex items-center justify-center gap-2 flex-wrap">
        <span>✨ Join 200+ Parent Signups & 10+ Partner Schools on the First 1,000 Units Waitlist</span>
        <a href="#waitlist" className="underline decoration-2 underline-offset-2 hover:text-[#FF7A59]">
          Reserve Your Spot →
        </a>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#FACC15] border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1c1917] flex items-center justify-center font-black text-xl text-stone-900">
            W
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-stone-900 block leading-none">
              WonderBox
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
              Mindfield Pvt Ltd
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-7 text-sm font-bold text-stone-700">
          <a href="#sacred-loop" className="hover:text-[#FF7A59] transition">How It Works</a>
          <a href="#engines" className="hover:text-[#FF7A59] transition">AI Engines</a>
          <a href="#games" className="hover:text-[#FF7A59] transition">Voice Games</a>
          <a href="#families" className="hover:text-[#FF7A59] transition">For Parents</a>
          <a href="#plans" className="hover:text-[#FF7A59] transition">Plans</a>
          <a href="/connect" className="flex items-center gap-1 text-stone-900 hover:text-[#FF7A59] transition">
            <QrCode className="w-4 h-4" /> Founder Card
          </a>
        </div>

        <a
          href="#waitlist"
          className="bg-[#FF7A59] hover:bg-[#ff6842] text-stone-950 font-black px-5 py-2.5 rounded-xl text-sm border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1c1917] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition"
        >
          Join Waitlist
        </a>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#BFDBFE] border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] text-stone-900 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Screen-Free AI Creative Device
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-stone-950 tracking-tight leading-[1.06]">
              Where Imagination{' '}
              <span className="text-[#FF7A59] underline decoration-stone-900 decoration-4 underline-offset-4">
                Becomes Real.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-stone-700 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              WonderBox is an AI-native, screen-free device that listens to your child’s voice and turns their imagination into <strong>printable coloring stickers</strong>, <strong>real-time audio stories</strong>, and <strong>interactive voice games</strong> in seconds.
            </p>

            {/* Hero Waitlist Form */}
            <div className="pt-2 max-w-lg mx-auto lg:mx-0">
              {status === 'success' ? (
                <div className="bg-[#BBF7D0] border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] px-5 py-4 rounded-2xl flex items-center gap-3 text-sm font-bold text-stone-900">
                  <CheckCircle2 className="w-6 h-6 text-stone-900 shrink-0" />
                  <span>You’re on the list! We’ll reach out with early batch and pilot details.</span>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter parent, school, or investor email..."
                    className="flex-1 px-4 py-3.5 rounded-xl bg-white border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1c1917] focus:outline-none focus:ring-2 focus:ring-[#FF7A59] text-stone-900 placeholder:text-stone-400 text-sm font-semibold"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-[#FACC15] hover:bg-amber-400 text-stone-950 font-black px-6 py-3.5 rounded-xl text-sm border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1c1917] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition flex items-center justify-center gap-2 shrink-0"
                  >
                    {status === 'loading' ? 'Joining...' : 'Get Early Access'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Traction Pills from Pitch Deck */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="bg-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#FF7A59]" /> 200+ Parent Signups
              </div>
              <div className="bg-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-emerald-600" /> 10+ Schools LOIs
              </div>
              <div className="bg-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-blue-600" /> Working Prototype
              </div>
            </div>
          </div>

          {/* Right Column: Yellow WonderBox Cube Hardware Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Pop Sticker Printout Emerging from Top */}
              <div className="mx-auto w-56 bg-white border-2 border-stone-900 rounded-t-2xl p-4 shadow-[4px_0px_0px_0px_#1c1917] relative z-10 -mb-3 transform -rotate-2">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 border-b border-dashed border-stone-300 pb-1 mb-2 flex justify-between">
                  <span>STICKER OUTPUT</span>
                  <span>#042</span>
                </div>
                <div className="py-3 flex flex-col items-center justify-center border-2 border-dashed border-stone-300 rounded-xl bg-stone-50">
                  <div className="text-4xl mb-1">🤖 🎵</div>
                  <p className="text-xs font-black text-stone-900 uppercase">Dancing Robot Sticker</p>
                  <p className="text-[10px] text-stone-500 font-semibold">Ready to Peel & Colour!</p>
                </div>
              </div>

              {/* Yellow Cube Body */}
              <div className="bg-[#FACC15] border-4 border-stone-900 rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1c1917] relative z-20">
                {/* Top Tactile Push Button */}
                <div className="w-16 h-4 bg-white border-2 border-stone-900 rounded-full mx-auto -mt-9 mb-6 shadow-sm" />

                {/* Front Display / Story Frame */}
                <div className="bg-white border-4 border-stone-900 rounded-2xl p-5 shadow-inner">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-500 mb-3">
                    <span className="flex items-center gap-1.5 text-stone-900">
                      <Mic className="w-4 h-4 text-[#FF7A59]" /> Voice Prompt:
                    </span>
                    <span className="bg-[#BBF7D0] text-stone-900 px-2 py-0.5 rounded border border-stone-900 text-[10px] font-black">
                      LISTENING → PRINTING
                    </span>
                  </div>

                  <p className="text-base sm:text-lg font-black text-stone-900 italic mb-4">
                    “Make a friendly robot who loves disco dancing in space!”
                  </p>

                  <div className="bg-stone-100 border-2 border-stone-900 rounded-xl p-3 flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-[#FF7A59]" />
                      Syncing Story + SFX + Music
                    </span>
                    <span className="font-mono text-stone-500">02:45</span>
                  </div>
                </div>

                {/* Cube Bottom Badge */}
                <div className="mt-5 flex items-center justify-between text-xs font-black text-stone-900 uppercase tracking-wider">
                  <span>WonderBox V1</span>
                  <span>Listens • Generates • Prints • Evolves</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- THE PROBLEM VS OPPORTUNITY --- */}
      <section className="bg-stone-900 text-white py-16 border-y-2 border-stone-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="bg-[#FF7A59] text-stone-950 text-xs font-black uppercase px-3 py-1 rounded-full border border-stone-950">
                The Problem
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Children don’t lack imagination. They lack tools that make it real instantly.
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Today, screens dominate playtime and replace active creativity with passive consumption. Most physical toys have finite engagement—and a child’s best ideas disappear the moment they are imagined.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="bg-stone-800 border-2 border-stone-700 p-4 rounded-2xl flex items-center justify-between">
                <span className="text-stone-400 text-sm font-bold line-through">Passive Screen Consumption</span>
                <span className="text-[#FACC15] text-sm font-black">→ Active World Building</span>
              </div>
              <div className="bg-stone-800 border-2 border-stone-700 p-4 rounded-2xl flex items-center justify-between">
                <span className="text-stone-400 text-sm font-bold line-through">Toys With Finite Engagement</span>
                <span className="text-[#BBF7D0] text-sm font-black">→ Evolving AI Story Universe</span>
              </div>
              <div className="bg-stone-800 border-2 border-stone-700 p-4 rounded-2xl flex items-center justify-between">
                <span className="text-stone-400 text-sm font-bold line-through">Fleeting Spoken Ideas</span>
                <span className="text-[#BFDBFE] text-sm font-black">→ Printable Stickers in Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE SACRED LOOP (SLIDE 5) --- */}
      <section id="sacred-loop" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-[#FF7A59]">
            The Core Experience
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight mt-1 mb-3">
            The Sacred Loop
          </h2>
          <p className="text-stone-600 font-medium text-base sm:text-lg">
            A simple creative cycle where children imagine, create, and make it their own.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1: Imagine */}
          <div className="bg-[#FEF08A] border-2 border-stone-900 rounded-3xl p-8 shadow-[6px_6px_0px_0px_#1c1917] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black uppercase tracking-widest bg-white px-3 py-1 rounded-full border-2 border-stone-900">
                  Step 01
                </span>
                <Sparkles className="w-7 h-7 text-stone-900" />
              </div>
              <h3 className="text-2xl font-black text-stone-950 mb-3">Imagine</h3>
              <p className="text-stone-800 font-medium text-sm leading-relaxed">
                Imagination starts with the child. They speak a character, a riddle answer, or a wild story idea directly to WonderBox.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t-2 border-stone-900/15 text-xs font-bold text-stone-700">
              100% Voice-Driven • Zero Menus
            </div>
          </div>

          {/* Step 2: Create */}
          <div className="bg-[#BFDBFE] border-2 border-stone-900 rounded-3xl p-8 shadow-[6px_6px_0px_0px_#1c1917] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black uppercase tracking-widest bg-white px-3 py-1 rounded-full border-2 border-stone-900">
                  Step 02
                </span>
                <Printer className="w-7 h-7 text-stone-900" />
              </div>
              <h3 className="text-2xl font-black text-stone-950 mb-3">Create</h3>
              <p className="text-stone-800 font-medium text-sm leading-relaxed">
                In-house AI brings their idea to life instantly as an immersive audio story and a <strong>printable black-and-white line-art sticker</strong>.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t-2 border-stone-900/15 text-xs font-bold text-stone-700">
              Ink-Free Thermal Sticker Output
            </div>
          </div>

          {/* Step 3: Own */}
          <div className="bg-[#BBF7D0] border-2 border-stone-900 rounded-3xl p-8 shadow-[6px_6px_0px_0px_#1c1917] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black uppercase tracking-widest bg-white px-3 py-1 rounded-full border-2 border-stone-900">
                  Step 03
                </span>
                <Award className="w-7 h-7 text-stone-900" />
              </div>
              <h3 className="text-2xl font-black text-stone-950 mb-3">Own</h3>
              <p className="text-stone-800 font-medium text-sm leading-relaxed">
                Children colour their sticker with real crayons, peel and stick it into their world, and build deep emotional attachment to their creations.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t-2 border-stone-900/15 text-xs font-bold text-stone-700">
              Imagine → Create → Collect → Share Worlds
            </div>
          </div>
        </div>
      </section>

      {/* --- PROPRIETARY AI TECHNOLOGY (SLIDE 6, 10, 14) --- */}
      <section id="engines" className="bg-stone-100 border-y-2 border-stone-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF7A59]">
              WonderBox AI Technology
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-950 tracking-tight mt-1 mb-3">
              Powered by In-House AI Built for Children
            </h2>
            <p className="text-stone-600 font-medium text-sm sm:text-base">
              WonderBox is not just a toy—it is a compounding creative system that adapts to your child’s cognitive stage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white border-2 border-stone-900 rounded-3xl p-7 shadow-[4px_4px_0px_0px_#1c1917]">
              <div className="w-11 h-11 rounded-xl bg-[#BBF7D0] border-2 border-stone-900 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5 text-stone-900" />
              </div>
              <h3 className="text-xl font-black text-stone-950 mb-2">1. Proprietary Story Engine</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Generates age-appropriate stories in real time with interactive decision-making. Synchronises narration, background music, and sound effects from a curated audio library for an immersive storytelling experience.
              </p>
            </div>

            <div className="bg-white border-2 border-stone-900 rounded-3xl p-7 shadow-[4px_4px_0px_0px_#1c1917]">
              <div className="w-11 h-11 rounded-xl bg-[#BFDBFE] border-2 border-stone-900 flex items-center justify-center mb-4">
                <Printer className="w-5 h-5 text-stone-900" />
              </div>
              <h3 className="text-xl font-black text-stone-950 mb-2">2. Custom Illustration & Sticker Engine</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                A custom image generation model trained specifically to create bold, clean black-and-white line-art illustrations designed for instant thermal sticker printing and colouring.
              </p>
            </div>

            <div className="bg-white border-2 border-stone-900 rounded-3xl p-7 shadow-[4px_4px_0px_0px_#1c1917]">
              <div className="w-11 h-11 rounded-xl bg-[#FEF08A] border-2 border-stone-900 flex items-center justify-center mb-4">
                <Gamepad2 className="w-5 h-5 text-stone-900" />
              </div>
              <h3 className="text-xl font-black text-stone-950 mb-2">3. Interactive Voice Game Engine</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Powers voice-driven riddles, challenges, and learning games where every right answer prints a collectible sticker reward—feeling like magic, never a worksheet.
              </p>
            </div>

            <div className="bg-white border-2 border-stone-900 rounded-3xl p-7 shadow-[4px_4px_0px_0px_#1c1917]">
              <div className="w-11 h-11 rounded-xl bg-[#FF7A59]/30 border-2 border-stone-900 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-stone-900" />
              </div>
              <h3 className="text-xl font-black text-stone-950 mb-2">4. Deep Personalisation & Hero Mode</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Your child becomes the hero of their own story worlds. The system remembers their favourite characters and creative patterns, evolving alongside them over time.
              </p>
            </div>
          </div>

          {/* Age-Adaptive AI Models Bar */}
          <div className="bg-white border-2 border-stone-900 rounded-3xl p-6 sm:p-8 shadow-[4px_4px_0px_0px_#1c1917]">
            <h4 className="text-center text-sm font-black uppercase tracking-wider text-stone-900 mb-6">
              Age-Adaptive AI Models — Tuned for Every Developmental Stage
            </h4>
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-[#FEF08A]/50 border-2 border-stone-900">
                <div className="text-lg font-black text-stone-950">Ages 3–5 Years</div>
                <p className="text-xs font-semibold text-stone-700 mt-1">Visual, simple outputs & foundational voice discovery</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#BFDBFE]/50 border-2 border-stone-900">
                <div className="text-lg font-black text-stone-950">Ages 6–8 Years</div>
                <p className="text-xs font-semibold text-stone-700 mt-1">Structured storytelling, voice riddles & collectible sets</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#BBF7D0]/50 border-2 border-stone-900">
                <div className="text-lg font-black text-stone-950">Ages 9–12 Years</div>
                <p className="text-xs font-semibold text-stone-700 mt-1">Deeper narratives, world-building & complex creativity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE GAMES SHOWCASE (SLIDE 7) --- */}
      <section id="games" className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="bg-[#FEF08A] border-2 border-stone-900 px-3 py-1 rounded-full text-xs font-black uppercase">
              Interactive Voice Games
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-950 tracking-tight">
              Kids don’t just play the game—they create the outcome.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-medium leading-relaxed">
              WonderBox turns voice riddles into collectible coloring stickers. Each correct guess prints a brand-new sticker for their physical collection album.
            </p>
            <div className="pt-2">
              <p className="text-xs font-black uppercase tracking-wider text-stone-500 mb-2.5">
                Expandable Game Categories:
              </p>
              <div className="flex flex-wrap gap-2">
                {['🐘 Animals', '🦖 Dinosaurs', '🚀 Space', '🚒 Vehicles', '👩‍🔬 Jobs', '🐉 Creatures'].map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1.5 bg-white border-2 border-stone-900 rounded-xl text-xs font-extrabold shadow-[2px_2px_0px_0px_#1c1917]"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border-2 border-stone-900 rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#1c1917]">
            <div className="text-xs font-black uppercase tracking-wider text-[#FF7A59] mb-4">
              Live Game Loop Example: “Guess The Animal”
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-[#FFFDF9] border-2 border-stone-900 rounded-2xl p-4">
                <span className="text-xs font-black bg-[#FEF08A] px-2 py-0.5 rounded border border-stone-900">
                  1. Clues
                </span>
                <p className="text-xs font-bold text-stone-800 mt-3 italic leading-relaxed">
                  “I’m thinking of an animal. It has a long trunk. It is very big.”
                </p>
              </div>

              <div className="bg-[#FFFDF9] border-2 border-stone-900 rounded-2xl p-4">
                <span className="text-xs font-black bg-[#BFDBFE] px-2 py-0.5 rounded border border-stone-900">
                  2. Voice Guess
                </span>
                <p className="text-sm font-black text-stone-900 mt-3">
                  Child shouts: “Elephant!” 🐘
                </p>
                <p className="text-[11px] text-stone-500 font-semibold mt-1">
                  Natural speech recognition
                </p>
              </div>

              <div className="bg-[#FFFDF9] border-2 border-stone-900 rounded-2xl p-4">
                <span className="text-xs font-black bg-[#BBF7D0] px-2 py-0.5 rounded border border-stone-900">
                  3. Sticker Reward
                </span>
                <p className="text-xs font-bold text-stone-800 mt-3 leading-relaxed">
                  Prints a custom black-and-white Elephant sticker to colour & collect!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BUILT FOR FAMILIES & BUNDLE STORE (SLIDE 8 & 9) --- */}
      <section id="families" className="bg-[#FEF08A]/30 border-y-2 border-stone-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF7A59]">
              Companion Mobile App
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-950 tracking-tight mt-1 mb-3">
              Built for Families. Full Control for Parents.
            </h2>
            <p className="text-stone-600 font-medium text-sm sm:text-base">
              While children enjoy a 100% screen-free hardware experience, parents manage values, limits, and content packs from the WonderBox mobile app.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Moral Filters */}
            <div className="bg-white border-2 border-stone-900 rounded-3xl p-7 shadow-[4px_4px_0px_0px_#1c1917]">
              <div className="flex items-center gap-2.5 mb-4">
                <ShieldCheck className="w-6 h-6 text-[#FF7A59]" />
                <h3 className="text-lg font-black text-stone-950">Moral Filters</h3>
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                Adjust the core values reflected in stories generated by WonderBox. Stories adapt automatically to weave in your family’s chosen themes:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-black">
                <div className="bg-[#FEF08A] border border-stone-900 rounded-lg px-3 py-2">✨ Discipline</div>
                <div className="bg-[#BFDBFE] border border-stone-900 rounded-lg px-3 py-2">🔍 Curiosity</div>
                <div className="bg-[#BBF7D0] border border-stone-900 rounded-lg px-3 py-2">💛 Kindness</div>
                <div className="bg-[#FF7A59]/30 border border-stone-900 rounded-lg px-3 py-2">🦁 Courage</div>
              </div>
            </div>

            {/* Parental Controls */}
            <div className="bg-white border-2 border-stone-900 rounded-3xl p-7 shadow-[4px_4px_0px_0px_#1c1917]">
              <div className="flex items-center gap-2.5 mb-4">
                <Sliders className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-black text-stone-950">Parental Controls</h3>
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                Complete visibility and healthy boundaries over how your child interacts with WonderBox every day:
              </p>
              <ul className="space-y-2.5 text-xs font-bold text-stone-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Set daily sticker generation limits
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Instant notifications when creations are generated
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Save & archive your child’s stories in the app
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Customise story filters & age brackets
                </li>
              </ul>
            </div>

            {/* Bundle Store */}
            <div className="bg-white border-2 border-stone-900 rounded-3xl p-7 shadow-[4px_4px_0px_0px_#1c1917]">
              <div className="flex items-center gap-2.5 mb-4">
                <Layers className="w-6 h-6 text-emerald-600" />
                <h3 className="text-lg font-black text-stone-950">The Bundle Store</h3>
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                Download free and premium themed packs created by WonderBox, teachers, and creators:
              </p>
              <div className="flex flex-wrap gap-1.5 text-xs font-extrabold">
                {[
                  'STEM Pack',
                  'Cultural Stories',
                  'Academic Pack',
                  'Creativity Pack',
                  'Geography Pack',
                  'Teacher Bundles'
                ].map((pack) => (
                  <span
                    key={pack}
                    className="bg-[#BBF7D0]/60 border border-stone-900 px-2.5 py-1 rounded-full text-stone-900"
                  >
                    {pack}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SUBSCRIPTION TIERS (SLIDE 13) --- */}
      <section id="plans" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-[#FF7A59]">
            Device + WonderBox+ Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-950 tracking-tight mt-1 mb-3">
            Plans That Grow With Your Child’s Imagination
          </h2>
          <p className="text-stone-600 font-medium text-sm sm:text-base">
            Every WonderBox includes access to the companion app and Bundle Store, with three flexible membership tiers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <div className="bg-white border-2 border-stone-900 rounded-3xl p-7 shadow-[4px_4px_0px_0px_#1c1917] flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-stone-200 border border-stone-900">
                Included Tier
              </span>
              <h3 className="text-2xl font-black text-stone-950 mt-4 mb-4">Basic</h3>
              <ul className="space-y-3 text-xs sm:text-sm font-semibold text-stone-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-stone-900 shrink-0" /> Sticker Creation Mode (daily allowance)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-stone-900 shrink-0" /> Basic Story Mode</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-stone-900 shrink-0" /> Access to WonderBox Mobile App</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-stone-900 shrink-0" /> Save & manage creations in the app</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-200 text-xs font-bold text-stone-500">
              + Access to the Bundle Store
            </div>
          </div>

          {/* Creator Plan */}
          <div className="bg-[#BFDBFE]/40 border-2 border-stone-900 rounded-3xl p-7 shadow-[6px_6px_0px_0px_#1c1917] flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-[#BFDBFE] border border-stone-900">
                Most Popular
              </span>
              <h3 className="text-2xl font-black text-stone-950 mt-4 mb-4">Creator</h3>
              <ul className="space-y-3 text-xs sm:text-sm font-semibold text-stone-800">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-stone-900 shrink-0" /> Everything in Basic Plan</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-stone-900 shrink-0" /> Higher sticker generation limits</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-stone-900 shrink-0" /> Interactive Story Mode</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-stone-900 shrink-0" /> Full Interactive Voice Games</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-900/15 text-xs font-bold text-stone-700">
              + Expanded creative usage & Bundle Store
            </div>
          </div>

          {/* Hero Plan */}
          <div className="bg-[#FEF08A] border-2 border-stone-900 rounded-3xl p-7 shadow-[6px_6px_0px_0px_#1c1917] flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-[#FF7A59] text-stone-950 border border-stone-900">
                Ultimate Magic
              </span>
              <h3 className="text-2xl font-black text-stone-950 mt-4 mb-4">Hero</h3>
              <ul className="space-y-3 text-xs sm:text-sm font-semibold text-stone-900">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-stone-900 shrink-0" /> Everything in Creator Plan</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-stone-900 shrink-0" /> Unlimited sticker generation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-stone-900 shrink-0" /> Personalised Story Mode</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-stone-900 shrink-0" /> Child becomes the hero in story illustrations</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-900/15 text-xs font-bold text-stone-800">
              + Priority Bundle Drops & Full Ecosystem
            </div>
          </div>
        </div>
      </section>

      {/* --- PRIORITY WAITLIST & PILOT CAPTURE --- */}
      <section id="waitlist" className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white border-4 border-stone-900 rounded-3xl p-8 sm:p-12 shadow-[8px_8px_0px_0px_#1c1917] text-center">
          <div className="inline-flex items-center gap-1.5 bg-[#FEF08A] border-2 border-stone-900 px-3.5 py-1 rounded-full text-xs font-black uppercase mb-4">
            <Star className="w-3.5 h-3.5 fill-stone-900" /> First 1,000 Units Rollout
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-950 tracking-tight mb-3">
            Where children don’t just consume stories. They create their own worlds.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-medium max-w-xl mx-auto mb-8">
            Reserve priority access for our upcoming batch of 1,000 units for early families and partner schools.
          </p>

          {/* Role Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {[
              { id: 'parent', label: '👨‍👩‍👧 Parent / Family' },
              { id: 'school', label: '🏫 School / Educator' },
              { id: 'investor', label: '💼 Investor / Partner' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRole(tab.id as 'parent' | 'school' | 'investor')}
                className={`px-4 py-2 rounded-xl text-xs font-black border-2 border-stone-900 transition ${
                  role === tab.id
                    ? 'bg-stone-900 text-white shadow-[2px_2px_0px_0px_#FF7A59]'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Child Age Bracket Selector (if Parent or School) */}
          {role !== 'investor' && (
            <div className="flex items-center justify-center gap-2 mb-6 text-xs font-bold">
              <span className="text-stone-500">Child Age Group:</span>
              {(['3-5', '6-8', '9-12'] as const).map((age) => (
                <button
                  key={age}
                  type="button"
                  onClick={() => setAgeGroup(age)}
                  className={`px-3 py-1 rounded-lg border border-stone-900 ${
                    ageGroup === age ? 'bg-[#BFDBFE] text-stone-950 font-black' : 'bg-white text-stone-600'
                  }`}
                >
                  {age} yrs
                </button>
              ))}
            </div>
          )}

          {status === 'success' ? (
            <div className="max-w-md mx-auto bg-[#BBF7D0] border-2 border-stone-900 rounded-2xl p-4 font-bold text-sm text-stone-900">
              🎉 Thank you! Your priority spot as a {role} is locked in.
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`Enter your ${role} email address...`}
                className="flex-1 px-4 py-3.5 rounded-xl bg-stone-50 border-2 border-stone-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF7A59]"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-[#FF7A59] hover:bg-[#ff6842] text-stone-950 font-black px-6 py-3.5 rounded-xl text-sm border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1c1917] transition"
              >
                {status === 'loading' ? 'Saving...' : 'Join Waitlist'}
              </button>
            </form>
          )}

          {role === 'investor' && (
            <div className="mt-6 pt-5 border-t border-stone-200 text-xs font-semibold text-stone-600">
              Raising Pre-Seed to finalise hardware/software stack, train proprietary models, and manufacture the first 1,000 units. Direct Data Room access:{' '}
              <a href="mailto:investors@wonderboxai.com" className="text-stone-950 font-black underline">
                investors@wonderboxai.com
              </a>
            </div>
          )}
        </div>
      </section>

      {/* --- FOUNDER & CORPORATE FOOTER --- */}
      <footer className="bg-stone-950 text-stone-300 border-t-2 border-stone-900 py-14">
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
                Founded by <strong className="text-white">Karthik S Goudar</strong> (M.Sc. Theoretical Physics, B.Sc. Electronics & Physics; former EdTech AI Developer & screen-free children’s products founder). Building the platform where children’s imagination comes to life.
              </p>
            </div>

            <div className="flex flex-wrap md:justify-end gap-5 text-xs font-bold">
              <a href="mailto:karthik@wonderboxai.com" className="hover:text-[#FACC15] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> karthik@wonderboxai.com
              </a>
              <a href="mailto:contact@wonderboxai.com" className="hover:text-[#FACC15] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> contact@wonderboxai.com
              </a>
              <a href="mailto:investors@wonderboxai.com" className="hover:text-[#FACC15] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> investors@wonderboxai.com
              </a>
              <a href="/connect" className="text-[#FACC15] underline">
                Digital Visiting Card (/connect)
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4">
            <p>
              © 2026 <strong className="text-stone-300">Mindfield Private Limited</strong>. WonderBox™ is developed, owned, and operated by Mindfield Private Limited. All rights reserved.
            </p>
            <p className="font-mono text-[11px]">Shivamogga • Bengaluru, Karnataka, India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
