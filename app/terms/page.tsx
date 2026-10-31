import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  FileCheck,
  Scale,
  Sparkles,
  AlertTriangle,
  ArrowLeft,
  Mail,
  Phone,
  CheckCircle2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service & Reservation Policy',
  description:
    'Terms and conditions for WonderBox waitlist reservations, early batch allocation, and hardware usage. Operated by Mindfield Private Limited.',
};

export default function TermsPage() {
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
          <div className="inline-flex items-center gap-2 bg-[#FEF08A] border-2 border-stone-900 px-3.5 py-1 rounded-full text-xs font-black uppercase text-stone-950 shadow-[2px_2px_0px_0px_#1c1917]">
            <Scale className="w-4 h-4 text-stone-950" /> Legal Agreement
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 leading-tight">
            Terms of Service
          </h1>
          
          <p className="text-stone-600 text-sm sm:text-base font-semibold">
            Last updated: October 2026 • Mindfield Private Limited (Shimoga, Karnataka, India)
          </p>
        </div>

        {/* Detailed Terms Card */}
        <div className="space-y-8 bg-white border-3 border-stone-900 rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_0px_#1c1917] leading-relaxed text-sm sm:text-base text-stone-800">
          
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-stone-950 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#FF7A59]" /> 1. Acceptance of Terms
            </h2>
            <p>
              By accessing the website at <a href="https://wonderboxai.com" className="font-bold underline text-stone-950">wonderboxai.com</a>, reserving an early-batch unit, or interacting with WonderBox products, you agree to be bound by these Terms of Service issued by <strong>Mindfield Private Limited</strong>, an incorporated company registered in Shimoga, Karnataka, India.
            </p>
            <p>
              If you are registering on behalf of a child, you represent that you are the child’s legal parent or guardian and agree to supervise the device’s usage.
            </p>
          </section>

          <hr className="border-stone-200" />

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-stone-950 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF7A59]" /> 2. Early Batch Waitlist & Reservation Policy
            </h2>
            <div className="bg-[#FEF08A]/40 border-2 border-stone-900 rounded-2xl p-4 font-medium space-y-2 text-stone-900">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>100% Free with No Obligation:</strong> Reserving a spot in the First 1,000 Units Production Run requires zero financial payment or deposit today.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Priority Allocation:</strong> Reservation places your contact email in queue for locked early-bird pricing and priority dispatch notice prior to general public release.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Cancellation:</strong> You may remove your email from the waitlist at any time by contacting support with no penalty.
                </span>
              </p>
            </div>
          </section>

          <hr className="border-stone-200" />

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-stone-950 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#FF7A59]" /> 3. AI Content Disclaimer & Parental Supervision
            </h2>
            <p>
              WonderBox generates real-time audio adventures and printable outlines using generative artificial intelligence. While we implement multi-layer semantic guardrails designed specifically for children aged 3 to 12:
            </p>
            <ul className="list-disc pl-6 space-y-1 font-medium">
              <li>All stories are intended solely for creative, educational, and imaginative entertainment.</li>
              <li>Generated stories do not constitute factual advice, medical recommendations, or official educational curriculum.</li>
              <li>Parents are encouraged to review the companion mobile app history and guide their children during play.</li>
            </ul>
          </section>

          <hr className="border-stone-200" />

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-stone-950 flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#FF7A59]" /> 4. Intellectual Property
            </h2>
            <p>
              The names “WonderBox”, “Mindfield”, device form-factor designs, logos, website layout, sound marks, and proprietary code-mixing linguistic processing models are the exclusive intellectual property of <strong>Mindfield Private Limited</strong>. All rights reserved.
            </p>
          </section>

          <hr className="border-stone-200" />

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-stone-950 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#FF7A59]" /> 5. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any legal dispute or claim arising under these terms shall be subject to the exclusive jurisdiction of the courts located in <strong>Shimoga / Bengaluru, Karnataka, India</strong>.
            </p>
          </section>

          <hr className="border-stone-200" />

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-stone-950 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#FF7A59]" /> 6. Corporate Contact
            </h2>
            <div className="bg-[#BFDBFE]/40 border-2 border-stone-900 rounded-2xl p-5 text-stone-950 space-y-1.5 font-bold text-sm">
              <p className="text-base font-black">Mindfield Private Limited</p>
              <p>Registered Office: Shimoga, Karnataka, India</p>
              <p className="flex items-center gap-1.5 pt-1">
                <Mail className="w-4 h-4" /> Legal & Support Email:{' '}
                <a href="mailto:contact@wonderboxai.com" className="underline">
                  contact@wonderboxai.com
                </a>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-4 h-4" /> Phone:{' '}
                <a href="tel:+919886965964" className="underline">
                  +91 9886 965 964
                </a>
              </p>
            </div>
          </section>

        </div>

      </main>
    </div>
  );
}
