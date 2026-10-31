import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  Volume2,
  Printer,
  Sparkles,
  Sliders,
  BatteryCharging,
  ArrowLeft,
  CheckCircle2,
  Heart
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hardware Safety & AI Content Guardrails',
  description:
    'Comprehensive safety standards for WonderBox: BPA-free thermal paper, 85 dB acoustic limits, kid-safe AI prompt filters, and zero screens.',
};

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF8] text-stone-900 font-sans selection:bg-[#FF7A59] selection:text-white pb-20">
      
      {/* Top Header */}
      <header className="border-b-3 border-stone-900 bg-white sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-black text-stone-900 hover:text-[#FF7A59] transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to WonderBox
          </Link>

          <Link
            href="/#waitlist-top"
            className="bg-[#FF7A59] hover:bg-[#ff6842] text-stone-950 font-black px-4 py-2 rounded-xl text-xs border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] transition active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            Join Early Batch
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-12">
        
        {/* Title Header */}
        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 bg-[#BBF7D0] border-2 border-stone-900 px-3.5 py-1 rounded-full text-xs font-black uppercase text-stone-950 shadow-[2px_2px_0px_0px_#1c1917]">
            <ShieldCheck className="w-4 h-4 text-emerald-800" /> Child Safety Standards
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 leading-tight">
            Built Safe. From Circuit to Story.
          </h1>
          
          <p className="text-stone-600 text-sm sm:text-base font-semibold">
            How WonderBox by Mindfield Private Limited protects growing minds, ears, and hands.
          </p>
        </div>

        {/* 4 Pillars of WonderBox Safety */}
        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          
          {/* Pillar 1: Thermal Paper Safety */}
          <div className="bg-[#FEF08A] border-3 border-stone-900 rounded-3xl p-6 shadow-[6px_6px_0px_0px_#1c1917] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-white border-2 border-stone-900 flex items-center justify-center">
              <Printer className="w-5 h-5 text-stone-950" />
            </div>
            <h3 className="text-lg font-black text-stone-950">100% BPA & BPS-Free Paper</h3>
            <p className="text-xs sm:text-sm font-bold text-stone-800 leading-relaxed">
              Thermal printing works purely through targeted heat. There are zero wet chemical inks, zero carbon toner powders, and zero bisphenols (BPA/BPS). Completely non-toxic for everyday toddler handling.
            </p>
          </div>

          {/* Pillar 2: Acoustic Safety */}
          <div className="bg-[#BFDBFE] border-3 border-stone-900 rounded-3xl p-6 shadow-[6px_6px_0px_0px_#1c1917] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-white border-2 border-stone-900 flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-stone-950" />
            </div>
            <h3 className="text-lg font-black text-stone-950">Strict 85 dB Hearing Cap</h3>
            <p className="text-xs sm:text-sm font-bold text-stone-800 leading-relaxed">
              In strict adherence to international toy acoustic standards (ASTM F963 and EN 71), WonderBox hardware has a hard decibel ceiling below 85 dB to safeguard delicate young ears.
            </p>
          </div>

          {/* Pillar 3: AI Prompt Guardrails */}
          <div className="bg-[#BBF7D0] border-3 border-stone-900 rounded-3xl p-6 shadow-[6px_6px_0px_0px_#1c1917] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-white border-2 border-stone-900 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-stone-950" />
            </div>
            <h3 className="text-lg font-black text-stone-950">Positive AI Guardrails</h3>
            <p className="text-xs sm:text-sm font-bold text-stone-800 leading-relaxed">
              Our trilingual language models (English, Hinglish, Kanglish) run through multi-layer semantic filters. Violence, scary monsters, mature language, and harmful content are blocked at the prompt level.
            </p>
          </div>

          {/* Pillar 4: Zero Blue Light */}
          <div className="bg-[#FFD1C1] border-3 border-stone-900 rounded-3xl p-6 shadow-[6px_6px_0px_0px_#1c1917] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-white border-2 border-stone-900 flex items-center justify-center">
              <Heart className="w-5 h-5 text-stone-950" />
            </div>
            <h3 className="text-lg font-black text-stone-950">Zero Glass. Zero Blue Light.</h3>
            <p className="text-xs sm:text-sm font-bold text-stone-800 leading-relaxed">
              Unlike tablets and mobile phones, WonderBox features zero displays. It protects children’s eyes from fatigue, eliminates doom-scrolling habits, and naturally promotes restful bedtime sleep.
            </p>
          </div>

        </div>

        {/* Parent Dashboard Detail Card */}
        <div className="bg-white border-3 border-stone-900 rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_0px_#1c1917] space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#FEF08A] border-2 border-stone-900 px-3.5 py-1 rounded-full text-xs font-black uppercase text-stone-950">
            <Sliders className="w-4 h-4 text-stone-950" /> Full Parent Oversight
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-stone-950">
            The Companion Mobile App Guardrails
          </h2>

          <div className="space-y-3 text-stone-800 font-medium text-sm sm:text-base">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-950 block">Sticker Budgeting</strong>
                Set daily print limits (e.g., 3–5 stickers per day) so kids learn patience and avoid paper overuse.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-950 block">Automatic Bedtime Sleep Mode</strong>
                Schedule quiet hours when WonderBox sleeps to ensure peaceful bedtime routines.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-950 block">Instant Audit Log & Purge</strong>
                See the adventure themes your child explored and delete historical logs with one click.
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-bold text-stone-600">
              Have specific questions about safety certifications? Reach our engineering team directly.
            </div>
            <a
              href="mailto:contact@wonderboxai.com?subject=Safety Inquiry"
              className="bg-stone-950 hover:bg-stone-800 text-white font-black px-4 py-2.5 rounded-xl text-xs transition whitespace-nowrap"
            >
              Email Safety Team →
            </a>
          </div>
        </div>

      </main>
    </div>
  );
}
