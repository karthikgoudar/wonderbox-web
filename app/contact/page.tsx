import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  Clock,
  ArrowLeft,
  Sparkles,
  User,
  ShieldCheck
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us & Corporate Details',
  description:
    'Official contact details for Mindfield Private Limited and WonderBox in Shimoga, Karnataka, India. Support, privacy inquiries, and partnerships.',
};

export default function ContactPage() {
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
            <Building2 className="w-4 h-4 text-stone-950" /> Corporate Headquarters
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 leading-tight">
            Get in Touch with Mindfield
          </h1>
          
          <p className="text-stone-600 text-sm sm:text-base font-semibold">
            We are building the future of screen-free childhood imagination from Karnataka, India.
          </p>
        </div>

        {/* Corporate Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          
          {/* Registered Office Card */}
          <div className="bg-white border-3 border-stone-900 rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#1c1917] space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-[#FEF08A] border-2 border-stone-900 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-stone-950" />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-wider text-stone-500">
                Operating Entity
              </span>
              <h2 className="text-xl font-black text-stone-950 mt-1">
                Mindfield Private Limited
              </h2>
              <p className="text-stone-700 text-sm font-semibold mt-2 leading-relaxed">
                Registered Office: Shimoga, Karnataka, India
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-stone-200 text-sm font-bold text-stone-800">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <a href="tel:+919886965964" className="hover:text-[#FF7A59] transition">
                  +91 9886 965 964 (Direct & WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-stone-500 shrink-0" />
                <span>Monday – Friday: 10:00 AM – 6:00 PM IST</span>
              </div>

              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-stone-500 shrink-0" />
                <span>Founder: Karthik S Goudar</span>
              </div>
            </div>
          </div>

          {/* Departmental Emails Card */}
          <div className="bg-[#BFDBFE] border-3 border-stone-900 rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#1c1917] space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-stone-900 flex items-center justify-center">
              <Mail className="w-6 h-6 text-stone-950" />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-wider text-stone-700">
                Direct Communications
              </span>
              <h2 className="text-xl font-black text-stone-950 mt-1">
                Departmental Contacts
              </h2>
            </div>

            <div className="space-y-3 pt-2 text-xs sm:text-sm font-bold text-stone-900">
              <div className="p-3 bg-white/80 rounded-2xl border border-stone-900">
                <span className="block text-[11px] uppercase tracking-wide text-stone-500 font-black">
                  General & Customer Support
                </span>
                <a href="mailto:contact@wonderboxai.com" className="underline hover:text-[#FF7A59]">
                  contact@wonderboxai.com
                </a>
              </div>

              <div className="p-3 bg-white/80 rounded-2xl border border-stone-900">
                <span className="block text-[11px] uppercase tracking-wide text-stone-500 font-black">
                  Data Privacy & Grievances (DPDP / COPPA)
                </span>
                <a href="mailto:privacy@wonderboxai.com" className="underline hover:text-[#FF7A59]">
                  privacy@wonderboxai.com
                </a>
              </div>

              <div className="p-3 bg-white/80 rounded-2xl border border-stone-900">
                <span className="block text-[11px] uppercase tracking-wide text-stone-500 font-black">
                  Founder & CEO Direct
                </span>
                <a href="mailto:karthik@wonderboxai.com" className="underline hover:text-[#FF7A59]">
                  karthik@wonderboxai.com
                </a>
              </div>

              <div className="p-3 bg-white/80 rounded-2xl border border-stone-900">
                <span className="block text-[11px] uppercase tracking-wide text-stone-500 font-black">
                  Pre-Seed & Investor Relations
                </span>
                <a href="mailto:investors@wonderboxai.com" className="underline hover:text-[#FF7A59]">
                  investors@wonderboxai.com
                </a>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
