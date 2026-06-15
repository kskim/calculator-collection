/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, HelpCircle, ChevronRight, ChevronDown, CheckCircle2, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface CalculatorSEOInfoProps {
  guide: string;
  formula?: string;
  tips: string[];
  faqs: FAQItem[];
}

export default function CalculatorSEOInfo({ guide, formula, tips, faqs }: CalculatorSEOInfoProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div id="calculator-explanation-container" className="mt-12 border-t-2 border-black pt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Editorial Documentation Guide */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-sm font-black text-black uppercase tracking-wider flex items-center gap-2 mb-4">
            <BookOpen size={18} className="text-orange-600 stroke-[2.5]" />
            상세 이용 가이드 및 기본 개념
          </h3>
          <p className="text-sm text-black/80 font-serif leading-relaxed">
            {guide}
          </p>

          {formula && (
            <div className="mt-5 p-4 bg-[#F9F9F8] border-2 border-black border-dashed">
              <span className="text-[10px] font-black text-black uppercase tracking-[0.2em] block mb-2">
                학술 및 수학적 계산 공식
              </span>
              <code className="text-xs font-mono font-bold text-orange-650 bg-black text-white px-3 py-2.5 block overflow-x-auto whitespace-pre-wrap leading-normal border border-black">
                {formula}
              </code>
            </div>
          )}
        </div>

        {/* Collapsible Frequently Asked Questions */}
        {faqs && faqs.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xs font-black text-black uppercase tracking-widest flex items-center gap-2 mb-3">
              <HelpCircle size={18} className="text-orange-600 stroke-[2.5]" />
              자주 묻는 질문 (FAQ)
            </h3>
            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-all"
                  >
                    <button
                      id={`faq-btn-${idx}`}
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between font-bold text-black hover:bg-orange-600 hover:text-white transition-colors focus:outline-none"
                    >
                      <span className="text-xs uppercase tracking-tight">{faq.question}</span>
                      {isOpen ? (
                        <ChevronDown size={18} className="text-orange-600 group-hover:text-white stroke-[2.5]" />
                      ) : (
                        <ChevronRight size={18} className="text-black/55 stroke-[2.5]" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs font-serif text-black/85 border-t border-black pt-3 leading-relaxed bg-[#F9F9F8]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Pro Tips Side Card */}
      <div className="space-y-4">
        <div className="bg-[#F9F9F8] text-black p-6 rounded-none border-2 border-black shadow-[4px_4px_0px_0px_#EA580C]">
          <h4 className="text-[11px] font-black tracking-[0.2em] uppercase text-black flex items-center gap-2 mb-4 border-b border-black pb-2">
            <Sparkles size={14} className="text-orange-600 fill-orange-600" />
            핵심 요약 및 가이드라인
          </h4>
          <ul className="space-y-4">
            {tips.map((tip, idx) => (
              <li key={idx} className="flex gap-2.5">
                <CheckCircle2 size={16} className="text-orange-600 shrink-0 mt-0.5" />
                <span className="text-xs text-black/80 font-serif leading-relaxed">
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}
