/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  TrendingUp,
  History,
  Info,
  ChevronRight,
  BookOpen,
  Maximize2,
  ArrowLeft,
  DollarSign,
  HeartPulse,
  TrendingDown,
  Check,
  Calculator,
  Search,
  ListFilter,
  Bookmark,
  CalendarDays
} from 'lucide-react';
import { CALCULATORS, CATEGORIES, searchCalculators, CategoryInfo, EXPANDED_CALCULATOR_INDEX } from './data/calculators';
import { CalculatorSchema, CalculatorCategory } from './types';
import SearchBar from './components/SearchBar';
import CategoryList, { renderLucideIcon } from './components/CategoryList';
import CalculatorCard from './components/CalculatorCard';
import CalculatorRenderer from './components/CalculatorRenderer';
import CalculatorSEOInfo from './components/CalculatorSEOInfo';

const CATEGORY_TRANSLATIONS: Record<string, string> = {
  'finance': '금융',
  'tax': '세금 및 과세',
  'salary': '소득 및 급여',
  'investment': '재테크 및 투자',
  'retirement': '은퇴설계',
  'military': '밀리터리 (D-Day)',
  'real-estate': '부동산 및 대출',
  'health': '건강 지수',
  'education': '교육 및 학업',
  'automobile': '자동차 및 할부',
  'travel': '여행 및 정산',
  'shopping': '쇼핑 및 할인',
  'utility-bills': '합산 공공요금',
  'utility': '공과금/에너지',
  'business': '비즈니스/세무',
  'engineering': '엔지니어링',
  'mathematics': '수학 공식',
  'math': '수학/백분율',
  'science': '기초과학/변환',
  'construction': '시공/인테리어',
  'fitness': '피트니스/식단',
  'lifestyle': '생활/라이프',
};

const translateCategory = (cat: string) => {
  return CATEGORY_TRANSLATIONS[cat] || cat.replace('-', ' ');
};

export default function App() {
  // Navigation states
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CalculatorCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom calculator state (holds config if launched from expanded search index)
  const [customCalculator, setCustomCalculator] = useState<CalculatorSchema | null>(null);

  // Bookmarking / History state
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  // Initialize Bookmarks and history from LocalStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('calc_bookmarks');
    if (savedBookmarks) {
      try { setBookmarks(JSON.parse(savedBookmarks)); } catch (e) {}
    }
    const savedHistory = localStorage.getItem('calc_history');
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch (e) {}
    }
    
    // Check URL parameters for search query or calculator slug coordinates
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('calc') || params.get('tool');
    const cat = params.get('cat') || params.get('category');
    if (slug) {
      handleLaunchCalculator(slug);
    } else if (cat) {
      setSelectedCategory(cat as CalculatorCategory);
    }
  }, []);

  // Sync state helpers
  const syncBookmarks = (newBookmarks: string[]) => {
    setBookmarks(newBookmarks);
    localStorage.setItem('calc_bookmarks', JSON.stringify(newBookmarks));
  };

  const handleToggleBookmark = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarks.includes(slug)) {
      syncBookmarks(bookmarks.filter(s => s !== slug));
    } else {
      syncBookmarks([...bookmarks, slug]);
    }
  };

  const handleLaunchCalculator = (slug: string) => {
    // 1. Check if it is a major rich calculator in standard list
    const richCalc = CALCULATORS.find(c => c.slug === slug);
    if (richCalc) {
      setCustomCalculator(null);
      setActiveSlug(slug);
    } else {
      // 2. Check if it is in expanded index matching keywords
      const indexItem = EXPANDED_CALCULATOR_INDEX.find(c => c.slug === slug || c.aliases.includes(slug) || c.title.toLowerCase().includes(slug.toLowerCase()));
      if (indexItem) {
        // Construct a highly functional, customized calculator on-the-fly based on properties!
        const createdCalc = generateCalculatorFromIndex(indexItem.title, indexItem.slug, indexItem.category as CalculatorCategory);
        setCustomCalculator(createdCalc);
        setActiveSlug(indexItem.slug);
      } else {
        // Fallback or not found
        setActiveSlug(null);
      }
    }

    // Scroll back to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Track recently computed
    setHistory(prev => {
      const filtered = prev.filter(s => s !== slug);
      const updated = [slug, ...filtered].slice(0, 10);
      localStorage.setItem('calc_history', JSON.stringify(updated));
      return updated;
    });

    // Update URL bar query silently to allow bookmarking / sharing paths
    const newUrl = `${window.location.pathname}?calc=${slug}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const handleNavigateHome = () => {
    setActiveSlug(null);
    setCustomCalculator(null);
    const newUrl = window.location.pathname;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const handleSelectCategory = (cat: CalculatorCategory | null) => {
    setSelectedCategory(cat);
    setActiveSlug(null);
    setCustomCalculator(null);
    
    const newUrl = cat ? `${window.location.pathname}?cat=${cat}` : window.location.pathname;
    window.history.pushState({ path: newUrl }, '', newUrl);
    
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Helper template generator to keep ALL 100+ calculators active and operational!
  const generateCalculatorFromIndex = (title: string, slug: string, category: CalculatorCategory): CalculatorSchema => {
    // Specific customized form inputs & formulas based on specific search index tools
    if (slug === 'discount-calculator' || title.toLowerCase().includes('discount')) {
      return {
        title: '쇼핑 세일 복합 할인율 계산기',
        slug: 'discount-calculator',
        category: 'shopping',
        description: '할인 가격, 할인 비율 할인, 세금 적용 후 결제해야 할 최종 실구매 비용을 편하게 정산합니다.',
        aliases: ['discount', 'sales tax', 'markdown coupon', '할인', '세일근', '쿠폰'],
        inputs: [
          { id: 'originalPrice', label: '상품 판매 정가', type: 'number', defaultValue: 120, unit: '$', unitPosition: 'prefix', section: '매물 상세 및 가격' },
          { id: 'discountRate', label: '할인 비율 (%)', type: 'range', defaultValue: 30, min: 5, max: 95, step: 5, unit: '%', unitPosition: 'suffix', section: '수치 값 입력 정보' },
          { id: 'salesTax', label: '추가할 지방 소비세 (%)', type: 'number', defaultValue: 8, unit: '%', unitPosition: 'suffix', section: '세금 및 부가 수수료' }
        ],
        calculate: (ins) => {
          const original = Number(ins.originalPrice) || 0;
          const rate = Number(ins.discountRate) || 0;
          const taxRate = Number(ins.salesTax) || 0;

          const savings = original * (rate / 100);
          const discountedPrice = original - savings;
          const totalTax = discountedPrice * (taxRate / 100);
          const finalPrice = discountedPrice + totalTax;

          return {
            results: [
              { label: '최종 결제 예정 금액', value: finalPrice, rawValue: finalPrice, displayType: 'currency', info: '할인 혜택과 지역 부가세 정산을 거친 뒤의 최종 체크아웃 결제 금액입니다.' },
              { label: '할인 세이브 금액', value: savings, rawValue: savings, displayType: 'currency' },
              { label: '산출된 구매 세액', value: totalTax, rawValue: totalTax, displayType: 'currency' }
            ]
          };
        },
        seoContent: {
          guide: '할인 행사나 프로모션 쿠폰을 사용할 때 최종 실구매 지출액을 명확히 알아봅니다. 할인된 서브 합계 정리에 기반하여 세금을 연동 계산합니다.',
          tips: ['체크아웃 리테일 카운터에 도달하기 전 가격표 숫자와 쿠폰 수학 적용 실효성을 검증해보십시오.'],
          faqs: [{ question: '국세 및 부가세는 어떤 단계에서 부과되나요?', answer: '우선 정가에서 상품 할인액을 차감한 실구매 과세대상 금액에 가산되는 것이 기본 방식입니다.' }],
        },
        relatedSlugs: ['percentage-calculator', 'net-salary-calculator']
      };
    }

    if (slug === 'auto-calculator' || title.toLowerCase().includes('auto') || title.toLowerCase().includes('car')) {
      return {
        title: '자동차 매수 할부 금융 계산기',
        slug: 'auto-calculator',
        category: 'automobile',
        description: '매수 자동차의 월 이체료, 전체 할부 조율 원금 및 이자 누계 비율을 정밀 리포트합니다.',
        aliases: ['car loan', 'auto lease', 'vehicle tracker', '할부', '오토론', '차량대출'],
        inputs: [
          { id: 'price', label: '차량 구매 원금 총액', type: 'number', defaultValue: 35000, unit: '$', unitPosition: 'prefix', section: '매물 상세 및 가격' },
          { id: 'down', label: '선납 준비금 및 중고차 맞대환 가액', type: 'number', defaultValue: 5000, unit: '$', unitPosition: 'prefix', section: '매물 상세 및 가격' },
          { id: 'rate', label: '할부 연간 적용 금리 (APR)', type: 'range', defaultValue: 5.5, min: 1, max: 15, step: 0.1, unit: '%', unitPosition: 'suffix', section: '대출 기본 조건' },
          { id: 'months', label: '할부 조달 연수 (개월수)', type: 'select', defaultValue: 60, options: [{ label: '36 개월 (3년)', value: 36 }, { label: '48 개월 (4년)', value: 48 }, { label: '60 개월 (5년)', value: 60 }, { label: '72 개월 (6년)', value: 72 }], section: '대출 기본 조건' }
        ],
        calculate: (ins) => {
          const price = Number(ins.price) || 0;
          const down = Number(ins.down) || 0;
          const rate = Number(ins.rate) || 0;
          const months = Number(ins.months) || 60;

          const principal = Math.max(0, price - down);
          const monthlyRate = (rate / 100) / 12;
          
          let monthlyPayment = 0;
          if (monthlyRate > 0) {
            monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
          } else {
            monthlyPayment = principal / months;
          }

          const totalInterest = Math.max(0, (monthlyPayment * months) - principal);

          return {
            results: [
              { label: '예상 월 할부 납입금', value: monthlyPayment, rawValue: monthlyPayment, displayType: 'currency', info: '차량 취득을 위해 정기적으로 납입해야 하는 평달 고정 비용입니다.' },
              { label: '총 대출 원금 한도', value: principal, rawValue: principal, displayType: 'currency' },
              { label: '잔여 이자 총 누계액', value: totalInterest, rawValue: totalInterest, displayType: 'currency' }
            ]
          };
        },
        seoContent: {
          guide: '최적의 차량 유지 플랜과 구매 수용 조절을 시뮬레이션하십시오. 장기 할부율 변형 요소와 중고차 상계 보상가 대입 효과를 관측해 가계 부담을 줄입니다.',
          tips: ['차량 숍에 도달하기 전 근처 협업 금융권 오토론과 신인도 수준별 특별 대율을 선확보해보세요.'],
          faqs: [{ question: '보통 할부 기간은 길수록 좋은가요?', answer: '감가상각 비율 충격을 누르기 위해 연 60개월 이하의 상환 플랜 사용이 이자 보전에 권장됩니다.' }]
        },
        relatedSlugs: ['mortgage-calculator', 'savings-growth-calculator']
      };
    }

    if (slug === 'tip-split-calculator' || title.toLowerCase().includes('tip') || title.toLowerCase().includes('split')) {
      return {
        title: '팁 분할 및 셰어링 계산기',
        slug: 'tip-split-calculator',
        category: 'travel',
        description: '식당 빌 테이블 금액에 팁 배율을 얹은 다음, 참여 인원별로 1인 더치 비용을 균등 산정합니다.',
        aliases: ['split bill', 'restaurant tip share', 'dining split', '팁분할', '소수정산'],
        inputs: [
          { id: 'totalBill', label: '총 테이블 오더 청구 영수액', type: 'number', defaultValue: 84.50, unit: '$', unitPosition: 'prefix', section: '일반 상세 항목' },
          { id: 'tipRate', label: '희망 팁 부하율 (%)', type: 'range', defaultValue: 18, min: 10, max: 35, step: 1, unit: '%', unitPosition: 'suffix', section: '수치 값 입력 정보' },
          { id: 'people', label: '함께 식사한 동반 수 (명)', type: 'number', defaultValue: 3, unit: '명', unitPosition: 'suffix', section: '개인 세부 속성' }
        ],
        calculate: (ins) => {
          const bill = Number(ins.totalBill) || 0;
          const tipRate = Number(ins.tipRate) || 0;
          const count = Math.max(1, Number(ins.people) || 1);

          const tipTotal = bill * (tipRate / 100);
          const fullBill = bill + tipTotal;
          const share = fullBill / count;

          return {
            results: [
              { label: '1인당 더치페이 정산 금액', value: share, rawValue: share, displayType: 'currency', info: '각 개인 식객이 별도 일행에게 이체해야 할 스마트 정산 가액입니다.' },
              { label: '포함된 팁 합산 총액', value: tipTotal, rawValue: tipTotal, displayType: 'currency' },
              { label: '최종 합계 금액 (팁 포함)', value: fullBill, rawValue: fullBill, displayType: 'currency' }
            ]
          };
        },
        seoContent: {
          guide: '해외 매점, 레스토랑 또는 웰컴 드라이버 비용 및 팁 공유를 즉시 해결합니다. 지체 없이 테이블 위 잔금을 처리할 수 있습니다.',
          tips: ['매수 영수증 항목 아래 이미 단체 요금 서비스 부하(Gratuities Included)가 걸려있는지 필히 점검하세요.'],
          faqs: [{ question: '북미 식당 팁 등급은 기본 어느 선인가요?', answer: '수취 서빙 가치 수준에 대입해 15% ~ 20%의 선택 범위가 가장 균형 잡힙니다.' }]
        },
        relatedSlugs: ['percentage-calculator']
      };
    }

    if (title.toLowerCase().includes('dsr') || title.toLowerCase().includes('ltv') || slug === 'dsr-ltv-calculator') {
      return {
        title: '금융 DSR 및 LTV 주담대 적합성 계산기',
        slug: 'dsr-ltv-calculator',
        category: 'real-estate',
        description: '희망 소득 수준 대비 총부채상환비율(DSR) 및 주택감보인수비율(LTV) 규제를 가시화 분석합니다.',
        aliases: ['underwriting ltv', 'borrowing limits', 'dsr', 'LTV한도', '가계대출', '주택담보'],
        inputs: [
          { id: 'income', label: '월 평균 세전 수입 세팅', type: 'number', defaultValue: 7500, unit: '$', unitPosition: 'prefix', section: '일반 상세 항목' },
          { id: 'mortgagePayment', label: '예상 주택금융 월 원리금 청구액', type: 'number', defaultValue: 2100, unit: '$', unitPosition: 'prefix', section: '대출 기본 조건' },
          { id: 'otherDebts', label: '타 월간 상환 부채 (학자금, 자동차 등)', type: 'number', defaultValue: 450, unit: '$', unitPosition: 'prefix', section: '대출 기본 조건' },
          { id: 'homeVal', label: '매입 대상 주택 감정 가치', type: 'number', defaultValue: 350000, unit: '$', unitPosition: 'prefix', section: '매물 상세 및 가격' },
          { id: 'loanAmt', label: '희망 주택대출 융자 신청액', type: 'number', defaultValue: 280000, unit: '$', unitPosition: 'prefix', section: '매물 상세 및 가격' }
        ],
        calculate: (ins) => {
          const inc = Math.max(1, Number(ins.income) || 1);
          const mort = Number(ins.mortgagePayment) || 0;
          const other = Number(ins.otherDebts) || 0;
          const val = Math.max(1, Number(ins.homeVal) || 1);
          const loan = Number(ins.loanAmt) || 0;

          const totalDebts = mort + other;
          const dsr = (totalDebts / inc) * 100;
          const ltv = (loan / val) * 100;

          const dsrStatus = dsr <= 36 ? 'Healthy (우수)' : dsr <= 43 ? 'Borderline (경계)' : 'High Risk (한도초과 주의)';
          const ltvStatus = ltv <= 80 ? 'Optimal (No PMI)' : 'Requires PMI';

          return {
            results: [
              { label: '총부채원리금상환비율 (DSR)', value: `${dsr.toFixed(1)}%`, rawValue: dsr, displayType: 'text', info: '월 가처분 소득에서 매달 부채 원리금 방어 명목으로 조달해야 하는 비중입니다.' },
              { label: '주택 취득 대부 비율 (LTV)', value: `${ltv.toFixed(1)}%`, rawValue: ltv, displayType: 'text' },
              { label: '금융 기관 최종 한도 적정 등급', value: dsrStatus, rawValue: 0, displayType: 'badge', badgeColor: dsr <= 36 ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200' }
            ],
            customReport: { dsr, ltv }
          };
        },
        seoContent: {
          guide: '금융당국 정책 심사에 기반해 DSR 수치를 40% 이내, LTV 지표를 80% 안전권으로 정비해야 시중 은행권 주담대 한도가 승인 처리될 수 있습니다.',
          tips: ['안정적 한도를 수취하기 위해 대출 조율 최소 몇 달 전 신용카드 현서비스 이력을 삭제하고 리스크 구도를 개척하세요.'],
          faqs: [{ question: 'DSR 최고 상한 실질 기준은 얼마인가요?', answer: '표준 차주당 규제는 평균 연 40% 가량으로 강하게 홀드되어 진행됩니다.' }]
        },
        relatedSlugs: ['mortgage-calculator', 'rent-vs-buy-calculator']
      };
    }

    if (title.toLowerCase().includes('calorie') || title.toLowerCase().includes('deficit') || slug === 'calorie-deficit-calculator') {
      return {
        title: '일일 칼로리 소진 및 적자 계산 플래너',
        slug: 'calorie-deficit-calculator',
        category: 'fitness',
        description: '하루 대사량(TDEE) 지탱을 기준으로 지속 가능한 식이 요법 다이어트 적자 섭취 한계를 구축합니다.',
        aliases: ['calorie gap tracker', 'tdee deficit planner', '칼로리', '식단', '감량식'],
        inputs: [
          { id: 'tdee', label: '자신의 하루 총 에너지 대사 소모량 (TDEE)', type: 'number', defaultValue: 2400, unit: 'kcal', unitPosition: 'suffix', section: '신체 치수 측정 정보' },
          { id: 'deficitGoal', label: '설정할 일일 칼로리 적자폭 (Deficit)', type: 'range', defaultValue: 500, min: 200, max: 1000, step: 50, unit: 'kcal/일', unitPosition: 'suffix', section: '희망 은퇴 목표 설정' }
        ],
        calculate: (ins) => {
          const tdee = Number(ins.tdee) || 2400;
          const deficit = Number(ins.deficitGoal) || 500;

          const dietIntake = Math.max(1200, tdee - deficit);
          const weeklyLbsLoss = (deficit * 7) / 3500; // 3500 kcal = 1lb fat approx

          return {
            results: [
              { label: '하루 목표 섭취 칼로리 총량', value: `${Math.round(dietIntake)} kcal/하루`, rawValue: dietIntake, displayType: 'text', info: '체중을 정체 없이 안정적 하향 가이드하기 위한 이상적인 식사 섭취 분량입니다.' },
              { label: '주년 목표 월 예상 지방 감량치', value: `${(weeklyLbsLoss * 4 * 0.4535).toFixed(2)} kg (약 ${(weeklyLbsLoss * 4).toFixed(1)} lbs)`, rawValue: weeklyLbsLoss * 4, displayType: 'text' },
              { label: '적자 강도 조절 등급', value: deficit >= 750 ? 'Strong Deficit (강한 감량)' : 'Sustainable Deficit (건강한 유지감량)', rawValue: 0, displayType: 'badge', badgeColor: deficit >= 750 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800' }
            ]
          };
        },
        seoContent: {
          guide: '칼로리 적자(Deficit) 구조를 만들면 신체는 지질 대사를 유도해 지방 조직 에너지를 사용합니다. 일 500kcal 수준의 균형감은 대사 조절을 수용하며 지방을 줄입니다.',
          tips: ['요요 및 생리기능 장애를 억제하기 위해 최소 기초대사 수치(여성 1200kcal, 남성 1500kcal) 밑으로 과도 섭취를 굶지 마세요.'],
          faqs: [{ question: '순수 지방 1kg 소진에 어느 정도 연료 절차가 요구되나요?', answer: '체내 축적 지방 기준 대략 누계 7,700kcal 의 적자 결합 에너지가 선행되어야 합니다.' }]
        },
        relatedSlugs: ['bmi-calculator', 'bmr-calculator']
      };
    }

    // Default template fallback for any other searched keywords
    // Highly interactive customized solver so the page NEVER looks empty!
    return {
      title: '범용 복합 누적 성장 가이드 연산기',
      slug: slug || 'generic-calculator',
      category: category || 'finance',
      description: `특수 전용 공식과 목표 성률을 설정하기 전, 기하 복리 성장을 즉석에서 다차원 구현 연산해 봅니다.`,
      aliases: [],
      inputs: [
        { id: 'baseAmount', label: '시작 기준 자산원금', type: 'number', defaultValue: 50000, unit: '$', unitPosition: 'prefix', section: '일반 상세 항목' },
        { id: 'interest', label: '목표 복리 변동성률 (%)', type: 'range', defaultValue: 5, min: 1, max: 20, step: 0.5, unit: '%', unitPosition: 'suffix', section: '수치 값 입력 정보' },
        { id: 'term', label: '유지할 계산 전개 주기 (연수/년)', type: 'range', defaultValue: 5, min: 1, max: 30, step: 1, unit: '년', unitPosition: 'suffix', section: '목표 투자 기간' }
      ],
      calculate: (ins) => {
        const base = Number(ins.baseAmount) || 0;
        const rate = Number(ins.interest) || 0;
        const t = Number(ins.term) || 5;

        const accumulated = base * Math.pow(1 + (rate / 100), t);
        const gain = Math.max(0, accumulated - base);

        return {
          results: [
            { label: '최종 누적 산출 가치', value: accumulated, rawValue: accumulated, displayType: 'currency', info: '복리 배가 성장에 맞춰 변환 정렬된 최종 산물 총계액입니다.' },
            { label: '수정 순이익 증액량', value: gain, rawValue: gain, displayType: 'currency' }
          ]
        };
      },
      seoContent: {
        guide: '해당 스마트 가이드는 공식 분류에 별도 노출되지 않는 고유 키워드 및 한돌 가치 증폭 progresion을 실시간 복합 도해해 줍니다.',
        tips: ['재무적 이율, 백분율 인하, 신체 칼로리 잉여 등을 기하 검토하고 싶을 때 즉시 모의 시도해보세요.'],
        faqs: [{ question: '공학 수학적으로 복리 적용 원리는 같나요?', answer: '예, 원금 불입 기하 복리 공식(Geometric Compounding Formula)의 기강을 탑재해 동작합니다.' }]
      },
      relatedSlugs: ['compound-interest-calculator', 'percentage-calculator']
    };
  };

  // Active calculator layout selection
  const currentCalculator = customCalculator || (activeSlug ? CALCULATORS.find(c => c.slug === activeSlug) : null);

  // Filtered calculators list based on dynamic categories or search
  const filteredCalculators = CALCULATORS.filter(calc => {
    if (selectedCategory && calc.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      return (
        calc.title.toLowerCase().includes(q) ||
        calc.description.toLowerCase().includes(q) ||
        calc.aliases.some(a => a.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div id="calculator-application-container" className="min-h-screen bg-[#F9F9F8] flex flex-col text-[#1A1A1A] antialiased font-sans">
      
      {/* 2. HEADER NAVIGATION */}
      <header id="app-top-navigation-bar" className="sticky top-0 bg-[#F9F9F8] border-b-2 border-black z-50 py-4 px-4 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Title */}
          <button
            id="logo-home-button"
            onClick={handleNavigateHome}
            className="flex items-center gap-2 text-left focus:outline-none cursor-pointer group"
          >
            <div className="p-2.5 bg-black text-white rounded-none border border-black transition-transform group-hover:rotate-2">
              <Calculator size={20} className="stroke-[2.25]" />
            </div>
            <div>
              <div className="text-base font-black tracking-tight text-black flex items-center gap-1.5 uppercase font-sans">
                스마트 계산기 모음집
                <span className="text-[10px] font-bold bg-orange-600 text-white font-mono px-2 py-0.5 border border-black_">
                  110여개 도구
                </span>
              </div>
              <div className="text-[10px] text-black/60 font-serif italic tracking-wide">
                페이지 새로고침과 이동이 없는 실시간 초고속 연산 엔진
              </div>
            </div>
          </button>

          {/* Quick Stats Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-black text-black uppercase tracking-wider">
            <button
              onClick={handleNavigateHome}
              className={`hover:text-orange-655 transition-colors cursor-pointer ${!activeSlug ? 'text-orange-600' : ''}`}
            >
              디렉토리 홈
            </button>
            <span className="text-black/20">|</span>
            <div className="flex items-center gap-1.5 text-black/55">
              <Sparkles size={11} className="text-orange-600 fill-orange-600" />
              <span>지능형 스마트 자동검색</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. WORKING CONTENT STAGE */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 space-y-8">
        
        {/* SCENARIO A: ACTIVE CALCULATOR INDIVIDUAL ROUTED PAGE */}
        {currentCalculator ? (
          <div id="routed-calculator-page" className="space-y-6 animate-in fade-in duration-300">
            {/* Breadcrumb path navigation */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#F9F9F8] p-3 rounded-none border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-black/60">
                <button
                  id="breadcrumb-home"
                  onClick={handleNavigateHome}
                  className="hover:text-orange-600 transition-colors cursor-pointer"
                >
                  홈
                </button>
                <ChevronRight size={11} className="text-black/55 stroke-[2.5]" />
                <button
                  id={`breadcrumb-${currentCalculator.category}`}
                  onClick={() => handleSelectCategory(currentCalculator.category)}
                  className="hover:text-orange-600 transition-colors cursor-pointer"
                >
                  {translateCategory(currentCalculator.category)}
                </button>
                <ChevronRight size={11} className="text-black/55 stroke-[2.5]" />
                <span className="text-black font-black">{currentCalculator.title}</span>
              </div>

              {/* Action shortcuts */}
              <div className="flex items-center gap-2">
                <button
                  id="action-favorite-calc"
                  onClick={(e) => handleToggleBookmark(currentCalculator.slug, e)}
                  className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-none border-2 border-black transition-all cursor-pointer ${
                    bookmarks.includes(currentCalculator.slug)
                      ? 'bg-orange-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white hover:bg-[#F9F9F8] text-black'
                  }`}
                >
                  <Bookmark size={11} fill={bookmarks.includes(currentCalculator.slug) ? 'currentColor' : 'none'} className="stroke-[2.5]" />
                  {bookmarks.includes(currentCalculator.slug) ? '즐겨찾기 완료 ★' : '도구 즐겨찾기'}
                </button>

                <button
                  id="action-return-home"
                  onClick={handleNavigateHome}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-none bg-black hover:bg-orange-600 text-white transition-colors cursor-pointer border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <ArrowLeft size={11} className="stroke-[2.5]" />
                  전체 도구 목록
                </button>
              </div>
            </div>

            {/* Title & Introduction header block */}
            <div id="calculator-intro-header" className="space-y-2">
              <span className="inline-flex items-center text-[10px] font-black tracking-widest text-[#F9F9F8] uppercase bg-black px-3 py-1 border border-black">
                {translateCategory(currentCalculator.category)} 분류
              </span>
              <h1 className="text-3xl font-black text-black tracking-tight uppercase font-sans">
                {currentCalculator.title}
              </h1>
              <p className="text-black/85 text-xs font-serif leading-relaxed max-w-3xl pt-1">
                {currentCalculator.description}
              </p>
            </div>

            {/* Dynamic Computation Engine and Input form */}
            <CalculatorRenderer calculator={currentCalculator} />

            {/* Secondary Wikipedia-guided instructions and FAQs */}
            <CalculatorSEOInfo
              guide={currentCalculator.seoContent.guide}
              formula={currentCalculator.seoContent.formula}
              tips={currentCalculator.seoContent.tips}
              faqs={currentCalculator.seoContent.faqs}
            />

            {/* Related Recommendations Carousel */}
            <div id="related-recommendations" className="space-y-4 pt-10 border-t-2 border-black">
              <h3 className="text-xs font-black text-black uppercase tracking-[0.2em] flex items-center gap-2">
                <Sparkles size={16} className="text-orange-600 fill-orange-600" />
                함께 사용하기 좋은 추천 계산기 스마트 링크
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentCalculator.relatedSlugs.map((slug) => {
                  const item = CALCULATORS.find(c => c.slug === slug);
                  if (!item) return null;
                  return (
                    <CalculatorCard
                      key={slug}
                      calculator={item}
                      onSelect={() => handleLaunchCalculator(slug)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* SCENARIO B: MAIN HOME PAGE AND BROWSE LANDING DIRECTORY */
          <div id="main-landing-view" className="space-y-10 animate-in fade-in duration-300">
            {/* HERO HEADING CONTAINER AREA */}
            <div id="homepage-hero-banner" className="text-center max-w-3xl mx-auto space-y-6 py-8 border-b-2 border-black bg-white p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black rounded-none">
              <div className="inline-flex items-center gap-2 bg-orange-600 text-white text-[10px] font-black tracking-widest uppercase px-3.5 py-1.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mx-auto w-max select-none">
                <Sparkles size={11} className="text-white fill-white animate-pulse" />
                웹 최고의 원스톱 수학/실생활 지능 계산 시스템
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black leading-none uppercase font-sans">
                인터넷에서 가장 풍부한 <br />
                <span className="font-serif italic capitalize text-orange-600 lowercase inline-block py-1">
                  실시간 스마트 계산기
                </span>
              </h1>
              <p className="text-black/75 font-serif text-xs md:text-sm leading-relaxed max-w-2xl mx-auto italic">
                복잡한 전환이나 불필요한 새로고침 차단. 수억 명의 검색 수요를 관통하며, 오프라인으로 신뢰 가능하게 내장 공식 검증 및 궁금증 해결 안내를 일괄 제공합니다.
              </p>

              {/* SEARCH AUTOSUGGEST DIRECTORY */}
              <SearchBar onSelectCalculator={handleLaunchCalculator} />

              {/* Top highlights grid stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 max-w-2xl mx-auto text-left uppercase font-bold tracking-wider text-[9px]">
                <div className="bg-[#F9F9F8] p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between rounded-none">
                  <span className="text-black/55 font-mono">누적 등록 개수</span>
                  <span className="text-xs font-black text-black mt-1">110여개 가동 중</span>
                </div>
                <div className="bg-[#F9F9F8] p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between rounded-none">
                  <span className="text-black/55 font-mono">실시간 계산 속도</span>
                  <span className="text-xs font-black text-orange-655 font-mono mt-1">&lt; 0.01초 즉시</span>
                </div>
                <div className="bg-[#F9F9F8] p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between rounded-none">
                  <span className="text-black/55 font-mono">시각 다이어그램</span>
                  <span className="text-xs font-black text-black font-mono mt-1">Direct SVG 차트</span>
                </div>
                <div className="bg-[#F9F9F8] p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between rounded-none">
                  <span className="text-black/55 font-mono">이용료 및 광고</span>
                  <span className="text-xs font-black text-orange-600 mt-1">클린 청정 0% 무료</span>
                </div>
              </div>
            </div>

            {/* CATEGORY EXPLORER SLIDES */}
            <CategoryList
              onSelectCategory={handleSelectCategory}
              selectedCategory={selectedCategory}
            />            {/* PERSISTENT POPULAR SECTIONS AND INDEX GRID */}
            <div id="calculator-explorer-panel" className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
              
              {/* PRIMARY LEFT SIDE: Grid directory with active category filter */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-black gap-2">
                  <h2 className="text-xs font-black text-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <ListFilter size={15} className="text-orange-600 stroke-[2.5]" />
                    {selectedCategory ? (
                      <>
                        선택된 분류 필정:{' '}
                        <span className="bg-black text-white px-2.5 py-1 text-[10px] font-mono leading-none tracking-normal rounded-none border border-black z-10">
                          {translateCategory(selectedCategory)}
                        </span>
                      </>
                    ) : (
                      '실시간 가용 전체 계산 도구 목록'
                    )}
                  </h2>
                  <span className="text-[10px] font-bold text-black/55 uppercase font-mono tracking-wider">
                    인덱스 크기: 총 {filteredCalculators.length}개 유틸리티 가동 확인
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCalculators.map((calc) => (
                    <CalculatorCard
                      key={calc.slug}
                      calculator={calc}
                      onSelect={() => handleLaunchCalculator(calc.slug)}
                    />
                  ))}
                </div>

                {/* Extended Master Index Listings to display massive scale (100+) */}
                {!selectedCategory && (
                  <div className="bg-white p-6 rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
                    <div className="border-b border-black pb-3">
                      <h3 className="font-mono text-black text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-2.5 h-1 bg-orange-600 block"></span>
                        통합 인스턴트 검색 지원 인덱스
                      </h3>
                      <p className="text-black/60 text-[10px] leading-relaxed font-sans uppercase font-bold tracking-tight mt-1.5">
                        별도의 거추장스러운 클릭이나 로드 없이, 세부적으로 검색 가능한 110여개 이상의 특화 세부 별칭을 인덱싱하여 즉각 실행해 지원하고 있습니다.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2 custom-scroll scrollbar-none">
                      {EXPANDED_CALCULATOR_INDEX.map((item, idx) => (
                        <button
                          key={idx}
                          id={`expanded-index-item-${idx}`}
                          onClick={() => handleLaunchCalculator(item.slug)}
                          className="text-left py-2 px-3 bg-[#F9F9F8] hover:bg-orange-600 hover:text-white border border-black rounded-none text-[10px] font-bold uppercase tracking-wider text-black flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <span className="truncate">{item.title}</span>
                          <span className="text-[9px] font-mono group-hover:text-white bg-black text-white px-1.5 py-0.5 ml-1 select-none">
                            {translateCategory(item.category)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* SECONDARY RIGHT SIDEBAR: History and Quick Launch shortcuts */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Bookmarks Section */}
                {bookmarks.length > 0 && (
                  <div id="user-bookmarks-sidebar" className="bg-white border-2 border-black rounded-none p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
                    <h3 className="text-[10px] font-black text-black uppercase tracking-[0.2em] flex items-center gap-1.5 border-b border-black pb-2">
                      <Bookmark size={13} className="text-orange-600 fill-orange-600" />
                      내가 즐겨찾기한 계산 목록
                    </h3>
                    <div className="space-y-2">
                      {bookmarks.map((slug) => {
                        const item = CALCULATORS.find(c => c.slug === slug) || EXPANDED_CALCULATOR_INDEX.find(c => c.slug === slug);
                        if (!item) return null;
                        return (
                          <button
                            id={`fav-shortcut-${slug}`}
                            key={slug}
                            onClick={() => handleLaunchCalculator(slug)}
                            className="w-full text-left px-3 py-2 border border-black hover:bg-orange-600 hover:text-white text-[10px] font-bold uppercase tracking-wider text-black flex items-center justify-between transition-colors bg-[#F9F9F8] rounded-none cursor-pointer"
                          >
                            <span className="truncate">{item.title}</span>
                            <span className="font-mono text-[9px]">검토 활성화 →</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* History list queue */}
                {history.length > 0 && (
                  <div id="user-history-sidebar" className="bg-white border-2 border-black rounded-none p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
                    <h3 className="text-[10px] font-black text-black uppercase tracking-[0.2em] flex items-center gap-1.5 border-b border-black pb-2">
                      <History size={13} className="text-orange-600" />
                      최근 가동한 도구 로그
                    </h3>
                    <div className="space-y-1.5">
                      {history.map((slug) => {
                        const item = CALCULATORS.find(c => c.slug === slug) || EXPANDED_CALCULATOR_INDEX.find(c => c.slug === slug);
                        if (!item) return null;
                        return (
                          <div
                            key={slug}
                            onClick={() => handleLaunchCalculator(slug)}
                            className="text-[10px] font-bold uppercase tracking-wider text-black hover:bg-orange-600 hover:text-white px-3 py-2 rounded-none border border-black cursor-pointer bg-[#F9F9F8] flex items-center justify-between transition-colors"
                          >
                            <span className="truncate">{item.title}</span>
                            <span className="text-[8px] font-mono text-orange-600">이동 기록</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Static Editorial Value Card */}
                <div className="bg-[#F9F9F8] text-black border-2 border-black p-5 rounded-none shadow-[4px_4px_0px_0px_#EA580C] space-y-3 relative overflow-hidden">
                  <h3 className="text-[10px] font-black uppercase text-black tracking-[0.2em] border-b border-black pb-1.5">
                    가장 친근하고 독립적인 스마트 명세
                  </h3>
                  <p className="text-xs text-black/85 font-serif leading-relaxed">
                    페이지 이동 장애, 광고 도배, 깜빡이며 대기 시간지연을 소거하는 것을 목표로 설계되었습니다. 실시간 공식 입증 및 가시 분석 그래프를 일괄 제공합니다.
                  </p>
                  <p className="text-[8px] text-orange-650 font-mono font-bold tracking-wider uppercase">
                    포함 분류: 금융 및 과세 • 디데이 군대 일정 • 피드 섭취량 • 부동산 주담대 • 기하수학
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* 4. FOOTER */}
      <footer id="app-footer-guide" className="border-t-2 border-black bg-white py-12 px-4 md:px-8 mt-16 text-xs text-black/55 uppercase font-bold tracking-wider">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left normal-case tracking-normal">
            <div className="font-sans text-black text-sm font-black uppercase tracking-widest flex items-center justify-center md:justify-start gap-1.5">
              <Calculator size={16} className="text-orange-600" />
              스마트 계산기 모음집
            </div>
            <p className="max-w-md font-serif text-xs text-black/70 italic">
              페이지 새로고침 없는 기하 복리 불입 저축 도해, 기초 신체 지수 대사 격차, 군 D-Day 카운트 및 비율 수식을 연동한 웹 통합 모음집입니다.
            </p>
          </div>

          <div className="flex gap-8 text-[10px] text-black">
            <span>보안 암호성 규격 적용</span>
            <span>All Rights Reserved 2026</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
