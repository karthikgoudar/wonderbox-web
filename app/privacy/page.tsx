import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Baby,
  Trash2,
  FileText,
  Mail,
  Phone,
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Children’s Data Protection',
  description:
    'How WonderBox and Mindfield Private Limited protect children’s privacy. Real-time voice processing, zero ads, zero data selling, and DPDP / COPPA compliance.',
};

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-4 h-4 text-emerald-800" /> Child Privacy First
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 leading-tight">
            Privacy Policy & Children’s Safety
          </h1>
          
          <p className="text-stone-600 text-sm sm:text-base font-semibold">
            Last updated: October 2026 • Mindfield Private Limited (Shimoga, Karnataka, India)
          </p>
        </div>

        {/* Core Principles Highlights */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-[#FEF08A] border-3 border-stone-900 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1c1917] space-y-2">
            <div className="w-9 h-9 rounded-xl bg-white border-2 border-stone-900 flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-stone-950" />
            </div>
            <h3 className="font-black text-base text-stone-950">Zero Advertisements</h3>
            <p className="text-xs font-bold text-stone-800 leading-relaxed">
              We never show ads, sell user behavior, or profile children for third-party monetization.
            </p>
          </div>

          <div className="bg-[#BFDBFE] border-3 border-stone-900 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1c1917] space-y-2">
            <div className="w-9 h-9 rounded-xl bg-white border-2 border-stone-900 flex items-center justify-center">
              <Lock className="w-5 h-5 text-stone-950" />
            </div>
            <h3 className="font-black text-base text-stone-950">Real-Time Voice Deletion</h3>
            <p className="text-xs font-bold text-stone-800 leading-relaxed">
              Voice prompts are processed ephemerally into stories and discarded. No raw audio is retained.
            </p>
          </div>

          <div className="bg-[#BBF7D0] border-3 border-stone-900 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1c1917] space-y-2">
            <div className="w-9 h-9 rounded-xl bg-white border-2 border-stone-900 flex items-center justify-center">
              <Baby className="w-5 h-5 text-stone-950" />
            </div>
            <h3 className="font-black text-base text-stone-950">Parent-Controlled</h3>
            <p className="text-xs font-bold text-stone-800 leading-relaxed">
              Parents have total visibility through the companion app with one-click data purge controls.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 bg-white border-3 border-stone-900 rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_0px_#1c1917] leading-relaxed text-sm sm:text-base text-stone-800">
          
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-stone-950 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#FF7A59]" /> 1. Overview & Commitment
            </h2>
            <p>
              Mindfield Private Limited (“we”, “our”, or “Company”), headquartered in Shimoga, Karnataka, India, operates the WonderBox product and website (<a href="https://wonderboxai.com" className="font-bold underline text-stone-950">wonderboxai.com</a>). WonderBox is an AI-powered, screen-free physical storytelling device designed for children aged 3 to 12 under parental supervision.
            </p>
            <p>
              We adhere strictly to the <strong>Digital Personal Data Protection (DPDP) Act, 2023 of India</strong>, the <strong>Children’s Online Privacy Protection Act (COPPA)</strong>, and global best practices for minors’ safety.
            </p>
          </section>

          <hr className="border-stone-200" />

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-stone-950 flex items-center gap-2">
              <Baby className="w-5 h-5 text-[#FF7A59]" /> 2. Information We Collect
            </h2>
            <ul className="space-y-2 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Parent Contact Information:</strong> Name, email address, phone number, and delivery city submitted voluntarily when reserving a waitlist spot or setting up the parent companion app.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Ephemeral Voice Prompts:</strong> When a child speaks into WonderBox, audio snippets are converted in real time into text to generate the customized adventure and sticker outline. Raw voice audio is not archived.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Usage Telemetry:</strong> Device hardware health, battery level, sticker roll counters, and story category counts stored securely to manage parent print allowances.
                </span>
              </li>
            </ul>
          </section>

          <hr className="border-stone-200" />

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-stone-950 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#FF7A59]" /> 3. How Voice Audio & AI Processing Works
            </h2>
            <p>
              WonderBox’s multilingual voice models support English, Hindi (Hinglish), and Kannada (Kanglish). Audio captured by the onboard microphone is encrypted in transit via TLS 1.3 to our secure inference infrastructure.
            </p>
            <div className="bg-stone-50 border-2 border-stone-900 rounded-2xl p-4 font-bold text-xs sm:text-sm text-stone-900 space-y-1">
              <p>• Audio packets are streamed solely to complete the prompt.</p>
              <p>• Once speech-to-text decoding is complete, raw audio buffers are immediately flushed from memory.</p>
              <p>• We do not train foundation models on identifiable child voice recordings.</p>
            </div>
          </section>

          <hr className="border-stone-200" />

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-stone-950 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-[#FF7A59]" /> 4. Parental Rights & Data Deletion
            </h2>
            <p>
              Under both the DPDP Act and COPPA, parents have absolute control over their child’s play history. Through the Companion Mobile App or by emailing us directly, parents may:
            </p>
            <ul className="list-disc pl-6 space-y-1 font-medium">
              <li>Review the titles and themes of stories generated by the child.</li>
              <li>Purge story history and sticker records with a single tap.</li>
              <li>Revoke consent and delete the parent account and linked device identifiers entirely.</li>
            </ul>
          </section>

          <hr className="border-stone-200" />

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-stone-950 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#FF7A59]" /> 5. Grievance Officer & Contact Information
            </h2>
            <p>
              In compliance with the Indian Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, the designated Grievance & Data Protection Officer is:
            </p>
            <div className="bg-[#FEF08A] border-2 border-stone-900 rounded-2xl p-5 text-stone-950 space-y-1.5 font-bold text-sm">
              <p className="text-base font-black">Karthik S Goudar</p>
              <p>Mindfield Private Limited</p>
              <p>Shimoga, Karnataka, India</p>
              <p className="flex items-center gap-1.5 pt-1">
                <Mail className="w-4 h-4" /> Privacy Email:{' '}
                <a href="mailto:privacy@wonderboxai.com" className="underline">
                  privacy@wonderboxai.com
                </a>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" /> General Inquiries:{' '}
                <a href="mailto:contact@wonderboxai.com" className="underline">
                  contact@wonderboxai.com
                </a>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-4 h-4" /> Direct Phone:{' '}
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
