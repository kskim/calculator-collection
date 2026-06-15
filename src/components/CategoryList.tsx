/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import * as Icons from 'lucide-react';
import { CATEGORIES, CategoryInfo } from '../data/calculators';
import { CalculatorCategory } from '../types';

interface CategoryListProps {
  onSelectCategory: (category: CalculatorCategory | null) => void;
  selectedCategory: CalculatorCategory | null;
}

// Map key string to a Lucide icon component dynamically
export function renderLucideIcon(iconName: string, size = 24, className = "") {
  // @ts-ignore
  const IconComponent = Icons[iconName] || Icons.HelpCircle;
  return <IconComponent size={size} className={className} />;
}

export default function CategoryList({ onSelectCategory, selectedCategory }: CategoryListProps) {
  return (
    <div id="category-scroller-layout" className="w-full">
      <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-black">
        <h3 className="text-xs font-bold text-black tracking-[0.2em] uppercase flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-orange-600"></span>
          카테고리별 계산기 탐색
        </h3>
        {selectedCategory && (
          <button
            id="clear-category-filter"
            onClick={() => onSelectCategory(null)}
            className="text-[10px] font-bold uppercase tracking-wider text-orange-650 hover:underline transition-all cursor-pointer"
          >
            전체 보기 [필터 해제]
          </button>
        )}
      </div>

      <div id="category-cards-grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-black border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {CATEGORIES.map((cat, index) => {
          const isSelected = selectedCategory === cat.id;
          const numStr = String(index + 1).padStart(2, '0');
          return (
            <button
              id={`category-card-${cat.id}`}
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.id)}
              className={`flex flex-col items-start p-5 text-left transition-colors duration-150 relative outline-none cursor-pointer rounded-none ${
                isSelected
                  ? 'bg-black text-white'
                  : 'bg-white hover:bg-orange-600 hover:text-white text-black'
              }`}
            >
              <div className="w-full flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono tracking-widest font-bold opacity-60">
                  {numStr}
                </span>
                <div className={`p-1 ${isSelected ? 'text-orange-500' : 'text-black group-hover:text-white'}`}>
                  {renderLucideIcon(cat.icon, 18, "stroke-[2.5]")}
                </div>
              </div>
              <h4 className="text-sm font-bold tracking-tight mb-1 uppercase">{cat.name}</h4>
              <p className={`text-[9px] font-mono uppercase tracking-wider ${isSelected ? 'text-orange-400' : 'text-black/50 hover:text-white'}`}>
                {cat.count}+개 계산기 제공
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
