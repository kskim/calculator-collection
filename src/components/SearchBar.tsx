/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Sparkles, X } from 'lucide-react';
import { searchCalculators } from '../data/calculators';
import { CalculatorCategory } from '../types';

interface SearchBarProps {
  onSelectCalculator: (slug: string) => void;
  placeholderText?: string;
  initialQuery?: string;
}

export default function SearchBar({ onSelectCalculator, placeholderText = "예: '주담대', '실수령액', '은퇴', '체질량(BMI)', '전역일'...", initialQuery = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const matched = searchCalculators(query);
    setResults(matched);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (barRef.current && !barRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  const handleSelect = (slug: string) => {
    onSelectCalculator(slug);
    setIsOpen(false);
    setQuery('');
  };

  // Common quick shortcuts for discoverability
  const suggestions = [
    { label: '주택담보대출 계산기', slug: 'mortgage-calculator' },
    { label: '은퇴 / 파이어족 계산기', slug: 'retirement-planner' },
    { label: '실수령액 계산기', slug: 'net-salary-calculator' },
    { label: '체질량지수 (BMI) 계산기', slug: 'bmi-calculator' },
    { label: '전역일 / 디데이 계산기', slug: 'military-discharge-calculator' },
    { label: '시급 연봉 환산 계산기', slug: 'hourly-to-salary-calculator' }
  ];

  return (
    <div id="calculator-search-wrapper" ref={barRef} className="relative w-full max-w-2xl mx-auto z-45">
      <div id="search-input-box" className="relative flex items-center bg-white border-2 border-black rounded-none w-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
        <div className="pl-4 text-black">
          <Search size={22} className="stroke-[2.5]" />
        </div>
        <input
          id="calculator-main-input"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholderText}
          className="flex-1 py-4 px-3 text-black text-lg placeholder-black/40 focus:outline-none bg-transparent font-sans"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 shrink-0 pointer-events-none">
          <span className="text-[10px] border border-black/40 px-1.5 py-0.5 font-mono opacity-60">SRCH</span>
        </div>
        {query && (
          <button
            id="search-clear-button"
            onClick={handleClear}
            className="p-1 mr-14 text-black hover:bg-black hover:text-white rounded-none border border-black transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Suggestion list */}
      {isOpen && (
        <div id="search-autocomplete-drawer" className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none overflow-hidden z-50">
          {query.trim().length > 0 ? (
            <div className="py-0">
              <div className="px-4 py-2 text-xs font-bold text-black tracking-wider uppercase bg-orange-600/10 border-b border-black flex justify-between">
                <span>일치하는 계산기 검색 결과</span>
                <span className="font-mono text-[9px] text-orange-600">{results.length}개 발견</span>
              </div>
              {results.length > 0 ? (
                <div className="divide-y divide-black/10">
                  {results.map((item, idx) => (
                    <button
                      id={`search-item-${idx}`}
                      key={idx}
                      onClick={() => handleSelect(item.slug)}
                      className="w-full text-left px-5 py-3.5 hover:bg-black hover:text-white transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-bold text-sm tracking-tight flex items-center gap-1.5 text-inherit">
                          {item.title}
                          {item.matchesIcon === 'rich' && (
                            <span className="inline-flex items-center text-[9px] font-bold bg-orange-600 text-white px-1.5 py-0.5 border border-black">
                              정밀 엔진
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-black/60 group-hover:text-white/80 font-sans mt-0.5">
                          분류: <span className="capitalize font-bold text-orange-600 group-hover:text-amber-300">{item.category}</span> • {item.description}
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-black group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-5 py-8 text-center text-black font-sans">
                  <span className="font-bold font-mono">"{query}"</span>에 일치하는 계산기가 없습니다.
                  <p className="text-xs text-black/60 mt-2">일반적인 검색어 예시: <span className="italic font-bold text-orange-600">복리</span>, <span className="italic font-bold text-orange-600">대출</span>, <span className="italic font-bold text-orange-600">BMI</span>, <span className="italic font-bold text-orange-600">급여</span> 등</p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-0">
              <div className="px-4 py-2 text-xs font-bold text-black tracking-wider uppercase bg-black text-white flex items-center gap-1.5">
                <Sparkles size={12} className="text-orange-500 fill-orange-500" />
                자주 찾는 추천 계산기
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10">
                {suggestions.map((item, idx) => (
                  <button
                    id={`popular-suggest-${idx}`}
                    key={idx}
                    onClick={() => handleSelect(item.slug)}
                    className="text-left px-4 py-3 bg-white hover:bg-black hover:text-white text-xs font-bold uppercase tracking-wider text-black transition-all flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-orange-600 font-mono">시작하기 →</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
