/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight, TrendingUp, Sparkles, Home, DollarSign, Activity, Percent } from 'lucide-react';
import { CalculatorSchema } from '../types';
import { renderLucideIcon } from './CategoryList';
import { CATEGORIES } from '../data/calculators';

interface CalculatorCardProps {
  calculator: CalculatorSchema;
  onSelect: () => void;
  key?: any;
}

export default function CalculatorCard({ calculator, onSelect }: CalculatorCardProps) {
  // Get icon for the calculator's category
  const categoryInfo = CATEGORIES.find(c => c.id === calculator.category);
  const iconName = categoryInfo ? categoryInfo.icon : 'HelpCircle';

  return (
    <div
      id={`calculator-card-${calculator.slug}`}
      onClick={onSelect}
      className="bg-white border-2 border-black p-6 rounded-none cursor-pointer hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex flex-col justify-between group outline-none h-full relative"
    >
      <div>
        {/* Badges / Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-black text-white group-hover:bg-orange-600 rounded-none transition-colors border border-black">
            {renderLucideIcon(iconName, 16, "stroke-[2.5]")}
          </div>
          
          <div className="flex gap-1.5">
            {calculator.popular && (
              <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-amber-500 text-black px-2 py-0.5 border border-black uppercase tracking-wider">
                <Sparkles size={8} className="fill-black" />
                인기
              </span>
            )}
            {calculator.trending && (
              <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-orange-600 text-white px-2 py-0.5 border border-black uppercase tracking-wider">
                <TrendingUp size={8} />
                추천
              </span>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <h4 className="text-base font-bold text-black group-hover:text-orange-650 transition-colors uppercase tracking-tight line-clamp-1">
          {calculator.title}
        </h4>
        <p className="text-xs text-black/70 font-sans mt-2 leading-relaxed line-clamp-2">
          {calculator.description}
        </p>
      </div>

      {/* Footer Meta */}
      <div className="mt-5 pt-3 border-t border-black/10 flex items-center justify-between text-xs text-black/40">
        <span className="capitalize font-mono font-bold text-orange-600 text-[10px]">
          {categoryInfo ? categoryInfo.name : calculator.category}
        </span>
        <span className="font-bold text-black group-hover:text-orange-655 uppercase tracking-wide text-[10px] transition-colors flex items-center gap-1">
          시작하기
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2]" />
        </span>
      </div>
    </div>
  );
}
