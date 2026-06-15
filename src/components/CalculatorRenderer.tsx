/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Copy, Check, RotateCcw, Info, Sparkles, AlertCircle } from 'lucide-react';
import { CalculatorSchema } from '../types';

// Dynamic Localization Vocabulary
const TRANSLATIONS: Record<string, string> = {
  // Input Sections
  'General Details': '일반 상세 항목',
  'Property Details': '매물 및 가격 상세',
  'Loan Terms': '대출 기본 조건',
  'Taxes & Fees': '세금 및 부가 수수료',
  'Initial Amount': '초기 적립 원금 구성',
  'Contributions': '적립식 납부/저축 구성',
  'Time Horizon': '목표 투자 기간',
  'Interest & Returns': '기대 이자율 및 수익 구성',
  'Retirement Goals': '희망 은퇴 목표 설정',
  'Salary Structure': '연봉 및 근로급여 구성',
  'Tax Allowances': '공제 부양가족 구성',
  'Height & Weight': '신체 치수 측정 정보',
  'Personal Info': '개인 세부 속성',
  'Milestones': '복무 일정 연혁 설정',
  'Financial Details': '복무 기간 장려 혜택',
  'Dividend Settings': '지급 배당 구성 설정',
  'Interval Range': '기준 날짜 주년 간격',
  'Percentage Modes': '퍼센트 연산 모드 선택',
  'Value Parameters': '수치 값 입력 정보',

  // Input Labels
  'Home Value': '주택 가격',
  'Down Payment': '다운페이 (부담할 원금)',
  'Interest Rate (Annual)': '연 이자율',
  'Loan Term': '대출 기간',
  'Annual Property Tax Rate': '연 재산세율',
  'Annual Home Insurance': '연 주택보험료',
  'Initial Deposit': '초기 투자 원금',
  'Monthly Contribution': '월 저축/적립식 납입금',
  'Time Horizon (Years)': '투자 기간 (년)',
  'Expected Annual Return': '예상 연간 수익률',
  'Compounding Frequency': '복리 계산 빈도',
  'Current Age': '현재 나이',
  'Current Retirement Savings': '은퇴용 원금 저축 현황',
  'Monthly Savings Amount': '월 은퇴용 저축액',
  'Expected Investment Return (Pre-retirement)': '예상 은퇴 전 연 수익률',
  'Inflation Adjusted Rate': '물가상승률 반영',
  'Expected Retirement Age': '은퇴 목표 나이',
  'Desired Yearly Retirement Outlays': '은퇴 후 연간 희망 생활비',
  'Expected Post-retirement Return': '예상 은퇴 후 연 수익률',
  'Annual Gross Salary': '연봉 (세전)',
  'Annual Bonus': '연간 보너스 (세전)',
  'Number of Dependents': '부양가족 수 (인적공제용)',
  'Weight System': '단위계 선택',
  'Weight (kg)': '몸무게 (kg)',
  'Height (cm)': '키 (cm)',
  'Weight (lbs)': '몸무게 (lbs)',
  'Height (ft)': '키 (ft)',
  'Height (in)': '키 (in)',
  'Service Start Date': '소집/군 입영일',
  'Service End Date (Discharge)': '전역/소집해제 예정일',
  'Current Monthly Base Salary': '현재 월 기본급',
  'Base Salary Grade': '기준 단위 선택',
  'Current Hourly Pay Rate': '현재 적용 시급',
  'Hours Worked per Week': '주당 평균 근무 시간',
  'Paid Vacation Days per Year': '연당 유급 휴가 사용 일수',
  'Gender': '생물학적 성별',
  'Age (Years)': '현재 나이(세)',
  'Activity Level Rate': '기본 일상 활동량',
  'Expected Dividend Yield': '예상 기본 배당수익률',
  'Dividend Compounding': '배당 지급/복리 주기',
  'Dividend Growth Rate (Annual)': '연간 예상 배당 성장률',
  'Reinvest Dividends (DRIP)': '배당금 자동 재투자 (DRIP)',
  'Start Date (Alpha)': '시작 기준일',
  'Target End Date (Omega)': '종료 기준일',
  'Calculation Direction Mode': '퍼센트 연산 모드 선택',
  'Base Absolute Value': '연산 대상 기준값',
  'Comparison Standard Value': '변동 적용할 값(퍼센트)',
  
  // BMI levels & options
  'Metric (kg, cm)': '미터법 (kg, cm)',
  'Imperial (lbs, ft/in)': '야드파운드법 (lbs, ft/in)',
  'Male': '남성',
  'Female': '여성',
  
  // Range frequencies & compounding
  'Annually': '연 복리 (1년)',
  'Quarterly': '분기 복리 (3개월)',
  'Monthly': '월 복리 (1개월)',
  'Daily': '일 복리 (하루단위)',
  'Bi-weekly': '2주단위 적립',
  'Weekly': '주단위 적립',
  'Semi-annually': '반기단위 복리',
  
  // Grade types / options
  'Hourly wage': '시급 기준',
  'Daily salary': '일급 기준',
  'Weekly salary': '주급 기준',
  'Annual salary': '연봉 기준',
  'Custom Calculation Mode': '적합성 맞춤 설정',
  'Percentage Change (A to B)': '퍼센트 변화율 (A에서 B로)',
  'Percentage Value of Total': '전체값의 퍼센트 비중 연산',
  'Percentage Add/Subtract': '기준값에 퍼센트 가감 연산',
  'Fraction to Percentage': '분수를 백분율로 환산',

  // Output / Result Labels
  'Total Monthly Payment': '총 월 상환금 (원리금/세금/보험 포함)',
  'Monthly Principal & Interest (P&I)': '월 원금 및 이자 (P&I)',
  'Monthly Property Tax': '월 평균 재산세 부담액',
  'Monthly Insurance': '월 평균 주택 보증보험 부담액',
  'Loan Principal Amount': '순수 대출 원금',
  'Total Interest Paid': '대출 실행 기간 총 이자 부담액',
  'Total Payment Amount': '총 금융 원리금 상환 누계액',
  
  'Total Wealth': '인수 시점 예상 총 자산',
  'Interest': '수익 이자 누적분',
  
  'Total Wealth At Retirement': '은퇴 시점 도달 예상 자산액',
  'Total Contributions': '은퇴 전 총 원금 적립액',
  'Total Accrued Interest': '은퇴 전 누적 총 복리 수익액',
  'Expected Annual Retirement Income': '은퇴 후 예상 연간 연금 소득',
  'Expected Monthly Retirement Income': '은퇴 후 예상 월간 연금 수령액',
  'Years to Freedom': '경제적 자립(FIRE)까지 남은 기간',
  'Retirement Freedom Age': '경제적 자립 도달 시 예상 만 나이',
  
  'Net Monthly Income (Take-Home)': '실수령 월급 (네트 세후급여)',
  'Total Deductions': '총 공제액 (세금 + 4대 사회보험)',
  'Effective Tax Rate': '실효 소득세율',
  'National Pension': '국민연금 이체액',
  'Health Insurance': '건강보험료 납부액',
  'Employment Insurance': '고용보험료 납부액',
  'Income Tax (Federal/State equivalent)': '원천징수 근로소득세',
  
  'BMI Score': '산출된 체질량 (BMI) 지수',
  'BMI Category': '비만 등급 상태',
  'Healthy Weight Range (Min - Max)': '키 기준 추천 표준 체중 범위',
  'Ponderal Index': '체격도 지수 (Ponderal Index)',
  
  'Days Remaining Until Discharge': '전역 및 소집해제까지 남은 날짜',
  'Completed Service Percentage': '현재 복무 진행율 (퍼센트)',
  'Total Service Duration': '총 복무 의무 기간',
  'Days Served': '입영일 이후 복무 완료일수',
  'Daily Enlistment Pension Equivalent': '복무 일일 가치 환산액',
  
  'Equivalent Annual Salary': '연봉 변환 환산액 (세전)',
  'Equivalent Monthly Salary': '월 실수령 상당 환산액',
  'Equivalent Weekly Salary': '주급 변환 환산액',
  'Equivalent Daily Wage': '일급 변환 환산액',
  'Equivalent Hourly Rate': '시급 변환 환산액',
  
  'Basal Metabolic Rate (BMR)': '기초대사량 (BMR)',
  'Sedentary Burn': '비활동 시 일 소모 칼로리',
  'Light Activity Burn': '가벼운 활동 시 일 소모 칼로리',
  'Moderate Activity Burn': '보통 활동 시 일 소모 칼로리',
  'Very Active Burn': '정기적 운동 시 일 소모 칼로리',
  'Extra Active Burn': '고강도 운동/작업 시 일 소모 칼로리',
  
  'End of Horizon Portfolio Value': '만기 기준 최종 누적 투자 자산액',
  'Cumulative Reinvested Dividends': '지급 후 재투자된 총 배당금 누계',
  'Total Initial Principal': '초기 세팅 투자 및 총 수수료 원금',
  'Final Year Annual Dividend Income': '목표 연도 연간 지급 배당 규모',
  'Final Year Monthly Dividend Income': '목표 연도 월간 지급 배당액',
  
  'RemainingBalance': '남은 대출 잔액',
  'CumulativePrincipal': '적립된 누적 상정 원금',
  'CumulativeInterest': '동기 누적 발생 이자 총량',
  
  'Total Days Between Setup': '두 기준일 간격 총 일수',
  'Total Weeks & Days': '주수 및 잔여 일수 표기',
  'Total Months & Days': '월수 및 잔여 일수 표기',
  'Total Years & Days': '년수 및 잔여 일수 표기',
  'Total Working Days (Exclude Weekends)': '총 실질 가동 업무 평일수 (주말 제외)',
  
  'End Horizon Accumulated Wealth': '적립 만기 최종 원리금액',
  'Investment Return Portion': '수익 이자 누적 증액분',
  
  'Percentage Rate': '산출 비율 결과치',
  'Decrease Percentage Result': '변동 감소된 최종 결과값',
  'Increase Percentage Result': '변동 증가된 최종 결과값',
  'Fraction Value representation': '분수값의 소수 표현치',
  
  // Activity options helper
  'Sedentary: little or no exercise': '가만히 있어도 칼로리가 거의 숨 쉬는 정도만 소진되는 경우 (비활동)',
  'Light: exercise 1-3 times/week': '주 1~3회 간단한 산책이나 레크리에이션 참여',
  'Moderate: exercise 4-5 times/week': '주 4~5회 땀 흘리며 달리기 및 유산소 스포츠 등',
  'Active: daily intense exercise': '매일 확실하게 트레이닝을 진행하고 걷는 비율이 높은 경우',
  'Heavy: physical job or 2x sports': '소방관, 체육관 전문 트레이너, 고강도 건설노동 전문가군'
};

const translateText = (text: string): string => {
  if (!text) return '';
  const trimmed = text.trim();
  if (TRANSLATIONS[trimmed]) return TRANSLATIONS[trimmed];
  return trimmed;
};

interface CalculatorRendererProps {
  calculator: CalculatorSchema;
}

export default function CalculatorRenderer({ calculator }: CalculatorRendererProps) {
  // Initialize state based on inputs schema
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const defaultVals: Record<string, any> = {};
    calculator.inputs.forEach((inp) => {
      defaultVals[inp.id] = inp.defaultValue;
    });
    setInputs(defaultVals);
  }, [calculator]);

  const handleInputChange = (id: string, value: any) => {
    setInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleReset = () => {
    const defaultVals: Record<string, any> = {};
    calculator.inputs.forEach((inp) => {
      defaultVals[inp.id] = inp.defaultValue;
    });
    setInputs(defaultVals);
  };

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  // Run the calculation engine
  const calculation = calculator.calculate(inputs);
  const results = calculation.results;
  const chartData = calculation.chartData;
  const customReport = calculation.customReport;

  // Format utility
  const formatValue = (val: any, format: string) => {
    if (val === undefined || val === null) return '';
    if (typeof val === 'string') return translateText(val); // Translate any string type values like 'Normal' or 'Obese'
    if (isNaN(val)) return '0';

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
      case 'percent':
        return `${val.toFixed(2)}%`;
      case 'number':
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(val);
      case 'duration':
        return `${val} 일`;
      default:
        return String(val);
    }
  };

  // Primary focal highlight result (e.g. first matching output)
  const primaryResult = results[0];
  const secondaryResults = results.slice(1);

  // Group inputs into sections for pristine layout
  const sections: Record<string, typeof calculator.inputs> = {};
  calculator.inputs.forEach((inp) => {
    const sName = inp.section || 'General Details';
    // Let's filter some conditionally (e.g., metric vs imperial inputs in BMI)
    if (calculator.slug === 'bmi-calculator') {
      const isMet = inputs.system === 'metric';
      if (isMet && (inp.id === 'weightLbs' || inp.id === 'heightFt' || inp.id === 'heightIn')) return;
      if (!isMet && (inp.id === 'weightKg' || inp.id === 'heightCm')) return;
    }

    if (!sections[sName]) sections[sName] = [];
    sections[sName].push(inp);
  });

  return (
    <div id="calculator-rendering-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* LEFT COLUMN: Input Configuration Form */}
      <div className="lg:col-span-12 xl:col-span-5 bg-white border-2 border-black rounded-none p-6 space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between pb-3 border-b border-black">
          <span className="text-xs font-black tracking-widest text-black uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-black"></span>
            계산기 입력 항목
          </span>
          <button
            id="reset-inputs-btn"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-[10px] font-bold text-black hover:text-orange-650 uppercase tracking-wider transition-colors cursor-pointer border border-black px-2 py-1 bg-[#F9F9F8] active:bg-black active:text-white"
          >
            <RotateCcw size={12} className="stroke-[2.5]" />
            기본값 초기화
          </button>
        </div>

        <div className="space-y-6">
          {Object.entries(sections).map(([sectionName, list]) => (
            <div key={sectionName} className="space-y-4">
              <h5 className="text-[11px] font-black text-orange-600 uppercase tracking-[0.2em] border-l-2 border-orange-600 pl-2">
                {translateText(sectionName)}
              </h5>
              <div className="space-y-4">
                {list.map((inp) => {
                  const currentValue = inputs[inp.id] !== undefined ? inputs[inp.id] : inp.defaultValue;

                  return (
                    <div id={`field-wrap-${inp.id}`} key={inp.id} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                          {translateText(inp.label)}
                          {inp.info && (
                            <span className="group relative cursor-help">
                              <Info size={13} className="text-black/50 hover:text-black" />
                              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-48 p-2.5 bg-black text-[10px] text-white rounded-none opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-center font-normal font-sans shadow-lg leading-normal border border-white">
                                {inp.info /* Info tips can keep English as description guides since they are long and technical */}
                              </span>
                            </span>
                          )}
                        </label>
                        {inp.type === 'range' && (
                          <span className="text-xs font-mono font-bold text-orange-650 bg-orange-600/10 px-2 py-0.5 border border-black">
                            {currentValue} {translateText(inp.unit || '')}
                          </span>
                        )}
                      </div>

                      {/* Control Types */}
                      {inp.type === 'select' && (
                        <select
                          id={`input-select-${inp.id}`}
                          value={currentValue}
                          onChange={(e) => handleInputChange(inp.id, e.target.value)}
                          className="w-full bg-[#F9F9F8] hover:bg-white border-2 border-black px-3 py-2 text-xs font-bold uppercase tracking-wider text-black focus:outline-none focus:bg-white transition-all cursor-pointer rounded-none"
                        >
                          {inp.options?.map((opt) => (
                            <option key={String(opt.value)} value={String(opt.value)} className="bg-white text-black font-sans uppercase text-xs font-bold font-mono">
                              {translateText(opt.label)}
                            </option>
                          ))}
                        </select>
                      )}

                      {inp.type === 'boolean' && (
                        <label className="relative flex items-center gap-2.5 cursor-pointer py-1.5 select-none text-black">
                          <input
                            id={`input-checkbox-${inp.id}`}
                            type="checkbox"
                            checked={!!currentValue}
                            onChange={(e) => handleInputChange(inp.id, e.target.checked)}
                            className="w-4 h-4 text-orange-600 border-2 border-black rounded-none focus:ring-0 cursor-pointer accent-orange-600"
                          />
                          <span className="text-[10px] font-bold uppercase tracking-wider">추출 옵션 적용하기</span>
                        </label>
                      )}

                      {inp.type === 'date' && (
                        <input
                          id={`input-date-${inp.id}`}
                          type="date"
                          value={currentValue}
                          onChange={(e) => handleInputChange(inp.id, e.target.value)}
                          className="w-full bg-[#F9F9F8] border-2 border-black px-3 py-2 text-xs font-mono text-black focus:outline-none focus:bg-white transition-all rounded-none"
                        />
                      )}

                      {inp.type === 'number' && (
                        <div className="relative flex rounded-none">
                          {inp.unitPosition === 'prefix' && (
                            <span className="inline-flex items-center px-3 border-2 border-r-0 border-black bg-black text-white text-xs font-bold">
                              {translateText(inp.unit)}
                            </span>
                          )}
                          <input
                            id={`input-number-${inp.id}`}
                            type="number"
                            value={currentValue}
                            onChange={(e) => handleInputChange(inp.id, Number(e.target.value))}
                            className="w-full bg-[#F9F9F8] focus:bg-white border-2 border-black py-2 px-3 text-xs font-bold text-black focus:outline-none transition-all rounded-none"
                          />
                          {inp.unitPosition === 'suffix' && (
                            <span className="inline-flex items-center px-3 border-2 border-l-0 border-black bg-black text-white text-xs font-bold">
                              {translateText(inp.unit)}
                            </span>
                          )}
                        </div>
                      )}

                      {inp.type === 'range' && (
                        <div className="space-y-1 pt-1">
                          <input
                            id={`input-range-${inp.id}`}
                            type="range"
                            min={inp.min}
                            max={inp.max}
                            step={inp.step}
                            value={currentValue}
                            onChange={(e) => handleInputChange(inp.id, Number(e.target.value))}
                            className="w-full h-2 bg-black/10 rounded-none appearance-none cursor-pointer accent-orange-600 focus:outline-none"
                          />
                          <div className="flex justify-between text-[9px] font-mono font-bold text-black/55">
                            <span>최소: {inp.min} {translateText(inp.unit || '')}</span>
                            <span>최대: {inp.max} {translateText(inp.unit || '')}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: Real-time Output Metric Display */}
      <div className="lg:col-span-12 xl:col-span-7 space-y-6">
        
        {/* Prime Focal Card */}
        {primaryResult && (
          <div id="calculator-highlights" className="bg-black text-white border-2 border-black rounded-none p-6 md:p-8 shadow-[6px_6px_0px_0px_#EA580C] relative flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-[#F9F9F8] bg-orange-600 px-3 py-1 w-max mb-5 border border-black">
                <Sparkles size={10} className="text-white fill-white" />
                실시간 산출 주요 지표
              </div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-orange-400">
                {translateText(primaryResult.label)}
              </h2>
              <div className="text-4xl md:text-5xl font-black font-sans tracking-tight mt-2 mb-3">
                {formatValue(primaryResult.value, primaryResult.displayType)}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/20 pt-4 mt-4 gap-4">
              <span className="text-xs text-[#F9F9F8]/70 italic font-serif leading-relaxed max-w-sm">
                "{primaryResult.info ? translateText(primaryResult.info) : '입력하신 변수에 따라 실시간 데이터 계산 엔진에 의해 동적으로 시뮬레이션된 검증 값입니다.'}"
              </span>
              <button
                id="copy-primary-metric"
                onClick={() => handleCopyText(formatValue(primaryResult.value, primaryResult.displayType), 0)}
                className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-white text-black hover:bg-orange-600 hover:text-white px-4 py-2 rounded-none border border-black transition-all cursor-pointer select-none shrink-0"
              >
                {copiedIndex === 0 ? (
                  <>
                    <Check size={12} className="stroke-[3]" />
                    복사 완료!
                  </>
                ) : (
                  <>
                    <Copy size={12} className="stroke-[2.5]" />
                    계산값 복사
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Graphic Charts & Breakdowns */}
        {/* Custom Visualizations for key calculators to maximize UX */}
        <div id="calculator-graphed-visualization" className="bg-white border-2 border-black rounded-none p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <h4 className="text-[10px] font-black text-black uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-2.5 h-1 bg-orange-600 inline-block"></span>
            동적 다이어그램 시각 분석
          </h4>

          {/* 1. Stacked percentage slider/bar for Take-Home salary */}
          {calculator.slug === 'net-salary-calculator' && chartData && (
            <div className="space-y-4 pt-2">
              <div className="h-8 rounded-none border-2 border-black overflow-hidden flex shadow-inner">
                {chartData.map((item, idx) => {
                  const colors = ['bg-black', 'bg-orange-600', 'bg-orange-300', 'bg-yellow-500', 'bg-stone-400'];
                  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
                  const basePercent = total > 0 ? (item.value / total) * 100 : 0;
                  if (basePercent <= 0) return null;
                  return (
                    <div
                      key={idx}
                      style={{ width: `${basePercent}%` }}
                      className={`${colors[idx % colors.length]} transition-all duration-300 relative group border-r last:border-0 border-black`}
                      title={`${translateText(item.name)}: ${formatValue(item.value, 'currency')} (${basePercent.toFixed(1)}%)`}
                    />
                  );
                })}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 text-[10px] uppercase font-bold tracking-wider">
                {chartData.map((item, idx) => {
                  const colors = ['bg-black', 'bg-orange-100/10 border-2 border-black border-dashed', 'bg-orange-600', 'bg-orange-300', 'bg-yellow-500'];
                  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
                  const basePercent = total > 0 ? (item.value / total) * 100 : 0;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <span className={`w-3 h-3 ${colors[idx % colors.length]}`} />
                      <span className="text-black">{translateText(item.name)}</span>
                      <span className="font-mono text-orange-600">({basePercent.toFixed(0)}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Custom health BMI dial slider index */}
          {calculator.slug === 'bmi-calculator' && customReport && (
            <div className="pt-2 text-center space-y-4 relative w-full">
              <div className="h-5 bg-gradient-to-r from-stone-200 via-orange-350 via-orange-600 to-black rounded-none border-2 border-black relative">
                {/* Pointer Needle pin representing index score */}
                {(() => {
                  const currentBmi = customReport.currentBmi || 0;
                  // Map BMI range [15, 35] to percentages [5%, 95%]
                  const pct = Math.max(5, Math.min(95, ((currentBmi - 12) / (38 - 12)) * 100));
                  return (
                    <div
                      style={{ left: `${pct}%` }}
                      className="absolute top-1/2 -translate-y-1/2 -ml-2 w-4 h-8 bg-black border-2 border-white rounded-none shadow-lg flex items-center justify-center transition-all duration-300"
                    >
                      <div className="w-1.5 h-3 bg-white" />
                    </div>
                  );
                })()}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[8px] font-bold uppercase tracking-wider text-black/60 pt-1 text-center font-mono">
                <div className="border border-black/10 py-1 bg-stone-100">저체중 (&lt;18.5)</div>
                <div className="border-2 border-orange-600 py-1 bg-orange-600/10 text-orange-700">정상체중 (18.5 - 24.9)</div>
                <div className="border border-black/10 py-1 bg-stone-100">과체중 (25 - 29.9)</div>
                <div className="border border-black/10 py-1 bg-stone-100">고도비만 (&gt;30)</div>
              </div>
            </div>
          )}

          {/* 3. Compound growth stack line charts */}
          {(calculator.slug === 'compound-interest-calculator' || calculator.slug === 'retirement-planner' || calculator.slug === 'dividend-calculator' || calculator.slug === 'savings-growth-calculator' || calculator.slug === 'mortgage-calculator') && chartData && (
            <div className="space-y-4 pt-2">
              <div className="h-44 flex items-end justify-between gap-1 border-b-2 border-l-2 border-black pb-1.5 pl-1.5">
                {chartData.map((item: any, idx: number) => {
                  const maxVal = Math.max(...chartData.map((d: any) => {
                    return Object.keys(d)
                      .filter((k) => k !== 'label')
                      .reduce((sum, key) => sum + Number(d[key]), 0);
                  }));

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end relative group">
                      {/* Interactive hover tooltip inside container */}
                      <div className="absolute bottom-full mb-2 bg-black text-white rounded-none border border-white p-2.5 text-[9px] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none w-36 font-semibold uppercase tracking-wider text-center shadow">
                        <span className="font-bold border-b border-white/20 pb-0.5 block mb-1 text-orange-555">{item.label}</span>
                        {Object.keys(item)
                          .filter((k) => k !== 'label')
                          .map((key) => (
                            <span key={key} className="block text-stone-200 text-[8px]">
                              {translateText(key)}: <span className="font-bold text-white">{formatValue(item[key], 'number')}</span>
                            </span>
                          ))}
                      </div>

                      {/* Display stacked colored components of bar */}
                      <div className="w-full flex flex-col justify-end border border-black rounded-none overflow-hidden max-w-[20px]" style={{ height: '90%' }}>
                        {Object.keys(item)
                          .filter((k) => k !== 'label')
                          .map((key, kIdx) => {
                            const val = Number(item[key]);
                            const barHeight = maxVal > 0 ? (val / maxVal) * 100 : 0;
                            const colors = ['bg-black', 'bg-orange-600', 'bg-orange-350', 'bg-stone-400'];
                            return (
                              <div
                                key={key}
                                style={{ height: `${barHeight}%` }}
                                className={`${colors[kIdx % colors.length]} w-full transition-all duration-300 border-t border-black/20 first:border-t-0`}
                              />
                            );
                          })}
                      </div>
                      <span className="text-[9px] font-mono text-black/50 mt-1 font-bold">{item.label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-4 text-[9px] font-bold uppercase tracking-wider justify-center select-none pt-1">
                {Object.keys(chartData[0] || {})
                  .filter((k) => k !== 'label')
                  .map((key, idx) => {
                    const colors = ['bg-black', 'bg-orange-600', 'bg-orange-350', 'bg-stone-400'];
                    return (
                      <div key={key} className="flex items-center gap-1.5">
                        <span className={`w-3 h-3 border border-black ${colors[idx % colors.length]}`} />
                        <span className="text-black">{translateText(key)}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Simple vector graphic placeholder for general utilities */}
          {!chartData && calculator.slug !== 'bmi-calculator' && (
            <div className="py-8 text-center flex flex-col items-center justify-center text-black/40 space-y-2 select-none border border-dashed border-black/20 bg-stone-50">
              <div className="w-12 h-12 bg-black text-white rounded-none flex items-center justify-center border border-black">
                <AlertCircle size={22} className="stroke-[2.5]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-black">계산 엔진 작동 완료</span>
              <span className="text-[10px] text-black/60 max-w-sm font-serif italic text-center">
                모든 값이 실시간으로 정확하게 산출되었습니다. 아래 상세 명세서에서 항목별 최종 변화량을 확인해보세요.
              </span>
            </div>
          )}
        </div>

        {/* Detailed Secondary Result Blocks */}
        {secondaryResults.length > 0 && (
          <div id="calculator-detailed-summary" className="bg-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="px-5 py-3 border-b-2 border-black flex items-center justify-between bg-[#F9F9F8]">
              <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-black">
                세부 산출 분석 명세서
              </h4>
            </div>

            <div className="divide-y divide-black/10">
              {secondaryResults.map((row, idx) => (
                <div
                  id={`result-row-${idx}`}
                  key={idx}
                  className="px-5 py-4 hover:bg-orange-100/10 transition-colors flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold uppercase tracking-wider text-black flex items-center gap-1">
                      {translateText(row.label)}
                      {row.info && (
                        <span className="group relative cursor-help">
                          <Info size={12} className="text-black/40 hover:text-black" />
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-44 p-2 bg-black text-[9px] text-white rounded-none opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-center font-normal font-sans shadow-lg leading-normal border border-white">
                            {row.info}
                          </span>
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {row.displayType === 'badge' ? (
                      <span className={`px-3 py-1 text-[10px] uppercase font-bold border border-black ${row.badgeColor || 'bg-black text-white'}`}>
                        {translateText(row.value)}
                      </span>
                    ) : (
                      <span className="font-black text-black text-sm font-mono">
                        {formatValue(row.value, row.displayType)}
                      </span>
                    )}

                    <button
                      id={`copy-det-btn-${idx}`}
                      onClick={() => handleCopyText(formatValue(row.value, row.displayType), idx + 1)}
                      className="text-black/55 hover:text-black leading-none p-2 border border-black bg-stone-50 hover:bg-orange-600 hover:text-white transition-colors cursor-pointer rounded-none"
                      title="복사하기"
                    >
                      {copiedIndex === idx + 1 ? (
                        <Check size={12} className="text-emerald-500 stroke-[3]" />
                      ) : (
                        <Copy size={12} className="stroke-[2.5]" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
