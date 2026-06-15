/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CalculatorSchema, CalculatorCategory } from '../types';
import { MORE_CALCULATORS } from './moreCalculators';

export interface CategoryInfo {
  id: CalculatorCategory;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'finance', name: '금융', description: '대출, 복리 예적금, 이자율 및 자산 성장 계산기.', icon: 'Wallet', count: 18 },
  { id: 'tax', name: '세금', description: '소득세, 부가가치세, 원천징수, ISA/IRP 세액 공제 계산기.', icon: 'Percent', count: 13 },
  { id: 'salary', name: '급여/연봉', description: '실수령액 계산, 시급/일급 환산, 주휴수당 및 퇴직금 계산기.', icon: 'Briefcase', count: 8 },
  { id: 'investment', name: '투자', description: '주식 수익률, 배당금 재투자(DRIP), 투자 수익률(ROI), 가상자산 수익 계산기.', icon: 'TrendingUp', count: 15 },
  { id: 'retirement', name: '은퇴/파이어', description: '파이어족 은퇴 목표일 계산기, 노후 자산 규모 및 연금 수령금 계산기.', icon: 'Compass', count: 10 },
  { id: 'military', name: '군대/병역', description: '전역일 디데이 계산기, 군인 월급 및 실질 소득 계산기.', icon: 'Shield', count: 8 },
  { id: 'real-estate', name: '부동산', description: '주택담보대출(주담대), DSR/LTV 제한선 설정, 부동산 취득세, 임대수익률 계산기.', icon: 'Home', count: 14 },
  { id: 'health', name: '건강/피트니스', description: '체질량지수(BMI), 기초대사량(BMR), 일일 칼로리 소모량 및 권장 수분 섭취 계산기.', icon: 'HeartPulse', count: 18 },
  { id: 'education', name: '교육/학업', description: '학점(GPA) 변환기, 학자금 대출 이자 상환, 대학 등록금 마련 적금 계산기.', icon: 'GraduationCap', count: 9 },
  { id: 'automobile', name: '자동차', description: '차량 할부 금융, 부품 감가상각, 유류비 및 평균 연비 계산기.', icon: 'Car', count: 11 },
  { id: 'travel', name: '여행/외환', description: '여행 예산 수립, 국가별 팁(Tip) 비율 계산, 일괄 더치페이 및 환율 변환기.', icon: 'Plane', count: 12 },
  { id: 'shopping', name: '쇼핑/소비', description: '할인율, 단위당 가격 비교, 마진 및 최종 결제액 산출 계산기.', icon: 'ShoppingBag', count: 10 },
  { id: 'utility', name: '공과금/에너지', description: '전력량 누진 요금, 가스 및 난방 수단별 효율 체계, 아파트 관리비 계산기.', icon: 'Lightbulb', count: 7 },
  { id: 'business', name: '비즈니스', description: '영업 마진율, 손익분기점(BEP), 고객획득비용(CAC) 및 생애 가치(LTV) 산출.', icon: 'Activity', count: 16 },
  { id: 'math', name: '수학/백분율', description: '퍼센트 비율 계산, 분수 및 소수점 정렬 규칙, 삼각함수 및 단순 방정식.', icon: 'Sigma', count: 20 },
  { id: 'science', name: '기초과학/변환', description: '온도 단위 변환, 물리 기본 정수, 밀도 및 질량 환산 공식.', icon: 'Atom', count: 14 },
  { id: 'construction', name: '시공/인테리어', description: '콘크리트 부피, 면적당 석고보드 및 페인트 수량, 목재 소요량 측정기.', icon: 'Hammer', count: 12 },
  { id: 'date', name: '날짜/시간', description: '기념일 및 디데이 파악, 연령 환산, 영업일 기준 근무일 계산기 및 세계 시간.', icon: 'CalendarDays', count: 10 }
];

const BASE_CALCULATORS: CalculatorSchema[] = [
  // 1. MORTGAGE CALCULATOR
  {
    title: '주택 담보 대출 계산기',
    slug: 'mortgage-calculator',
    category: 'real-estate',
    description: '주택담보대출의 월별 상환액, 대출 금액 대비 원금, 이자 비중을 분석하고 스케줄을 제공합니다.',
    aliases: ['주택 담보 대출', '주차 대출', '부동산 담보 대출', '월별 원리금', '신용 대출', '주택 대출', 'ltv', 'dsr'],
    popular: true,
    trending: true,
    inputs: [
      { id: 'homeValue', label: '주택 가격', type: 'number', defaultValue: 560000000, unit: '원', unitPosition: 'suffix', section: '매물 상세 정보' },
      { id: 'downPayment', label: '선납금 (자기 자산)', type: 'number', defaultValue: 112000000, unit: '원', unitPosition: 'suffix', section: '매물 상세 정보' },
      { id: 'interestRate', label: '연간 고정 금리 (이자율)', type: 'range', defaultValue: 6.5, min: 1, max: 15, step: 0.1, unit: '%', unitPosition: 'suffix', section: '대출 조건' },
      { id: 'loanTerm', label: '대출 만기 기간', type: 'select', defaultValue: 30, options: [{ label: '30년 만기', value: 30 }, { label: '20년 만기', value: 20 }, { label: '15년 만기', value: 15 }, { label: '10년 만기', value: 10 }], section: '대출 조건' },
      { id: 'propertyTax', label: '연간 기준 재산세율', type: 'number', defaultValue: 1.2, unit: '%', unitPosition: 'suffix', section: '세금 및 부가 비용' },
      { id: 'homeInsurance', label: '연간 주택 종합 보험료', type: 'number', defaultValue: 2100000, unit: '원', unitPosition: 'suffix', section: '세금 및 부가 비용' }
    ],
    calculate: (inputs) => {
      const homeValue = Number(inputs.homeValue) || 0;
      const downPayment = Number(inputs.downPayment) || 0;
      const interestRate = Number(inputs.interestRate) || 0;
      const loanTerm = Number(inputs.loanTerm) || 30;
      const pTaxRate = Number(inputs.propertyTax) || 0;
      const homeInsurance = Number(inputs.homeInsurance) || 0;

      const principal = Math.max(0, homeValue - downPayment);
      const monthlyRate = (interestRate / 100) / 12;
      const totalPayments = loanTerm * 12;

      let monthlyPAndI = 0;
      if (monthlyRate > 0) {
        monthlyPAndI = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
      } else {
        monthlyPAndI = principal / totalPayments;
      }

      const monthlyPropertyTax = (homeValue * (pTaxRate / 100)) / 12;
      const monthlyInsurance = homeInsurance / 12;
      const totalMonthlyPayment = monthlyPAndI + monthlyPropertyTax + monthlyInsurance;

      const totalSpentAndInterest = monthlyPAndI * totalPayments;
      const totalInterest = Math.max(0, totalSpentAndInterest - principal);

      const chartData: any[] = [];
      let balance = principal;
      for (let year = 1; year <= loanTerm; year += Math.max(1, Math.floor(loanTerm / 6))) {
        let yearInterest = 0;
        let yearPrincipal = 0;
        for (let m = 0; m < 12; m++) {
          const mInterest = balance * monthlyRate;
          const mPrincipal = monthlyPAndI - mInterest;
          yearInterest += mInterest;
          yearPrincipal += mPrincipal;
          balance = Math.max(0, balance - mPrincipal);
        }
        chartData.push({
          label: `${year}년차`,
          '남은 대출 잔액': Math.round(balance),
          '적립된 누적 상정 원금': Math.round(principal - balance),
          '동기 누적 발생 이자 총량': Math.round((monthlyPAndI * 12 * year) - (principal - balance))
        });
      }

      return {
        results: [
          { label: '총 월 예상 상환금 (원리금+세금+보험료)', value: totalMonthlyPayment, rawValue: totalMonthlyPayment, displayType: 'currency', info: '원리금 상환액에 월 분할 재산세 및 주택 보험료를 합한 전체 상환 비중입니다.' },
          { label: '월 원금 및 이자 상환액 (P&I)', value: monthlyPAndI, rawValue: monthlyPAndI, displayType: 'currency' },
          { label: '월 평균 분할 재산세액', value: monthlyPropertyTax, rawValue: monthlyPropertyTax, displayType: 'currency' },
          { label: '월 주택 신용 보증 보험료', value: monthlyInsurance, rawValue: monthlyInsurance, displayType: 'currency' },
          { label: '순수 금융 대출 원금', value: principal, rawValue: principal, displayType: 'currency' },
          { label: '안전 이자 납부 총액', value: totalInterest, rawValue: totalInterest, displayType: 'currency', info: '대출 상환 만기 동안 금융기관에 전액 지불하는 최종 이율이자 수수료 분입니다.' },
          { label: '총 원리금 및 보조세액 상환 누적액', value: totalSpentAndInterest + (monthlyPropertyTax + monthlyInsurance) * totalPayments, rawValue: totalSpentAndInterest, displayType: 'currency' }
        ],
        chartData,
        customReport: {
          ltv: (principal / homeValue) * 100,
          pmiRequired: (downPayment / homeValue) < 0.20
        }
      };
    },
    seoContent: {
      guide: '당사의 우대 주택 담보 대출 계산기는 주택 매수 자산 조건에 필수적인 원금, 연동 이자, 지방 재산세 및 보증 보험 부담금을 동적 결산하여 지출 균형을 가늠해 봅니다. 선납금 규모 및 금리 격차에 따른 부담 변화를 직시하고 정부 대출 규제선(LTV, DSR) 요건 충족 유무를 즉시 검증할 수 있습니다.',
      formula: '매월 상환액 (원리금균등) = [P * r * (1+r)^n] / [(1+r)^n - 1] (P=대출원금, r=월 이율, n=납입 개월수)',
      tips: [
        '선납금을 최소 매매 가액의 20% 이상 확보하여, 고지율 금융 기관의 불필요한 보증보험료(PMI) 부과액 청구를 원천 면제받는 것이 유리합니다.',
        '10~15년 단기 상환 방식은 우대 금리를 획득할 확률이 크며, 장기 자금 대비 총 누적 이자를 최대 절반 가까이 아낄 수 있습니다.',
        '대출 실행 전에 개인 신용 점수를 충분히 관리해 두면 0.1%p 금리 인하만으로도 수천만 원의 이자 손실을 차단합니다.'
      ],
      faqs: [
        { question: 'LTV(최대부담비율) 기준이란 무엇을 뜻합니까?', answer: '주택 자산 가격 대비 대출 가액 비율로, 일반적으로 가치가 5억 6천만 원인 주택에 4억 4천 8백만 원을 대출 시 LTV는 80%가 됩니다.' },
        { question: 'PITI 비용 구성은 어떤 의미인가요?', answer: '원금(Principal), 이자(Interest), 세금(Taxes), 보험료(Insurance)의 약어로, 매월 나가는 온전한 주거 금융 고정 지출 총계를 뜻합니다.' }
      ]
    },
    relatedSlugs: ['retirement-planner', 'savings-growth-calculator', 'percentage-calculator']
  },

  // 2. COMPOUND INTEREST CALCULATOR
  {
    title: '복리 이자 계산기',
    slug: 'compound-interest-calculator',
    category: 'investment',
    description: '적립식 투입과 중복 복리 성장을 적용하여 시간이 지남에 따라 보유 원리금이 몇 배로 성장하는지 시각 도해해 줍니다.',
    aliases: ['복리', '예적금 이자', '복리 계산', '기하급수 성장', '투자 수익', '이자 이자'],
    popular: true,
    trending: true,
    inputs: [
      { id: 'initialDeposit', label: '초기 적립 예치금', type: 'number', defaultValue: 14000000, unit: '원', unitPosition: 'suffix', section: '초기 자산' },
      { id: 'monthlyContribution', label: '매월 추가 불입 저축금', type: 'number', defaultValue: 700000, unit: '원', unitPosition: 'suffix', section: '정기 불입액' },
      { id: 'years', label: '목표 저축 기간 (연수)', type: 'range', defaultValue: 20, min: 1, max: 50, step: 1, unit: '년', unitPosition: 'suffix', section: '저축 기간' },
      { id: 'interestRate', label: '기대 연 목표 수익률 (이자율)', type: 'range', defaultValue: 8, min: 1, max: 20, step: 0.1, unit: '%', unitPosition: 'suffix', section: '이자 및 수익률' },
      { id: 'frequency', label: '복리 계산 주기 선택', type: 'select', defaultValue: 12, options: [{ label: '연 복리 (매년)', value: 1 }, { label: '분기 복리 (3개월)', value: 4 }, { label: '월 복리 (매월)', value: 12 }, { label: '일 복리 (매일)', value: 365 }], section: '이자 및 수익률' }
    ],
    calculate: (inputs) => {
      const P = Number(inputs.initialDeposit) || 0;
      const PMT = Number(inputs.monthlyContribution) || 0;
      const t = Number(inputs.years) || 1;
      const r = (Number(inputs.interestRate) || 0) / 100;
      const n = Number(inputs.frequency) || 12;

      let totalWealth = P;
      const chartData: any[] = [];
      let totalContributions = P;

      for (let y = 1; y <= t; y++) {
        const fvPr = P * Math.pow(1 + r / n, n * y);
        let fvAn = 0;
        if (PMT > 0) {
          const monthlyRate = r / 12;
          const totalMonths = 12 * y;
          if (monthlyRate > 0) {
            fvAn = PMT * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
          } else {
            fvAn = PMT * totalMonths;
          }
        }

        const yearEndBalance = fvPr + fvAn;
        const yearContributions = P + (PMT * 12 * y);
        const yearInterest = Math.max(0, yearEndBalance - yearContributions);

        chartData.push({
          label: `${y}년차`,
          '원금 납입 누계': Math.round(yearContributions),
          '복리 이자 수익': Math.round(yearInterest),
          '최종 예상 자산': Math.round(yearEndBalance)
        });

        if (y === t) {
          totalWealth = yearEndBalance;
          totalContributions = yearContributions;
        }
      }

      const totalInterest = Math.max(0, totalWealth - totalContributions);

      return {
        results: [
          { label: '미래 가치 (기준 만기 최종 누적액)', value: totalWealth, rawValue: totalWealth, displayType: 'currency', info: '초기 원금과 매월 연동한 저축에 복리가 가미된 최종 종합 자산 규모입니다.' },
          { label: '순수 본인 불입 원금 누계', value: totalContributions, rawValue: totalContributions, displayType: 'currency', info: '순수하게 자기 수중에 투자 투입한 현금 원금입니다.' },
          { label: '복리 실현 순이자 수익', value: totalInterest, rawValue: totalInterest, displayType: 'currency', info: '적금 원금을 넘어서 순수하게 복합 증산된 이자 배가 수익분입니다.' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '복리 계산기는 시간이 자본에 선사하는 강력한 기하 복리적 가치를 여실히 증명합니다. 단순한 정기 적금을 적립하는 데 그치지 않고, 전기 이자가 단번에 모 원금화 되어 계속 반복해 팽창하는 눈덩이 자산 스케줄을 손쉽게 도모해 보세요.',
      formula: '최종 복리 미래가치 = P(1 + r/n)^(nt) + PMT * [((1 + r/12)^(12t) - 1) / (r/12)] (매월 정기 적금 불입 기준)',
      tips: [
        '소액이라도 빨리 투자를 시작해야 합니다. 20대에 시작한 14만 원은 40대에 시작한 동일 원금 대비 만기 시 수 배 이상의 원금 증식을 유인합니다.',
        '복리 빈도 주기가 촘촘할수록(예: 년 이자 배분 대비 일 배분 방식) 눈덩이의 굴림 효율 속도가 미세하지만 좀 더 빠른 확증성을 보여줍니다.',
        '세금 혜택 및 연금 계좌의 과세이연 효과를 결함하면 도중 소모되는 세이프 마진을 극도로 보존하여 복리를 극대화시킵니다.'
      ],
      faqs: [
        { question: '72의 직관 법칙이 무엇인가요?', answer: '수학적으로 복리 저축 금액이 정확히 2배 원금액으로 불어나는 지점의 햇수를 구하는 간이공식으로, 72를 목표 연수익률로 나눈 값입니다 (예: 연 8% 수익률 시 약 9년 소요).' },
        { question: '단리와 복리는 어떤 차이가 있습니까?', answer: '단리는 원금 원천에만 매기지만 복리는 주원금에 이전 기수까지 도출된 총 누적 발생 이자분까지 모두 더해 가중 복리를 적용 연산합니다.' }
      ]
    },
    relatedSlugs: ['retirement-planner', 'savings-growth-calculator', 'dividend-calculator']
  },

  // 3. RETIREMENT PLANNER / FIRE CALCULATOR
  {
    title: '은퇴 및 파이어족 경제적 자립 계산기',
    slug: 'retirement-planner',
    category: 'retirement',
    description: '희망 은퇴 비용과 안전 인출 규칙(SWR)을 결합하여, 경제적 조기 자유에 도달하는 필수 목표 자산 목표액을 추산합니다.',
    aliases: ['은퇴설계', '파이어족', '조기은퇴', '노후 자산', '은퇴 목표 자산', '은퇴자금', '연금'],
    popular: true,
    trending: true,
    inputs: [
      { id: 'age', label: '현재 생물학적 나이', type: 'number', defaultValue: 30, unit: '세', unitPosition: 'suffix', section: '사용자 통계 데이터' },
      { id: 'targetNetWorth', label: '은퇴 직후 연간 희망 생활비', type: 'number', defaultValue: 84000000, unit: '원', unitPosition: 'suffix', section: '은퇴 연령 및 예산' },
      { id: 'safeWithdrawalRate', label: '포트폴리오 안전 인출률 (SWR)', type: 'range', defaultValue: 4, min: 2, max: 6, step: 0.1, unit: '%', unitPosition: 'suffix', section: '은퇴 연령 및 예산' },
      { id: 'currentNetWorth', label: '현재 가용 저축 및 실투자 자산액', type: 'number', defaultValue: 70000000, unit: '원', unitPosition: 'suffix', section: '자산 보존 상태' },
      { id: 'annualSavings', label: '연간 경제활동 순 저축 추가액', type: 'number', defaultValue: 33600000, unit: '원', unitPosition: 'suffix', section: '자산 보존 상태' },
      { id: 'expectedGrowth', label: '예상 투자 실질 수익률 (인플레 차감)', type: 'range', defaultValue: 7, min: 2, max: 12, step: 0.5, unit: '%', unitPosition: 'suffix', section: '기대 금융 성과' }
    ],
    calculate: (inputs) => {
      const age = Number(inputs.age) || 30;
      const annualExpenses = Number(inputs.targetNetWorth) || 60000;
      const swr = Number(inputs.safeWithdrawalRate) || 4;
      const currentNW = Number(inputs.currentNetWorth) || 0;
      const savings = Number(inputs.annualSavings) || 0;
      const growth = (Number(inputs.expectedGrowth) || 7) / 100;

      const fireNumber = annualExpenses / (swr / 100);

      let yearsToRetire = 0;
      let targetMet = false;
      let projectedNW = currentNW;
      const chartData: any[] = [];

      for (let y = 0; y <= 50; y++) {
        chartData.push({
          label: `만 ${age + y}세`,
          '예상 누적 자산': Math.round(projectedNW),
          '파이어족 달성 목표선': Math.round(fireNumber)
        });

        if (projectedNW >= fireNumber && !targetMet) {
          yearsToRetire = y;
          targetMet = true;
        }

        projectedNW = (projectedNW * (1 + growth)) + savings;
      }

      if (!targetMet) {
        yearsToRetire = 50;
      }

      const retireAge = age + yearsToRetire;

      return {
        results: [
          { label: '파이어족 도달 조기은퇴 은퇴자금 목표량', value: fireNumber, rawValue: fireNumber, displayType: 'currency', info: '근로 소득을 종료해도 노후 평생 안전성을 보장하기 위한 최소 자산 목적세 세팅값입니다.' },
          { label: '완전 은퇴 및 자립까지 남은 기간', value: targetMet ? `${yearsToRetire}년` : '50년 이상 장기 분석 요망', rawValue: yearsToRetire, displayType: 'text' },
          { label: '자립 도달 시 예상 만 연령', value: targetMet ? `${retireAge}세` : '80세 이후 완비 수렴', rawValue: retireAge, displayType: 'text' },
          { label: '은퇴 자산 연동 월 평균 비근로 패시브 연금', value: (fireNumber * (swr / 100)) / 12, rawValue: (fireNumber * (swr / 100)) / 12, displayType: 'currency' }
        ],
        chartData,
        customReport: {
          savingsRate: (savings / (savings + annualExpenses)) * 100
        }
      };
    },
    seoContent: {
      guide: '파이어족 연금 설계기는 생활 규모 및 연도 단위 배정 총 예산을 확인해 얼마만큼의 현금 파이프라인 자본을 형성해야 직장 근무를 편안히 중단하고 비근로 조기 은퇴를 선언할 수 있는지 맞춤 판별해 드립니다. 자산 가치 유지가 소비 지수 25배를 수용하면 은퇴 포트폴리오의 영속성을 장기 증명한다는 트리니티 칼리지 법칙에 입각해 기획되었습니다.',
      formula: '은퇴 은퇴자금 목표량 = 연간 생활비 / 안전 인출률 (SWR %). 통상 4% 규칙 하에서는 연 지출 비용의 25배를 세팅합니다.',
      tips: [
        '은퇴 자산 규모를 소형화하려면 무엇보다 비생산적인 인플레이션 소비 습관을 정돈하십시오. 연간 기성 생활 유지비를 줄이는 것만으로도 필요한 영순위 타겟 액수가 25배만큼 즉시 압감됩니다.',
        '투자 성장률 전망에는 보수적인 물가 상승 수치를 충분히 실질 선제 반영하여 세후 자산의 왜곡율을 제어해야 지치지 않습니다.',
        '조기 은퇴 후에도 취미 활동형 추가 현금 수입(프리랜서, 임대 등)을 최소화 형태로 유지하는 것은 자산 존속력을 배가 보장합니다.'
      ],
      faqs: [
        { question: '트리니티 안전 인출 연구란 무엇인가요?', answer: '주식과 채권 포트폴리오 자산에서 연 4%의 물가 반영 자금을 인출해도, 30개년 이상 고갈되지 않는 최적 안정을 역사적 실증한 텍사스 주립 은퇴 자산 실험 논문입니다.' },
        { question: '린 파이어(Lean) vs 팻 파이어(Fat)의 지향점 차이가 있습니까?', answer: '린 파이어는 극단적으로 최소화 사일로 지출(<연 5천 6백만 원 유지)을 기반으로 압축 은퇴를 도모하며, 팻 파이어는 다각도 고급 레저 향유 및 넉넉한 비용 규모(>연 1억 4천만 원 타겟)의 풍요한 자립 목적을 구축합니다.' }
      ]
    },
    relatedSlugs: ['compound-interest-calculator', 'net-salary-calculator', 'rent-vs-buy-calculator']
  },

  // 4. NET SALARY CALCULATOR
  {
    title: '실수령액 및 실수령 월급 계산기',
    slug: 'net-salary-calculator',
    category: 'salary',
    description: '연 급여 기준 및 보너스 소득, 과세 예외 부양 조건을 반영하여 사회보험료와 연소청 세금을 뺀 정확한 주간/월간 네트 실수령액을 환산합니다.',
    aliases: ['실수령액', '월급 계산', '연봉 실수령', '세금 공제', '4대보험', '시급 환산', '근로소득세'],
    popular: true,
    trending: false,
    inputs: [
      { id: 'grossIncome', label: '세전 연봉 (기본급 연차수당 포함)', type: 'number', defaultValue: 119000000, unit: '원', unitPosition: 'suffix', section: '기본 급여 정보' },
      { id: 'filingStatus', label: '가구 인적 공제 방식', type: 'select', defaultValue: 'single', options: [{ label: '단독 가구(독립 세대)', value: 'single' }, { label: '부부 합산 세대 구성 (배우자 포함)', value: 'joint' }], section: '공제 신청 여건' },
      { id: 'stateTaxRate', label: '소득 지역 지방 세액 공제율 (안내 주민세 포함)', type: 'range', defaultValue: 4.5, min: 0, max: 13, step: 0.1, unit: '%', unitPosition: 'suffix', section: '원천 세율 기준' },
      { id: 'preTaxDeductions', label: '연간 세전 선공제액 (퇴직 적금, 청약 401k 등)', type: 'number', defaultValue: 8400000, unit: '원', unitPosition: 'suffix', section: '주요 비과세 및 선공제' }
    ],
    calculate: (inputs) => {
      const gross = Number(inputs.grossIncome) || 0;
      const status = inputs.filingStatus || 'single';
      const stateRate = (Number(inputs.stateTaxRate) || 0) / 100;
      const preTax = Number(inputs.preTaxDeductions) || 0;

      const taxableIncome = Math.max(0, gross - preTax);

      const standardDeduction = status === 'single' ? 15000 : 30000;
      const adjTaxableIncome = Math.max(0, taxableIncome - standardDeduction);

      let fedTax = 0;
      if (status === 'single') {
        if (adjTaxableIncome <= 11600) fedTax = adjTaxableIncome * 0.10;
        else if (adjTaxableIncome <= 47150) fedTax = 1160 + (adjTaxableIncome - 11600) * 0.12;
        else if (adjTaxableIncome <= 100525) fedTax = 5426 + (adjTaxableIncome - 47150) * 0.22;
        else fedTax = 17168 + (adjTaxableIncome - 100525) * 0.24;
      } else {
        if (adjTaxableIncome <= 23200) fedTax = adjTaxableIncome * 0.10;
        else if (adjTaxableIncome <= 94300) fedTax = 2320 + (adjTaxableIncome - 23200) * 0.12;
        else fedTax = 10852 + (adjTaxableIncome - 94300) * 0.22;
      }

      const socSec = Math.min(gross, 168600) * 0.062;
      const medicare = gross * 0.0145;
      const ficaTax = socSec + medicare;

      const stateTax = taxableIncome * stateRate;
      const totalTaxes = fedTax + ficaTax + stateTax;
      const netSalary = Math.max(0, gross - totalTaxes - preTax);

      const chartData = [
        { name: '세후 실수령 본인 저축액', value: Math.round(netSalary) },
        { name: '원천지 소득세 (국세)', value: Math.round(fedTax) },
        { name: '4대 사회보험공제액 등 (FICA)', value: Math.round(ficaTax) },
        { name: '관할 지방세금 추정액', value: Math.round(stateTax) },
        { name: '세전 자기적금 저축액', value: Math.round(preTax) }
      ];

      return {
        results: [
          { label: '세후 최종 연간 실수령 종합 잔액', value: netSalary, rawValue: netSalary, displayType: 'currency', info: '의무 세금 및 사회보장기금을 전부 원천 제한 후, 자신의 실제 계좌에 다이렉트 입금되는 총연봉 순수 수령액입니다.' },
          { label: '월 평균 실수령 평달 지급액', value: netSalary / 12, rawValue: netSalary / 12, displayType: 'currency' },
          { label: '비 자율 의무 총 차감 공정 세액', value: totalTaxes, rawValue: totalTaxes, displayType: 'currency' },
          { label: '국가 소득 선 세무 차감액', value: fedTax, rawValue: fedTax, displayType: 'currency' },
          { label: '사회 기여 건강/연금 보장 부담비', value: ficaTax, rawValue: ficaTax, displayType: 'currency' },
          { label: '지방자치단체 주민 세액 납부분', value: stateTax, rawValue: stateTax, displayType: 'currency' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '본 연 급여 및 과세 시뮬레이터는 최신 지방 원천 세율 양식과 표준 인적 공제 기준을 연계 연산하여, 정기 급여 상환 명세서를 한눈에 예측하게 돕습니다. 여러 직장의 연봉 조건 조율 및 신규 채용 계약 체결 단계에 최고의 가시적 세후 지표를 얻을 수 있습니다.',
      formula: '세후 연봉 실수령액 = 세전 연 Gross총액 - (소득세 기준 차단세 구역 + FICA 연금보험안전 보장 + 주도 자산세) - 임의 선 세전 적립액',
      tips: [
        '소득 소모 공제를 촉진하기 위해 허대 적립식 연금 한도 및 절세 자조 기금 등에 선 배치 투입을 늘리는 것이 오히려 근소세를 내리고 자산 적치율은 비약적으로 향상시킵니다.',
        '인적 기본 공제 산정 기준(배우자, 부양 연로 조부모 등)에 맞춰 연말정산 누진 축소를 노리기 위한 필요 소득 요건 정보를 매치해 보세요.',
        '부부 공동 연말 자산 신고 시 합산 과세 범위와 누진 한도 격차를 조율하여 연 원천세를 가장 알맞은 선으로 수렴시킬 수 있습니다.'
      ],
      faqs: [
        { question: '국민 원천징수 근로 소득세율 산정의 등급 기준은 어찌 됩니까?', answer: '개인 소득 수준별로 가파른 누진 부과율이 적용됩니다. 소득 금액이 클수록 고율의 세율 구간에 연동 납부하게 됩니다.' },
        { question: '실제 주택 수령 통장의 월 가치와 약간 오차가 발생하는 원인은 무엇입니까?', answer: '직종 요인에 의해 전용 건강 보조 보험 특별 부과금 및 각종 기업 복지 연계 상환 요율 부담 등 특수 세부 내역이 추가 작용하기 때문입니다.' }
      ]
    },
    relatedSlugs: ['retirement-planner', 'hourly-to-salary-calculator', 'compound-interest-calculator']
  },

  // 5. BMI (BODY MASS INDEX) CALCULATOR
  {
    title: '체질량 지수 (BMI) 계산기',
    slug: 'bmi-calculator',
    category: 'health',
    description: '키와 몸무게의 물리 배치를 연계 분석하여 자신이 저체중, 정상, 과체중, 혹은 비만 구간에 해당하는지 표준 의학 지표로 환산 대조합니다.',
    aliases: ['체질량지수', '비만도', '체중 분석', '체지방율', '신체 질량', '다이어트', '과체중'],
    popular: true,
    trending: true,
    inputs: [
      { id: 'system', label: '단위 기준 선택', type: 'select', defaultValue: 'metric', options: [{ label: '미터법 (kg, cm)', value: 'metric' }, { label: '야드파운드법 (lbs, ft/in)', value: 'imperial' }], section: '단위 체계' },
      { id: 'weightLbs', label: '몸무게 (파운드 단위)', type: 'number', defaultValue: 160, unit: 'lbs', unitPosition: 'suffix', section: '체중 측정값 입력' },
      { id: 'heightFt', label: '신장 (피트)', type: 'number', defaultValue: 5, unit: 'ft', unitPosition: 'suffix', section: '신장 측정값 입력' },
      { id: 'heightIn', label: '신장 (인치)', type: 'number', defaultValue: 9, unit: 'in', unitPosition: 'suffix', section: '신장 측정값 입력' },
      { id: 'weightKg', label: '몸무게 (킬로그램 단위)', type: 'number', defaultValue: 72, unit: 'kg', unitPosition: 'suffix', section: '체중 측정값 입력' },
      { id: 'heightCm', label: '신장 (센티미터 단위)', type: 'number', defaultValue: 175, unit: 'cm', unitPosition: 'suffix', section: '신장 측정값 입력' }
    ],
    calculate: (inputs) => {
      const isMet = inputs.system === 'metric';
      let bmi = 0;

      if (isMet) {
        const kg = Number(inputs.weightKg) || 0;
        const cm = Number(inputs.heightCm) || 1;
        const meters = cm / 100;
        bmi = kg / (meters * meters);
      } else {
        const lbs = Number(inputs.weightLbs) || 0;
        const ft = Number(inputs.heightFt) || 0;
        const inches = Number(inputs.heightIn) || 0;
        const totalInches = (ft * 12) + inches;
        if (totalInches > 0) {
          bmi = (lbs / (totalInches * totalInches)) * 703;
        }
      }

      let status = '정상';
      let code = 'normal';
      let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
      if (bmi < 18.5) {
        status = '저체중';
        code = 'under';
        badgeColor = 'bg-blue-100 text-blue-800 border-blue-200';
      } else if (bmi < 25) {
        status = '정상 체중';
        code = 'normal';
        badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
      } else if (bmi < 30) {
        status = '과체중';
        code = 'over';
        badgeColor = 'bg-yellow-100 text-yellow-850 border-yellow-200';
      } else {
        status = '비만';
        code = 'obese';
        badgeColor = 'bg-rose-100 text-rose-800 border-rose-200';
      }

      const chartData = [
        { label: '저체중', minVal: 0, maxVal: 18.5 },
        { label: '정상체중', minVal: 18.5, maxVal: 25 },
        { label: '과체중', minVal: 25, maxVal: 30 },
        { label: '비만', minVal: 30, maxVal: 45 }
      ];

      return {
        results: [
          { label: '나의 산출 체질량 (BMI) 지수', value: bmi.toFixed(1), rawValue: bmi, displayType: 'number', info: '자신의 체중을 신장 표면적 기량율로 나눈 보편적 건강 평가 수치 표기입니다.' },
          { label: '신체 최종 종합 비만 등급', value: status, rawValue: 0, displayType: 'badge', badgeColor: badgeColor, info: '표준 의학 수용치 가이드라인에 대조하여 판별한 본인의 현재 체형 분석 범위입니다.' }
        ],
        chartData,
        customReport: {
          currentBmi: bmi,
          statusCode: code
        }
      };
    },
    seoContent: {
      guide: '체질량 지수(BMI)는 키 대비 체중의 간결한 비중 조합 공식으로, 전 세계 의료진과 보조 기관이 표준 비만도 등급을 검증하기 위한 기준 도구로 통용합니다. 매우 유용하고 계량 가능한 기준을 마련해 주지만, 강철 골격이나 근소 근육량이 유난히 축적된 바디빌더의 경우 단순 과체중 오류 판별로 연동될 수 있습니다.',
      formula: 'BMI = 무게 (kg) / 신장 (m)^2, 혹은 무게 (lbs) / 신장 (inch)^2 * 703',
      tips: [
        '체내 근육 축적이 가미되어 단순 몸무게가 나갈 시에는 BMI 과체중 편향에 연연하지 마시고 전용 체성분 지표(체지방률, 인바디 등)를 병행 대조하십시오.',
        '내장 비만도를 세심히 살펴 혈관 건강 불협화음을 방비하기 위해 반드시 복부 전용 허리둘레 측정도 체크하는 것이 더 현명합니다.',
        '식이섬유가 풍부한 건강한 소식 위주의 식단 조율과 주중 유산소 걷기 만보 활동을 가미하여 심폐 마진을 영속 유지해 나가세요.'
      ],
      faqs: [
        { question: '가장 이상적인 영순위 BMI 표준 범위는 어디입니까?', answer: '보편적 성인 통계 기준 18.5 이상 24.9 이하 공간을 최적의 건강 영역 지대로 지정합니다.' },
        { question: '소아 유아 및 청소년에게도 동일 BMI 기준을 적용할 수 있나요?', answer: '성장기 어린이의 경우 연령 및 성별 백분위수 성장 도표 차트를 참조하는 복합 척도가 요구됩니다.' }
      ]
    },
    relatedSlugs: ['bmr-calculator', 'percentage-calculator']
  },

  // 6. MILITARY DISCHARGE / D-DAY COUNTDOWN
  {
    title: '전역일 계산기 및 군 생활 D-Day',
    slug: 'military-discharge-calculator',
    category: 'military',
    description: '입영일과 예정 전역일을 기록하고 군대 복무 만료 및 소집해제까지 남은 일수, 군인 연봉 일일 가치를 초고속 연산합니다.',
    aliases: ['전역일', '군인 전역', '소집해제', 'dday', '남은 날짜', '복무일', '군대 시계', '의무경찰', '사회복무'],
    popular: false,
    trending: true,
    inputs: [
      { id: 'dischargeDate', label: '전역 예정 및 소집해제 목표 일정', type: 'date', defaultValue: '2027-12-31', section: '복무 관련 일정 설정' },
      { id: 'terminalLeave', label: '잔여 누적 정기 및 포상 휴가 일수', type: 'number', defaultValue: 30, unit: '일', unitPosition: 'suffix', section: '복무 관련 일정 설정' },
      { id: 'branch', label: '소속 군 사격/복무종류', type: 'select', defaultValue: 'army', options: [{ label: '육군 / 해병대 / 의경 (18개월 기준)', value: 'army' }, { label: '해군 / 해양경찰 (20개월 기준)', value: 'navy' }, { label: '공군 (21개월 기준)', value: 'airforce' }, { label: '사회복무요원 (21개월 기준)', value: 'marines' }, { label: '전문연구 및 대체 의무요원 (더 넓은 기준)', value: 'coastguard' }], section: '복무 분야 구분' }
    ],
    calculate: (inputs) => {
      const now = new Date('2026-06-15T00:00:00');
      const ets = new Date(inputs.dischargeDate || '2027-12-31');
      const terminalDays = Number(inputs.terminalLeave) || 0;

      const totalDiffMs = ets.getTime() - now.getTime();
      const rawDays = totalDiffMs / (1000 * 60 * 60 * 24);
      const daysLeft = Math.max(0, Math.ceil(rawDays));

      const activeDutyDaysLeft = Math.max(0, daysLeft - terminalDays);
      const percentCommited = Math.max(0, Math.min(100, (1 - (daysLeft / 540)) * 100)); // normalized to 18 months standard (540 days)

      return {
        results: [
          { label: '전역 시점 / 소집해제일 D-Day', value: daysLeft, rawValue: daysLeft, displayType: 'duration', info: '공식 복무 만료 예정 귀가일까지 남은 잔여 실제 달력 일자입니다.' },
          { label: '최종 복무 탈출 출발일 잔여 시간 (휴가 차감)', value: activeDutyDaysLeft, rawValue: activeDutyDaysLeft, displayType: 'number', info: '잔여 휴가를 소급 적용하여 실 복무지 복무를 탈출하고 부대를 영구 출발하는 실 근무 완료 남은 날짜입니다.' },
          { label: '기동된 총 복무 경과 진행율 (퍼센트)', value: `${percentCommited.toFixed(1)}%`, rawValue: percentCommited, displayType: 'text' }
        ],
        customReport: {
          weeks: (daysLeft / 7).toFixed(1),
          months: (daysLeft / 30.4).toFixed(1)
        }
      };
    },
    seoContent: {
      guide: '본 군 장병 전역 수량 계산기는 소집해제 및 휴가 일정을 역산하여 복무 일정을 산정해 봅니다. 국방 의무의 사기 진작 및 전역 후 민간 진로 조력 정비 자금을 계획하는 핵심 D-Day 지표로 작동합니다.',
      formula: '복무 D-Day = (목표 전역 예정 기준 연월일 - 현재 일시) 날짜 차감 스케줄',
      tips: [
        '전역 예정일 최소 6개월 전에 고용노동부 청년 미래 자산 연계 제도 및 자립 마주 드림 장병 적금 가입 만기를 반드시 확인하고 수령 신청 서류를 준비해 두십시오.',
        '취업 장병 혜택 및 군 직무 연계 학점 연동 취득 조건을 알아보고 군 복무 공백 마진을 적극적으로 수용하세요.',
        '전역 후 사회 진입 전 생활 소요 예산을 미리 수립해 두면 예비군 편성 기점 자립 성취가 더 수월해집니다.'
      ],
      faqs: [
        { question: '터미널(Terminal Leave) 휴가 처리는 어떻게 작동하나요?', answer: '남아서 소모되지 않은 가용 정기 유급 휴가를 전역 예정일 바로 앞에 주르륵 배치하여, 부대 영외로 조기 복귀 출발하는 직권 휴가 활용 방식입니다.' },
        { question: 'ETS 날짜란 무엇을 뜻합니까?', answer: '복무 기한 만료(Expiration of Term of Service)의 영문 약자로 군에서의 정식 소집해제 예정일을 기칭합니다.' }
      ]
    },
    relatedSlugs: ['date-difference-calculator', 'net-salary-calculator', 'hourly-to-salary-calculator']
  },

  // 7. HOURLY TO ANNUAL SALARY CONVERTER
  {
    title: '시급 연봉 단위계 환산기',
    slug: 'hourly-to-salary-calculator',
    category: 'salary',
    description: '적용 시급과 주당 총 노동 시간을 기반으로 하루 일당, 주급, 주휴수당 예측 및 최적 연봉 Gross 가치를 산정해 줍니다.',
    aliases: ['시급 계산', '연봉 환산', '시급 연봉', '월급 변환', '시급 주급', '최저임금', '알바비'],
    popular: true,
    trending: false,
    inputs: [
      { id: 'hourlyRate', label: '나의 현재 적용 시급', type: 'number', defaultValue: 35000, unit: '원', unitPosition: 'suffix', section: '요율 기준 설정' },
      { id: 'hoursPerWeek', label: '주당 평균 실제 노동 시간 조건', type: 'range', defaultValue: 40, min: 1, max: 80, step: 1, unit: '시간', unitPosition: 'suffix', section: '요율 기준 설정' },
      { id: 'paidWeeks', label: '연간 유급 보상 저축 주수 (기본 1년)', type: 'number', defaultValue: 52, unit: '주', unitPosition: 'suffix', section: '시간 요건 세약' }
    ],
    calculate: (inputs) => {
      const rate = Number(inputs.hourlyRate) || 0;
      const hours = Number(inputs.hoursPerWeek) || 0;
      const weeks = Number(inputs.paidWeeks) || 52;

      const weekly = rate * hours;
      const biweekly = weekly * 2;
      const annualGross = weekly * weeks;
      const monthlyGross = annualGross / 12;
      const daily = rate * (hours / 5);

      return {
        results: [
          { label: '연간 상당 환산 세전 총액 (Gross)', value: annualGross, rawValue: annualGross, displayType: 'currency', info: '정해진 주당 근무에 법정 연수(52주)를 연속해 적용해 산출한 주된 세전 연 자산액입니다.' },
          { label: '월 평균 환산 세전 상당 소득', value: monthlyGross, rawValue: monthlyGross, displayType: 'currency' },
          { label: '격주 수령 세전 paycheck 비중 (2주에 한 번)', value: biweekly, rawValue: biweekly, displayType: 'currency' },
          { label: '순수 세전 주급 환산액', value: weekly, rawValue: weekly, displayType: 'currency' },
          { label: '하루 평균 실 평달 일당 (주 5일 환산 기준)', value: daily, rawValue: daily, displayType: 'currency' }
        ]
      };
    },
    seoContent: {
      guide: '시급 체계를 연봉 자본 가치로 변환하면 직관적인 비교 소득을 판별해 줍니다. 특히 주 근로 시간의 등락이나 프리랜서 업무 계약 시 표준 40시간 회사원 직군의 급여 조건과 비교 대조할 수 있어 아주 탁월합니다.',
      formula: '연봉 총 환산액 = 지정 시급 * 주간 실 일 노동 시간 (통상 40시간) * 1년 유급 주수 (기본 52주)',
      tips: [
        '프리랜서 및 단기 임시 직군(3.3% 원천세 혹은 개인 사업자)은 회사 지원 4대 보험 분담 및 주휴 수수료 보너스 손실액을 고려하여, 일반 회사 임금 대비 약 15~20% 더 높은 시급 요율을 주장하는 것이 논리적입니다.',
        '쉽고 빠른 환산 비결로 시급 요율값에 2,000배를 곱하면, 주 40시간 근무 직원의 대략적인 연봉 총액 규모와 가깝게 수렴합니다 (예: 4만 원 시급 시 연봉 1억 1,200만 원 상당).',
        '법정 야간 및 휴일 추가 가산 수당 가중치를 확인해 연평균 불입 연산에 직접 대조 적용해 보세요.'
      ],
      faqs: [
        { question: '국가별 주간 표준 법정 노동 최대 시간은 몇 시간입니까?', answer: '한국 및 다수의 OECD 보편 국가는 주 40시간을 표준 정규 전타임 노동 제약 기준으로 설정하며, 이후 초과 근무에 보상을 부과합니다.' }
      ]
    },
    relatedSlugs: ['net-salary-calculator', 'retirement-planner', 'percentage-calculator']
  },

  // 8. BMR (BASAL METABOLIC RATE) CALCULATOR
  {
    title: '기초대사량 (BMR) 및 활동 대사량 계산기',
    slug: 'bmr-calculator',
    category: 'health',
    description: '나이, 키, 몸무게, 활동 수준을 연동하여 자신이 생명을 보존하기 위해 하루 소모하는 기초 대사 에너지량(BMR)과 TDEE를 측정합니다.',
    aliases: ['기초대사량', 'bmr', '칼로리 소모량', '대사 활동', '하루 권장 칼로리', '식단', '피트니스', 'tdee'],
    popular: false,
    trending: true,
    inputs: [
      { id: 'gender', label: '생물학적 성별 구분', type: 'select', defaultValue: 'male', options: [{ label: '남성 (Male)', value: 'male' }, { label: '여성 (Female)', value: 'female' }], section: '기본 생리 지표' },
      { id: 'age', label: '나이 (세 기준 동일 값)', type: 'number', defaultValue: 28, unit: '세', unitPosition: 'suffix', section: '기본 생리 지표' },
      { id: 'weightKg', label: '몸무게 (킬로그램)', type: 'number', defaultValue: 75, unit: 'kg', unitPosition: 'suffix', section: '실 체중 정보' },
      { id: 'heightCm', label: '신장 (센티미터)', type: 'number', defaultValue: 178, unit: 'cm', unitPosition: 'suffix', section: '실 신장 정보' }
    ],
    calculate: (inputs) => {
      const gender = inputs.gender || 'male';
      const age = Number(inputs.age) || 28;
      const weight = Number(inputs.weightKg) || 75;
      const height = Number(inputs.heightCm) || 178;

      let bmr = 0;
      if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }

      return {
        results: [
          { label: '나의 순수 기초 대사량 (BMR)', value: Math.round(bmr), rawValue: bmr, displayType: 'number', info: '외부 행동이나 활동을 개입하지 않고 온전히 장기를 돌리고 숨만 쉴 때 하루 쓰이는 순수 생물학적 생존 칼로리입니다.' },
          { label: '비활동 좌식 일상 권장 총 에너지 (Baseline TDEE)', value: Math.round(bmr * 1.2), rawValue: bmr * 1.2, displayType: 'number', info: '최소 수준의 실내 주차 및 활동 일상을 감안한 최저 필요 생체 에너지 수준입니다.' },
          { label: '보통 정도 정기 주간 활동 TDEE 칼로리', value: Math.round(bmr * 1.55), rawValue: bmr * 1.55, displayType: 'number', info: '주 3~5회 적정 피트니스 운동 습관을 가미할 시의 실제 일평균 연소 추이에 해당합니다.' }
        ]
      };
    },
    seoContent: {
      guide: '기초 대사량(BMR)은 두뇌 활동과 호흡 및 장기들이 스스로 기능 보존을 유인하고자 강제 연소시키는 일 순수 열량 규격입니다. 여기에 자신의 신체 생활 지수 및 소모율을 가산하여 다이어트 맞춤 하루 권장 칼로리인 TDEE를 설계합니다.',
      formula: '해리스-베네딕트 개정식 (남성: 88.362 + 13.397*kg + 4.799*cm - 5.677*나이; 여성: 447.593 + 9.247*kg + 3.098*cm - 4.330*나이)',
      tips: [
        '체내 단백질 섭취를 확정하여 골격 기저 근육을 배가 증가시켜야만 가만히 쉬어도 원천 대사 소실 칼로리인 BMR 자체가 항구적으로 확대됩니다.',
        '체중 감량을 도모한다고 해서 본인의 기초 BMR 이하로 극도로 굶는 저칼로리 초소식 식단을 유지하면 몸의 보호 요건이 발동하고 요요가 가속화됩니다.'
      ],
      faqs: [
        { question: 'BMR과 TDEE 수치의 차이점은 무엇인가요?', answer: 'BMR은 가만히 고정 누워만 있어도 나가는 한계 기초 열량이고, TDEE는 평소 일어서고 걷고 움직이고 트레이닝하는 활동 소실이 모두 합산된 완주 권장 총 열량입니다.' }
      ]
    },
    relatedSlugs: ['bmi-calculator', 'percentage-calculator']
  },

  // 9. RE-INVESTMENT DIVIDEND CALCULATOR
  {
    title: '배당금 재투자 및 DRIP 적립식 투자 계산기',
    slug: 'dividend-calculator',
    category: 'investment',
    description: '원천 평가 가치 상승과 배당금 수령 분할을 자동 전액 재불입(DRIP)하는 경우, 장기 주식 포트폴리오의 배당금 눈덩이 성장 예측을 확인합니다.',
    aliases: ['배당금', '배당 재투자', 'drip', '배당복리', '미국주식 배당', '배당 소득', '배당금 복리', '배당수익률'],
    popular: false,
    trending: false,
    inputs: [
      { id: 'principal', label: '주식 초기 배정 매수 원금', type: 'number', defaultValue: 21000000, unit: '원', unitPosition: 'suffix', section: '자산 기본 설정' },
      { id: 'dividendYield', label: '연 기대 주당 기본 배당 수익률 %', type: 'range', defaultValue: 4.2, min: 1, max: 15, step: 0.1, unit: '%', unitPosition: 'suffix', section: '배당 세부 요건' },
      { id: 'annualChange', label: '기대 장기 연간 주가 비례 가치 향상율 % (주가 성장률)', type: 'range', defaultValue: 6, min: -2, max: 15, step: 0.5, unit: '%', unitPosition: 'suffix', section: '주가 및 성장 전망' },
      { id: 'years', label: '자산 보유 holding 유지 년차', type: 'range', defaultValue: 20, min: 1, max: 40, step: 1, unit: '년', unitPosition: 'suffix', section: '보유 연수' },
      { id: 'annualAddition', label: '매년 추가 조달 불입 외화 저축 투자액', type: 'number', defaultValue: 4200000, unit: '원', unitPosition: 'suffix', section: '주가 및 성장 전망' }
    ],
    calculate: (inputs) => {
      const p = Number(inputs.principal) || 0;
      const yieldPct = (Number(inputs.dividendYield) || 0) / 100;
      const growthPct = (Number(inputs.annualChange) || 0) / 100;
      const t = Number(inputs.years) || 1;
      const add = Number(inputs.annualAddition) || 0;

      let balance = p;
      let totalDividendsEarned = 0;
      const chartData: any[] = [];

      for (let y = 1; y <= t; y++) {
        balance += add;
        const priceInc = balance * growthPct;
        const divPayout = balance * yieldPct;

        balance += priceInc + divPayout;
        totalDividendsEarned += divPayout;

        chartData.push({
          label: `${y}년차`,
          '총 예상 잔고액': Math.round(balance),
          '재투자된 누적 배당금': Math.round(totalDividendsEarned)
        });
      }

      return {
        results: [
          { label: '만기 기준 최종 누적 투자 포트폴리오 자산 가치', value: balance, rawValue: balance, displayType: 'currency', info: '장기 자산 변동율에 지급 배당금을 자동 재매수 복리로 가세한 최종 가치 규모입니다.' },
          { label: '재투자 수령 누계 배당 평액 합산', value: totalDividendsEarned, rawValue: totalDividendsEarned, displayType: 'currency', info: '투자 기간 도출되어 고스란히 추가 우량 주식을 확보하는 주차 용도로 환원된 누적 배당 소득액입니다.' },
          { label: '최종 만점 연도 예상 월별 세전 연금식 배당 소득', value: (balance * yieldPct) / 12, rawValue: (balance * yieldPct) / 12, displayType: 'currency' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '배당 복리 DRIP 설계기는 주주 중심 배정 소득 효율을 비약적으로 가속하는 배당주 실질 환류 플랜입니다. 매기 도출되는 배당금 현찰을 유흥에 사용하지 않고 즉각 단수 fractional 주식을 사 모으는 방식으로 재배치하면 연평균 자산 배가 속도가 강력해집니다.',
      formula: '연 단위 순환 시뮬레이션 = (기존 자본 + 연간 정기 투자액) * (1 + 주가 성장율 + 주당 배당수익률 %)',
      tips: [
        '세금 누수가 큰 일반 계좌 대신 연금 저축 계좌(IRAs)를 적용해 배당 소득세 과세 이연 보정을 획득하면 연 복리 효율을 극도로 극대화할 수 있습니다.',
        '지나치게 고율의 비현실적 배당 수익률(10% 이상)은 향후 배당 취소 및 주가 원금 폭락으로 이어지는 구조적 배당 한계 부실 위기일 수 있으니 안전 우량주 위주로 배분하십시오.'
      ],
      faqs: [
        { question: 'DRIP 자동 배당 재투자가 무엇인가요?', answer: 'Dividend Reinvestment Plan의 연동 약칭으로, 배당이 들어온 즉시 수수료 가중 없이 단 0.1주의 비중이라도 자동 재구매하게 매수 유린하는 금융 편의 기능입니다.' }
      ]
    },
    relatedSlugs: ['compound-interest-calculator', 'retirement-planner', 'savings-growth-calculator']
  },

  // 10. DATE DIFFERENCE / INTERVAL CALCULATOR
  {
    title: '날짜 간격 D-Day 및 계산기',
    slug: 'date-difference-calculator',
    category: 'date',
    description: '두 개의 날짜 간격을 지정하고, 단순 일수는 물론 평일(토일 제외 영업일)과 주차, 월수 Spacing 값을 한눈에 도출합니다.',
    aliases: ['날짜 계산', '디데이', '날짜 간격', '며칠 남았나', '기념일', '출장 일정', '영업일', '윤달', '날짜차이'],
    popular: true,
    trending: false,
    inputs: [
      { id: 'startDate', label: '시작 기준 일정', type: 'date', defaultValue: '2026-01-01', section: '비율 간격 지정' },
      { id: 'endDate', label: '종료 타겟 일정', type: 'date', defaultValue: '2026-12-31', section: '비율 간격 지정' },
      { id: 'excludeWeekends', label: '토요일 및 일요일 원천 제외 (영업 주간 필터링)', type: 'boolean', defaultValue: false, section: '정렬 필터링 조건' }
    ],
    calculate: (inputs) => {
      const d1 = new Date(inputs.startDate || '2026-01-01');
      const d2 = new Date(inputs.endDate || '2026-12-31');

      const diffMs = Math.abs(d2.getTime() - d1.getTime());
      const rawDays = diffMs / (1000 * 60 * 60 * 24);
      let days = Math.floor(rawDays);

      let businessDays = 0;
      if (inputs.excludeWeekends) {
        let temp = new Date(Math.min(d1.getTime(), d2.getTime()));
        const targetMs = Math.max(d1.getTime(), d2.getTime());
        while (temp.getTime() <= targetMs) {
          const day = temp.getDay();
          if (day !== 0 && day !== 6) {
            businessDays++;
          }
          temp.setDate(temp.getDate() + 1);
        }
        days = businessDays;
      }

      const weeks = (days / 7).toFixed(1);
      const months = (days / 30.4).toFixed(1);

      return {
        results: [
          { label: '두 기준 간격 날짜 총 합산 일수', value: days, rawValue: days, displayType: 'number', info: '선택한 가용 범위 조건 기준 순수 일간 격차 일수입니다.' },
          { label: '환산 주수 환산율', value: weeks, rawValue: Number(weeks), displayType: 'number' },
          { label: '환산 개월수 환산율 (월 단위 환산)', value: months, rawValue: Number(months), displayType: 'number' }
        ]
      };
    },
    seoContent: {
      guide: '해당 간격 날짜 계산기는 중요한 일정 및 각종 납기 일수를 오차 없이 해결해 줍니다. 단순 캘린더 D-Day 외에도 직장 출장 프로젝트 등의 협업 영업일에 필요한 평일 필터를 손쉽게 적용해 활용할 수 있습니다.',
      formula: '기본 일정 수학 차감 = Math.abs(Date2 - Date1) / 86,400,000 밀리초 단위 계산기 일 단위 환산',
      tips: [
        '출장 프로젝트 마일스톤이나 납품 납기를 계획할 때 법정 주말 필터 기능을 활성화하여 주말 수치를 제하고 일정 수립을 완료하세요.'
      ],
      faqs: [
        { question: '영업일에 법정 국가 공휴일 규정도 반영됩니까?', answer: '본 캘린더는 보편적 주말(토, 일)을 일차 제어하며 특정 세부 공휴일은 자력 공제하는 것이 안전합니다.' }
      ]
    },
    relatedSlugs: ['military-discharge-calculator', 'percentage-calculator']
  },

  // 11. SAVINGS GROWTH CALCULATOR
  {
    title: '예적금 높은 예치 APY 이자 계산기',
    slug: 'savings-growth-calculator',
    category: 'finance',
    description: '시중 은행 및 인터넷 고금리 예적금의 우대 APY를 대조하여, 매월 정기 저축을 가산했을 때의 예적금 실효 이자액을 검증합니다.',
    aliases: ['적금 이자', '정기예금', '예금이자', '은행 적금', 'hysa', '적금이자', '저축 성장', '청약통장'],
    popular: false,
    trending: false,
    inputs: [
      { id: 'principal', label: '초기 예금 예치 원금', type: 'number', defaultValue: 14000000, unit: '원', unitPosition: 'suffix', section: '목돈 예치 조건' },
      { id: 'apy', label: '금리 요율 (우대 APY 이율 연도 기준)', type: 'range', defaultValue: 4.5, min: 0.5, max: 7, step: 0.1, unit: '%', unitPosition: 'suffix', section: '우대 금리 가산' },
      { id: 'monthlyAdd', label: '매월 추가 불입 저축금액', type: 'number', defaultValue: 350000, unit: '원', unitPosition: 'suffix', section: '우대 금리 가산' },
      { id: 'years', label: '예치 계획 유지 년수 (중단 보유 기간)', type: 'range', defaultValue: 10, min: 1, max: 30, step: 1, unit: '년', unitPosition: 'suffix', section: '보존 연도 범위' }
    ],
    calculate: (inputs) => {
      const p = Number(inputs.principal) || 0;
      const rate = (Number(inputs.apy) || 0) / 100;
      const t = Number(inputs.years) || 1;
      const monthlyAdd = Number(inputs.monthlyAdd) || 0;

      let balance = p;
      const monthlyRate = rate / 12;
      const chartData: any[] = [];
      let totalDeposited = p;

      for (let y = 1; y <= t; y++) {
        for (let m = 0; m < 12; m++) {
          balance = (balance + monthlyAdd) * (1 + monthlyRate);
          totalDeposited += monthlyAdd;
        }
        chartData.push({
          label: `${y}년차`,
          '저축 수령 원금': Math.round(totalDeposited),
          '이자 수익 누계': Math.round(balance - totalDeposited),
          '종합 원리 전금액': Math.round(balance)
        });
      }

      return {
        results: [
          { label: '주차 만기 수령 총 세후 원리금액', value: balance, rawValue: balance, displayType: 'currency', info: '원금에 우대이자 배분을 만기 수렴해 도출한 전체 자산 규모입니다.' },
          { label: '개인 최종 원금 납입 규모 합계', value: totalDeposited, rawValue: totalDeposited, displayType: 'currency' },
          { label: '순수 세전 누적 수당 이자 혜택', value: balance - totalDeposited, rawValue: balance - totalDeposited, displayType: 'currency' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '인터넷 저축 은행 예금 계산기는 안전하고 리스크가 거의 성립하지 않는 자산 형성을 조력합니다. 복잡한 주식 위험을 멀리하고 만기 안전 복리 예금 계좌를 설정해 저축 시뮬레이션을 성율화 하십시오.',
      formula: '매월 가산 누적 이율을 recursive 루프 알고리즘 스케줄에 입력 적용해 최종 결산합니다.',
      tips: [
        '금융 당국의 통화 완화 지수를 점검하여 최적의 적합 APY 상품을 고정 선점 계약 확보하는 것이 고이율 눈덩이에 아주 절대 권장됩니다.'
      ],
      faqs: [
        { question: 'APY 금리 혜택이란 다른 계산과 무엇인 다릅니까?', answer: '단순 안내 단리 이자(APR)와 다르게 이자율 지급 주기를 연 단위 종합 복리로 환산 검증한 실효 누적 자산 수익율 공식 명칭입니다.' }
      ]
    },
    relatedSlugs: ['compound-interest-calculator', 'retirement-planner', 'dividend-calculator']
  },

  // 12. PERCENTAGE CALCULATOR
  {
    title: '퍼센트 백분율 수식 계산기',
    slug: 'percentage-calculator',
    category: 'math',
    description: '일상 비율 산출 공식, 가치 증가 및 감소 퍼센트, 비율 증감, 할인가 및 마크다운 여건을 즉각 수식 판별합니다.',
    aliases: ['퍼센트', '백분율', '할인율', '인상률', '인하율', '퍼센트 계산', '비율 계산', '증감률'],
    popular: true,
    trending: false,
    inputs: [
      { id: 'type', label: '원하는 연산 공식 선정', type: 'select', defaultValue: 'basis', options: [{ label: 'X 값의 Y% 비중은 며칠입니까? (순수 비율)', value: 'basis' }, { label: 'X 값은 Y 값의 몇 %에 수렴합니까? (전체 지분 비율)', value: 'fraction' }, { label: 'X 값에서 Y 값으로 변동한 퍼센트 증감률은?', value: 'change' }], section: '계산 공식 선택' },
      { id: 'x', label: '지정 매개변수 X 값', type: 'number', defaultValue: 15, section: '정밀 입력 연산' },
      { id: 'y', label: '지정 매개변수 Y 값', type: 'number', defaultValue: 250, section: '정밀 입력 연산' }
    ],
    calculate: (inputs) => {
      const type = inputs.type || 'basis';
      const x = Number(inputs.x) || 0;
      const y = Number(inputs.y) || 1;

      let resultVal = 0;
      let label = '연산 결과치';
      let format: 'currency' | 'percent' | 'number' | 'text' = 'number';

      if (type === 'basis') {
        resultVal = (x / 100) * y;
        label = `${y}의 ${x}% 결과치`;
      } else if (type === 'fraction') {
        resultVal = (x / y) * 100;
        label = `${y} 대비 ${x}의 비율 결과`;
        format = 'percent';
      } else if (type === 'change') {
        resultVal = ((y - x) / x) * 100;
        label = `${x}에서 ${y}로의 퍼센트 변동폭`;
        format = 'percent';
      }

      return {
        results: [
          { label: label, value: format === 'percent' ? `${resultVal.toFixed(1)}%` : resultVal.toFixed(2), rawValue: resultVal, displayType: 'text' }
        ]
      };
    },
    seoContent: {
      guide: '퍼센트 계산기는 비율에 연관된 모든 생활 수학을 원클릭에 처리합니다. 사업 마진율, 보너스 배분 비율, 쇼핑 특별 단가 할인율 적용을 주저 없이 해결하십시오.',
      formula: '기본 퍼센트 비율 연산 공식 = (타겟값 / 대조 비교값) * 100',
      tips: [
        '소비 상시 세약이나 회사 경영 실적 보고를 분석할 때 즉시 모의 활용하기에 가장 안성맞춤인 도구입니다.'
      ],
      faqs: [
        { question: '퍼센트(Percent)의 어원은 어떻게 됩니까?', answer: '라틴어 "per centum"에서 따왔으며 이는 "100당 비중"을 나타내는 표준 비율 기하학 명칭입니다.' }
      ]
    },
    relatedSlugs: ['hourly-to-salary-calculator', 'net-salary-calculator', 'compound-interest-calculator']
  },

  // 13. VAT AND TAX CALCULATOR
  {
    title: '부가가치세 및 원천징수 세금 계산기',
    slug: 'vat-tax-calculator',
    category: 'tax',
    description: '공급가액과 부가가치세(10%)를 정밀하게 분리 계산하고, 프리랜서 등의 3.3% 및 8.8% 원천징수 세액과 세후 실수령액을 모의 연산합니다.',
    aliases: ['부가세', '부가가치세', '원천세', '원천징수', '3.3%', '8.8%', '세금분리', '공급가액', '공급대가'],
    inputs: [
      { id: 'amount', label: '연산 기준 거래 금액', type: 'number', defaultValue: 1000000, unit: '원', unitPosition: 'suffix', section: '거래 기본 금액 정보' },
      { id: 'calculationMode', label: '금액 기준 구분', type: 'select', defaultValue: 'inclusive', options: [{ label: '공급대가 (세금 포함 총액)', value: 'inclusive' }, { label: '공급가액 (세전 순수 물품가)', value: 'exclusive' }], section: '거래 입력 종류' },
      { id: 'taxRateType', label: '세목 및 원천세율 종류', type: 'select', defaultValue: 'vat10', options: [{ label: '부가가치세 (10%)', value: 'vat10' }, { label: '사업소득 원천징수 (3.3%)', value: 'freelance33' }, { label: '기타소득 원천징수 (8.8%)', value: 'etc88' }], section: '세율 적용 설정' }
    ],
    calculate: (inputs) => {
      const amount = Number(inputs.amount) || 0;
      const mode = inputs.calculationMode || 'inclusive';
      const rateType = inputs.taxRateType || 'vat10';

      let supplyValue = 0;
      let taxValue = 0;
      let netReceived = 0;

      if (rateType === 'vat10') {
        if (mode === 'inclusive') {
          supplyValue = Math.round(amount / 1.1);
          taxValue = amount - supplyValue;
          netReceived = amount;
        } else {
          supplyValue = amount;
          taxValue = Math.round(amount * 0.1);
          netReceived = supplyValue + taxValue;
        }
      } else if (rateType === 'freelance33') {
        if (mode === 'inclusive') {
          supplyValue = Math.round(amount / (1 - 0.033));
          taxValue = supplyValue - amount;
          netReceived = amount;
        } else {
          supplyValue = amount;
          taxValue = Math.round(amount * 0.033);
          netReceived = supplyValue - taxValue;
        }
      } else if (rateType === 'etc88') {
        if (mode === 'inclusive') {
          supplyValue = Math.round(amount / (1 - 0.088));
          taxValue = supplyValue - amount;
          netReceived = amount;
        } else {
          supplyValue = amount;
          taxValue = Math.round(amount * 0.088);
          netReceived = supplyValue - taxValue;
        }
      }

      const chartData = [
        { name: '공급가액 / 원천세외액', value: supplyValue },
        { name: '해당 세액 (부가세/원천징수)', value: taxValue }
      ];

      return {
        results: [
          { label: '최종 합계 실수령액 (세후)', value: `${netReceived.toLocaleString()} 원`, rawValue: netReceived, displayType: 'text', info: '실질적으로 지불되거나 수령하게 되는 최종 현금 합산액입니다.' },
          { label: '순수 가치 공급가액 (세전)', value: `${supplyValue.toLocaleString()} 원`, rawValue: supplyValue, displayType: 'text' },
          { label: '차감/지출되는 해당 세액', value: `${taxValue.toLocaleString()} 원`, rawValue: taxValue, displayType: 'text', info: '부가가치세 또는 원천징수로 부과 및 공정 징수되는 세금입니다.' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '부가가치세 및 원천세 계산기를 활용하면 사업자 거래나 프리랜서 소득 세금 업무를 가장 빠르고 온전하게 모의 분석할 수 있습니다. 세전 계약액을 실수령액으로 변환하거나 거꾸로 세화 실수령 타겟 정가에서 공급가액을 역산할 수 있습니다.',
      formula: '부가가치세 공급가액(공급대가/1.1), 부가세(공급가액 * 0.1). 3.3% 사업소득 원천세(세전금액 * 0.033)',
      tips: [
        '소속 프리랜서(3.3%) 계약 시 법정 세금 공제를 주최자와 협의하여 명수화 하세요.',
        '간이과세자의 영수 조건은 간이과세율 기준에 맞게 세부 조정이 가미될 수 있습니다.'
      ],
      faqs: [
        { question: '공급가액과 공급대가는 무엇이 다릅니까?', answer: '공급가액은 세금을 제외한 원래의 가치 상품 자체 가격이고, 공급대가는 그 공급가액에 10%의 부가가치세를 합산하여 실제 지출하는 청구 총액입니다.' }
      ]
    },
    relatedSlugs: ['net-salary-calculator', 'percentage-calculator']
  },

  // 14. GPA CALCULATOR
  {
    title: '대학 학점(GPA) 및 평균 평점 계산기',
    slug: 'gpa-calculator',
    category: 'education',
    description: '과목별 최종 취득 성적(A+ ~ F)과 학점 이수 비중(Credits)을 입력해, 국내 주요 대학에서 사용하는 4.5 만점 및 4.3 만점 기준 가중 평균 평점을 도출합니다.',
    aliases: ['학점', '대학성적', 'gpa', '학점변환', '평점평균', '성적계산', '이수학점'],
    inputs: [
      { id: 'scale', label: '평점 만점 환산 기준', type: 'select', defaultValue: '4.5', options: [{ label: '4.5 만점 체계 (일반 국공립/사립대)', value: '4.5' }, { label: '4.3 만점 체계 (서울대/연세대/서강대 등)', value: '4.3' }], section: '학점 평가 기준' },
      { id: 'sub1Grade', label: '과목 1 성적', type: 'select', defaultValue: 'Ap', options: [{ label: 'A+ (4.5 / 4.3)', value: 'Ap' }, { label: 'A0 (4.0 / 4.0)', value: 'A0' }, { label: 'B+ (3.5 / 3.3)', value: 'Bp' }, { label: 'B0 (3.0 / 3.0)', value: 'B0' }, { label: 'C+ (2.5 / 2.3)', value: 'Cp' }, { label: 'C0 (2.0 / 2.0)', value: 'C0' }, { label: 'D+ (1.5 / 1.3)', value: 'Dp' }, { label: 'D0 (1.0 / 1.0)', value: 'D0' }, { label: 'F (0.0 / 0.0)', value: 'F' }], section: '과목별 학점 등록 (최대 4개)' },
      { id: 'sub1Credit', label: '과목 1 이수 학점수', type: 'range', defaultValue: 3, min: 1, max: 6, step: 1, unit: '학점', unitPosition: 'suffix', section: '과목별 학점 등록 (최대 4개)' },
      { id: 'sub2Grade', label: '과목 2 성적', type: 'select', defaultValue: 'A0', options: [{ label: 'A+ (4.5 / 4.3)', value: 'Ap' }, { label: 'A0 (4.0 / 4.0)', value: 'A0' }, { label: 'B+ (3.5 / 3.3)', value: 'Bp' }, { label: 'B0 (3.0 / 3.0)', value: 'B0' }, { label: 'C+ (2.5 / 2.3)', value: 'Cp' }, { label: 'C0 (2.0 / 2.0)', value: 'C0' }, { label: 'D+ (1.5 / 1.3)', value: 'Dp' }, { label: 'D0 (1.0 / 1.0)', value: 'D0' }, { label: 'F (0.0 / 0.0)', value: 'F' }], section: '과목별 학점 등록 (최대 4개)' },
      { id: 'sub2Credit', label: '과목 2 이수 학점수', type: 'range', defaultValue: 3, min: 1, max: 6, step: 1, unit: '학점', unitPosition: 'suffix', section: '과목별 학점 등록 (최대 4개)' },
      { id: 'sub3Grade', label: '과목 3 성적', type: 'select', defaultValue: 'Bp', options: [{ label: 'A+ (4.5 / 4.3)', value: 'Ap' }, { label: 'A0 (4.0 / 4.0)', value: 'A0' }, { label: 'B+ (3.5 / 3.3)', value: 'Bp' }, { label: 'B0 (3.0 / 3.0)', value: 'B0' }, { label: 'C+ (2.5 / 2.3)', value: 'Cp' }, { label: 'C0 (2.0 / 2.0)', value: 'C0' }, { label: 'D+ (1.5 / 1.3)', value: 'Dp' }, { label: 'D0 (1.0 / 1.0)', value: 'D0' }, { label: 'F (0.0 / 0.0)', value: 'F' }], section: '과목별 학점 등록 (최대 4개)' },
      { id: 'sub3Credit', label: '과목 3 이수 학점수', type: 'range', defaultValue: 3, min: 1, max: 6, step: 1, unit: '학점', unitPosition: 'suffix', section: '과목별 학점 등록 (최대 4개)' },
      { id: 'sub4Grade', label: '과목 4 성적', type: 'select', defaultValue: 'A0', options: [{ label: 'A+ (4.5 / 4.3)', value: 'Ap' }, { label: 'A0 (4.0 / 4.0)', value: 'A0' }, { label: 'B+ (3.5 / 3.3)', value: 'Bp' }, { label: 'B0 (3.0 / 3.0)', value: 'B0' }, { label: 'C+ (2.5 / 2.3)', value: 'Cp' }, { label: 'C0 (2.0 / 2.0)', value: 'C0' }, { label: 'D+ (1.5 / 1.3)', value: 'Dp' }, { label: 'D0 (1.0 / 1.0)', value: 'D0' }, { label: 'F (0.0 / 0.0)', value: 'F' }], section: '과목별 학점 등록 (최대 4개)' },
      { id: 'sub4Credit', label: '과목 4 이수 학점수', type: 'range', defaultValue: 2, min: 1, max: 6, step: 1, unit: '학점', unitPosition: 'suffix', section: '과목별 학점 등록 (최대 4개)' }
    ],
    calculate: (inputs) => {
      const scale = inputs.scale || '4.5';
      const is45 = scale === '4.5';

      const gradePoints45: Record<string, number> = { Ap: 4.5, A0: 4.0, Bp: 3.5, B0: 3.0, Cp: 2.5, C0: 2.0, Dp: 1.5, D0: 1.0, F: 0.0 };
      const gradePoints43: Record<string, number> = { Ap: 4.3, A0: 4.0, Bp: 3.3, B0: 3.0, Cp: 2.3, C0: 2.0, Dp: 1.3, D0: 1.0, F: 0.0 };

      const pointsMap = is45 ? gradePoints45 : gradePoints43;

      const credits = [
        Number(inputs.sub1Credit) || 0,
        Number(inputs.sub2Credit) || 0,
        Number(inputs.sub3Credit) || 0,
        Number(inputs.sub4Credit) || 0
      ];

      const grades = [
        inputs.sub1Grade || 'F',
        inputs.sub2Grade || 'F',
        inputs.sub3Grade || 'F',
        inputs.sub4Grade || 'F'
      ];

      let totalWeightedPoints = 0;
      let totalCredits = 0;

      for (let i = 0; i < 4; i++) {
        const c = credits[i];
        const point = pointsMap[grades[i]] || 0;
        totalWeightedPoints += point * c;
        totalCredits += c;
      }

      const gpa = totalCredits > 0 ? (totalWeightedPoints / totalCredits) : 0;
      const percentScore = (gpa / (is45 ? 4.5 : 4.3)) * 100;

      const chartData = [
        { name: '취득 평균학점', value: Number(gpa.toFixed(2)) },
        { name: '목표 잔여성향', value: Number(((is45 ? 4.5 : 4.3) - gpa).toFixed(2)) }
      ];

      return {
        results: [
          { label: '종합 평균 평점 (GPA)', value: `${gpa.toFixed(2)} / ${scale}`, rawValue: gpa, displayType: 'text', info: '선택한 만점 체계를 가이드 기준으로 하여 이수 완료된 학점을 환산 적용한 평점평균 결과치입니다.' },
          { label: '전체 백분율 환산성적', value: `${percentScore.toFixed(1)} 점 %`, rawValue: percentScore, displayType: 'text' },
          { label: '총 수강 신청 이수 학점', value: totalCredits, rawValue: totalCredits, displayType: 'number' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '대학 평균 학점(GPA) 가이드 계산기는 본인의 과목 성적 성향을 직관적으로 검수하고 평점평균을 도출해 줍니다. 최종 가중 환산에 입각하여 본인의 취업 또는 편입 제출 백분율 점수 범위까지 사전 시뮬레이션 할 수 있습니다.',
      formula: '평균 평점 (GPA) = ∑(과목 취득 등급 점수 * 과목 이수 학점수) / 총 이수 학점수',
      tips: [
        'F학점 및 재수강 요건 대상 과목을 제외할 경우 학적 제출용 성적을 더 높이 확보해 갈 수 있습니다.',
        '4.5 만점 표준 체계와 4.3 만점 하이테크 교류 체계의 만점 편차를 확인하여 서류 요강 양식에 부합하게 변환하십시오.'
      ],
      faqs: [
        { question: 'P/NP 과목은 평점 산정에 포함되나요?', answer: 'Pass 혹은 No Pass 형태로 이수하는 과목은 원천 수강 학점으로만 산출되고, 종합 평점(GPA) 숫자 평균 분모 분자에는 포함되지 않는 것이 원칙입니다.' }
      ]
    },
    relatedSlugs: ['percentage-calculator', 'date-difference-calculator']
  },

  // 15. FUEL COST CALCULATOR
  {
    title: '자동차 연비 및 주행 유지 유류비 계산기',
    slug: 'fuel-cost-calculator',
    category: 'automobile',
    description: '월간 주행 목표 거리와 차량 복합 연비, 실시간 유류 가격을 결합하여 월별/연간 총 지출 연료 유류비를 전량 추산하고 자동차세를 포함한 유지 비용을 계획하도록 조력합니다.',
    aliases: ['자동차연비', '유류비', '기름값', '주행비용', '주유비', '연비계산', '자동차유지비', '연료비'],
    inputs: [
      { id: 'distance', label: '월 평균 예상 주행거리', type: 'number', defaultValue: 1500, unit: 'km', unitPosition: 'suffix', section: '주행 통계 조건 설정' },
      { id: 'efficiency', label: '내 차 복합 공인 연비', type: 'number', defaultValue: 12.5, unit: 'km/ℓ', unitPosition: 'suffix', section: '차량 에너지 효율' },
      { id: 'fuelPrice', label: '단골 주유소 리터당 유가', type: 'number', defaultValue: 1650, unit: '원', unitPosition: 'suffix', section: '유가 시세 조건' },
      { id: 'otherCosts', label: '월 평균 관리형 간접 정비 부담금 (보험료 및 소모품 포함)', type: 'number', defaultValue: 120000, unit: '원', unitPosition: 'suffix', section: '차량 에너지 효율' }
    ],
    calculate: (inputs) => {
      const distance = Number(inputs.distance) || 0;
      const efficiency = Number(inputs.efficiency) || 12.5;
      const fuelPrice = Number(inputs.fuelPrice) || 1650;
      const otherCosts = Number(inputs.otherCosts) || 0;

      const monthlyFuelKcal = (distance / efficiency) * fuelPrice;
      const totalMonthly = monthlyFuelKcal + otherCosts;
      const annualTotal = totalMonthly * 12;

      const chartData = [
        { name: '월 유류 소출비', value: Math.round(monthlyFuelKcal) },
        { name: '월 정기 유지비', value: otherCosts }
      ];

      return {
        results: [
          { label: '월 총합 차량 유지 차량 비용 (유류+기타)', value: `${Math.round(totalMonthly).toLocaleString()} 원`, rawValue: totalMonthly, displayType: 'text', info: '기름값에 더불어 정비 소모품 충당과 세금을 포함해 월평균 들어가는 순 자산 지출 한도액입니다.' },
          { label: '순수 월 예상 연료 주유 연료비', value: `${Math.round(monthlyFuelKcal).toLocaleString()} 원`, rawValue: monthlyFuelKcal, displayType: 'text' },
          { label: '연간 누적 총액 차량 지출 상당액', value: `${Math.round(annualTotal).toLocaleString()} 원`, rawValue: annualTotal, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '자동차 유류비 연비 정적 시뮬레이터는 매월 출퇴근 주행이나 신차 구입 선택지에 따른 유지 포인트를 수치로 입증합니다. 연비 효율이 우수한 친환경 하이브리드 혹은 전기 동력 대비 전통 내연기관 차종 간의 격차도 한눈에 체감 분석할 수 있습니다.',
      formula: '월 연료비 = (월간 주행 목표 거리 / 공인 연비 비율) * 유가 시세 금액',
      tips: [
        '에코 크루즈 운용과 타이어 표준 공기압 설정을 높여 가동하면 공인 연료비 대비 약 10~15%의 알짜 유류 비용 세이브가 실현 가능합니다.',
        '기름값이 저렴한 자율 알뜰주유소 체인이나 제휴 할인 카드의 피드백 혜택 비율을 복합 계산에 대입 시 체감 차량비 지출을 더 줄일 수합니다.'
      ],
      faqs: [
        { question: '겨울철 주유 효율과 실 주행 연비가 저하되는 이유는 무엇인가요?', answer: '저온 시 유입 공기 밀도 변동에 따른 보정 점화와 엔진 가열 지연, 히터 가동을 포함한 공조 장치 부하가 복합 연동되어 동절기 전력/유류 효율이 다소 하향되는 경향을 보입니다.' }
      ]
    },
    relatedSlugs: ['percentage-calculator', 'savings-growth-calculator']
  },

  // 16. TRAVEL BUDGET AND BILL SPLITTER
  {
    title: '여행 및 파티 단체 더치페이 정산기',
    slug: 'dutch-pay-calculator',
    category: 'travel',
    description: '여러 사람과 함께 다녀온 단체 여행, 파티, 동호회 모임 중 소요된 다채로운 지출 총액을 인원수별로 나누고 공정 정산 제언을 실시간 수식 도해합니다.',
    aliases: ['더치페이', '정산기', 'n분의1', '여행정산', '모임총무', '더치페이계산기', 'N분의1', '회비계산'],
    inputs: [
      { id: 'totalCost', label: '모임/여행 최종 총 지출비용', type: 'number', defaultValue: 450000, unit: '원', unitPosition: 'suffix', section: '지출 원천 종합 총량' },
      { id: 'memberCount', label: '모임 정산 참여 인원수', type: 'range', defaultValue: 5, min: 2, max: 30, step: 1, unit: '명', unitPosition: 'suffix', section: '참여 인적 요소 구성' },
      { id: 'additionalTipRate', label: '외국 식당 팁 및 별도 세액 가산 (%)', type: 'range', defaultValue: 0, min: 0, max: 25, step: 1, unit: '%', unitPosition: 'suffix', section: '해외 팁 옵션 및 가산 설정' },
      { id: 'priorDeduction', label: '일부 회비 선납 입금 자금 (선 공제액)', type: 'number', defaultValue: 50000, unit: '원', unitPosition: 'suffix', section: '해외 팁 옵션 및 가산 설정' }
    ],
    calculate: (inputs) => {
      const total = Number(inputs.totalCost) || 0;
      const members = Math.max(1, Number(inputs.memberCount) || 1);
      const tipRate = Number(inputs.additionalTipRate) || 0;
      const prepay = Number(inputs.priorDeduction) || 0;

      const baseWithTip = total * (1 + (tipRate / 100));
      const netToSplit = Math.max(0, baseWithTip - prepay);
      const individualShare = netToSplit / members;

      const chartData = [
        { name: '1인 최종 입금액', value: Math.round(individualShare) },
        { name: '사전 공제 완료액 (멤버 총분)', value: Math.round(prepay / members) }
      ];

      return {
        results: [
          { label: '멤버 1인당 최종 안분 정산 송금액', value: `${Math.round(individualShare).toLocaleString()} 원`, rawValue: individualShare, displayType: 'text', info: '선 불입액과 팁 연산 비중을 조율해 각 1인의 본 멤버가 총무에게 실 송금해야 할 최종 가액입니다.' },
          { label: '봉사수당(팁)이 가산 적용된 총지출액', value: `${Math.round(baseWithTip).toLocaleString()} 원`, rawValue: baseWithTip, displayType: 'text' },
          { label: '안분 적용된 순수 1인당 가치 셰어액', value: `${Math.round(baseWithTip / members).toLocaleString()} 원`, rawValue: baseWithTip / members, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '공평하고 깔끔한 N분의 1 더치페이 계산기는 단체 총무 분들의 깊은 정산 스트레스를 속시원히 소거해 줍니다. 복합적인 선납금 공제 옵션과 해외 팁 합산 요율을 편리하게 적용하고, 카카오톡 정산 문구용 숫자를 완성도 있게 마련할 수 있습니다.',
      formula: '1인 송금 분량 = [(총 경비 * (1 + 팁비율%)) - 선 납입금] / 요인 정산 인원수',
      tips: [
        '단체 여행 중 총무가 매번 정찰 계산기를 가동하거나 가계부를 들고 다니기 벅차다면, 공용 모임 통장 카드에 일괄 적중 결제하고 사후 등록 정리해 정렬하세요.'
      ],
      faqs: [
        { question: '사전 선납금(Deduction) 처리는 어떤 조건에 사용합니까?', answer: '모임 시작 전 참석 멤버들끼리 균등 예치 확보한 소유 공동회비가 있거나, 특정 스폰서 지원금이 발생해 총 비용에서 누적으로 선 제한 뒤 나머지만 정산하고 싶을 때 사용합니다.' }
      ]
    },
    relatedSlugs: ['percentage-calculator', 'vat-tax-calculator']
  },

  // 17. SHOPPING DISCOUNT AND UNIT PRICE COMPARER
  {
    title: '쇼핑 할인율 및 최저가 단위비교 계산기',
    slug: 'shopping-discount-calculator',
    category: 'shopping',
    description: '서로 다른 용량(g, ml, 개수)과 정가, 개별 할인율을 탑재한 여러 상품들의 100g(또는 단위당) 실체 단가를 동시 검출하여 진정 실속 있는 최고의 가성비 물품을 제언합니다.',
    aliases: ['최저가', '단위가격', '마트비교', '가성비', '그램당', '할인율쇼핑', '쇼핑비교', '단가비교'],
    inputs: [
      { id: 'itemAPrice', label: '상품 A 판매가', type: 'number', defaultValue: 12500, unit: '원', unitPosition: 'suffix', section: '상품 A (대조군 기준)' },
      { id: 'itemAWeight', label: '상품 A 용량/총 중량', type: 'number', defaultValue: 500, unit: 'g...', unitPosition: 'suffix', section: '상품 A (대조군 기준)' },
      { id: 'itemADiscount', label: '상품 A 추가 쿠폰 할인율', type: 'range', defaultValue: 10, min: 0, max: 90, step: 5, unit: '%', unitPosition: 'suffix', section: '상품 A (대조군 기준)' },
      { id: 'itemBPrice', label: '상품 B 판매가', type: 'number', defaultValue: 18000, unit: '원', unitPosition: 'suffix', section: '상품 B (대비군 타겟)' },
      { id: 'itemBWeight', label: '상품 B 용량/총 중량', type: 'number', defaultValue: 800, unit: 'g...', unitPosition: 'suffix', section: '상품 B (대비군 타겟)' },
      { id: 'itemBDiscount', label: '상품 B 추가 쿠폰 할인율', type: 'range', defaultValue: 20, min: 0, max: 90, step: 5, unit: '%', unitPosition: 'suffix', section: '상품 B (대비군 타겟)' }
    ],
    calculate: (inputs) => {
      const priceA = Number(inputs.itemAPrice) || 0;
      const weightA = Math.max(1, Number(inputs.itemAWeight) || 1);
      const discA = Number(inputs.itemADiscount) || 0;

      const priceB = Number(inputs.itemBPrice) || 0;
      const weightB = Math.max(1, Number(inputs.itemBWeight) || 1);
      const discB = Number(inputs.itemBDiscount) || 0;

      const netA = priceA * (1 - (discA / 100));
      const netB = priceB * (1 - (discB / 100));

      const unitA = (netA / weightA) * 100; // Price per 100g
      const unitB = (netB / weightB) * 100; // Price per 100g

      const winner = unitA < unitB ? '상품 A 우세' : unitA > unitB ? '상품 B 우세' : '가성비 동율 (동일)';
      const pctDiff = unitA !== unitB ? (Math.abs(unitA - unitB) / Math.max(unitA, unitB)) * 100 : 0;

      const chartData = [
        { name: 'A사 100g당 실단가', value: Math.round(unitA) },
        { name: 'B사 100g당 실단가', value: Math.round(unitB) }
      ];

      return {
        results: [
          { label: '최종 가성비 최저가 판정 결과', value: winner, rawValue: 0, displayType: 'text', info: '100g (실단위) 기준으로 모든 마크다운 할인을 대조 산정해 도출한 실속 우수 판정입니다.' },
          { label: '상품 A의 최종 수렴 가격 (할인반영)', value: `${Math.round(netA).toLocaleString()} 원`, rawValue: netA, displayType: 'text' },
          { label: '상품 A 기준 100g(ml)당 평균 단가', value: `${Math.round(unitA).toLocaleString()} 원`, rawValue: unitA, displayType: 'text' },
          { label: '상품 B의 최종 수렴 가격 (할인반영)', value: `${Math.round(netB).toLocaleString()} 원`, rawValue: netB, displayType: 'text' },
          { label: '상품 B 기준 100g(ml)당 평균 단가', value: `${Math.round(unitB).toLocaleString()} 원`, rawValue: unitB, displayType: 'text' },
          { label: '가성비 격차 비율', value: `${pctDiff.toFixed(1)}% 수치 격차`, rawValue: pctDiff, displayType: 'text', info: '더 저렴한 제품이 값비싼 기준 후보군 비중 대비 합리적 매력을 띱니다.' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '단위 최저가 할인 계산기는 대형마트 1+1 묶음 코너, 혹은 온라인 커머스의 대용량 패키지와 복수 수량 간의 가짜 알뜰 상술을 투명 분별해 냅니다. 무작정 큰 박스가 저렴할 것이라는 고정관념에서 탈피하여, 100g당 실제 현금 지출 효율성을 명철하게 간음해 볼 수 있습니다.',
      formula: '할인 순수단가 = [판매 정정가격 * (1 - 할인율%)] / 상품 총량(g/ml) * 100 g 기준치',
      tips: [
        '소비 기한이 짧은 생필품의 경우 단순 단위당 가격이 저렴하다고 대용량을 샀다가 잔량을 폐기할 시 도리어 절대 자산 손실로 고착되니 주의하십시오.',
        '쿠폰이나 한정 배송 할인비 면제 조건이 걸릴 경우 해당 물류 원금을 상품 최종가에 가세하여 단위 비교하는 것이 훨씬 정확합니다.'
      ],
      faqs: [
        { question: '단위가 다른 상품(g vs ml)도 호환 대조 비교가 됩니까?', answer: '액체나 가루 소스류 등 물성이 유사한 식재료 도메인은 mℓ와 g의 밀도 편차가 크지 않으므로 사실상 가치 비율 단위 비교를 동행하셔도 유익합니다.' }
      ]
    },
    relatedSlugs: ['percentage-calculator', 'vat-tax-calculator']
  },

  // 18. HOUSEHOLD ELECTRICITY BILL CALCULATOR
  {
    title: '가정용 전기 요금 및 누진세 구간 계산기',
    slug: 'electricity-calculator',
    category: 'utility',
    description: '월간 예상 전력 사용량(kWh)을 바탕으로 대한민국 주택용 전력 요금표 기준 기본 법정 요금과 누진세 가중 구간(3등급)을 분석하고 실효 부가세를 정밀 정산합니다.',
    aliases: ['전기요금', '전기요금계산기', '누진세', '누진세단계', '한전요금', '기본요금', '전력요금', '에어컨전기세', '공과금'],
    inputs: [
      { id: 'monthlyUsage', label: '월간 전기 총 전력 사용량', type: 'number', defaultValue: 350, unit: 'kWh', unitPosition: 'suffix', section: '사용 전력량 세팅' },
      { id: 'seasonType', label: '적용 기온/계절 시기 구분', type: 'select', defaultValue: 'other', options: [{ label: '기타 계절 (봄, 가을, 겨울 등 평달)', value: 'other' }, { label: '하절기 극성수기 (7월 ~ 8월 고온기)', value: 'summer' }], section: '계절 및 설비 분류' },
      { id: 'voltageLimit', label: '주택용 수급 고/저압 여건', type: 'select', defaultValue: 'low', options: [{ label: '주택용 저압 (일반 아파트 단독주택)', value: 'low' }, { label: '주택용 고압 (일부 고압 통합 수용 단지)', value: 'high' }], section: '계절 및 설비 분류' }
    ],
    calculate: (inputs) => {
      const usage = Number(inputs.monthlyUsage) || 0;
      const isSummer = inputs.seasonType === 'summer';
      const isLow = inputs.voltageLimit === 'low';

      let baseCharge = 0;
      let usageCharge = 0;

      if (isLow) {
        if (isSummer) {
          if (usage <= 300) {
            baseCharge = 910;
            usageCharge = usage * 120;
          } else if (usage <= 450) {
            baseCharge = 1600;
            usageCharge = (300 * 120) + ((usage - 300) * 214.6);
          } else {
            baseCharge = 7300;
            usageCharge = (300 * 120) + (150 * 214.6) + ((usage - 450) * 307.3);
          }
        } else {
          if (usage <= 200) {
            baseCharge = 910;
            usageCharge = usage * 120;
          } else if (usage <= 400) {
            baseCharge = 1600;
            usageCharge = (200 * 120) + ((usage - 200) * 214.6);
          } else {
            baseCharge = 7300;
            usageCharge = (200 * 120) + (200 * 214.6) + ((usage - 400) * 307.3);
          }
        }
      } else {
        if (isSummer) {
          if (usage <= 300) {
            baseCharge = 730;
            usageCharge = usage * 105;
          } else if (usage <= 450) {
            baseCharge = 1250;
            usageCharge = (300 * 105) + ((usage - 300) * 179);
          } else {
            baseCharge = 5700;
            usageCharge = (300 * 105) + (150 * 179) + ((usage - 450) * 258);
          }
        } else {
          if (usage <= 200) {
            baseCharge = 730;
            usageCharge = usage * 105;
          } else if (usage <= 400) {
            baseCharge = 1250;
            usageCharge = (200 * 105) + ((usage - 200) * 179);
          } else {
            baseCharge = 5700;
            usageCharge = (200 * 105) + (200 * 179) + ((usage - 400) * 258);
          }
        }
      }

      const totalBeforeTax = baseCharge + usageCharge;
      const vat = totalBeforeTax * 0.1;
      const safetyFund = totalBeforeTax * 0.037;
      const grandTotal = totalBeforeTax + vat + safetyFund;

      const chartData = [
        { name: '기본 가입 요금', value: baseCharge },
        { name: '순수 전력 사용료', value: Math.round(usageCharge) },
        { name: '공공 기금 및 세금', value: Math.round(vat + safetyFund) }
      ];

      return {
        results: [
          { label: '전기요금 월 최종 납부예측 총액', value: `${Math.round(grandTotal).toLocaleString()} 원`, rawValue: grandTotal, displayType: 'text', info: '기본 요금, 전력량 요금에 부가가치세(10%)와 전력산업기반기금(3.7%)을 합산 절사한 최종 고지서 금액입니다.' },
          { label: '종별 기본 요금 등급 적용액', value: `${baseCharge.toLocaleString()} 원`, rawValue: baseCharge, displayType: 'text' },
          { label: '전력량 전용 정산 요금액', value: `${Math.round(usageCharge).toLocaleString()} 원`, rawValue: usageCharge, displayType: 'text' },
          { label: '국가 부가가치세 (10%)', value: `${Math.round(vat).toLocaleString()} 원`, rawValue: vat, displayType: 'text' },
          { label: '전력기반 영수 기금 (3.7%)', value: `${Math.round(safetyFund).toLocaleString()} 원`, rawValue: safetyFund, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '가정용 주택 전기요금 청정 시뮬레이터는 매해 폭염 시기마다 화두가 되는 에어컨 장시간 운용 여파나 난방 가습 가동에 따른 누진세 기습 폭탄을 즉시 예방하도록 도와줍니다. 전력 등급 범위에 따른 가파른 폭증 단가를 사전 조율하여 생활 누수를 잡으십시오.',
      formula: '최종 전기요금 산정 방식 = (기본요금 등급제 + 누진단계별 가중 전력 사용량료) + 부가가치세 10% + 법정 전력기반기금 3.7%',
      tips: [
        '소비 피크 3단계 요율은 1단계 대비 약 2.5배 비쌉니다. 사용량이 높은 가전 사용 시 주기를 지속 가늠하십시오.',
        '출산 가구나 다자녀 가정, 대가족 조건 등 한전 복지 우대 대상 여부를 파악해 신청 시 절세 적용을 지원받을 수 있습니다.'
      ],
      faqs: [
        { question: '주택용 고압과 저압은 어떻게 식별합니까?', answer: '통상 단지 내에 자체 대형 변전 변압 설치 수급 장치를 갖춰 통합 보급 관리하는 통합 메이저 아파트 단지는 평당 단가가 저렴한 고압 기준을 탑재하며, 개별 소액 빌라 및 주택가는 저압 범주에 가깝습니다.' }
      ]
    },
    relatedSlugs: ['percentage-calculator', 'vat-tax-calculator']
  },

  // 19. BUSINESS BREAK-EVEN POINT AND MARGIN CALCULATOR
  {
    title: '비즈니스 손익분기점(BEP) 및 영업 마진 계산기',
    slug: 'business-bep-calculator',
    category: 'business',
    description: '고정비(임차료/월급) 및 단위 변동 사입비와 소비 판매 단가를 조율 적용하여, 비즈니스의 적자 탈출 최소 손익분기 판매량(BEP)과 이익 마진 영역을 계산합니다.',
    aliases: ['bep', '손익분기점', '영업이익', '창업마진', '사입단가', '고정비', '변동비', '손익분기', '수익률', '영업마진'],
    inputs: [
      { id: 'fixedCost', label: '월 평균 총 고정비 (임차료, 유선 인건비 등)', type: 'number', defaultValue: 3000000, unit: '원', unitPosition: 'suffix', section: '월 고정 운영 자금' },
      { id: 'unitPrice', label: '제품 1개당 평균 판매단가', type: 'number', defaultValue: 50000, unit: '원', unitPosition: 'suffix', section: '단위 상품 금융 마진' },
      { id: 'variableCost', label: '제품 1개당 사입/제조 변동비', type: 'number', defaultValue: 20000, unit: '원', unitPosition: 'suffix', section: '단위 상품 금융 마진' },
      { id: 'projectedSales', label: '월 희망/예상 예상 판매량', type: 'range', defaultValue: 200, min: 10, max: 1000, step: 10, unit: '개', unitPosition: 'suffix', section: '영업 장치 목표' }
    ],
    calculate: (inputs) => {
      const fixed = Number(inputs.fixedCost) || 0;
      const price = Number(inputs.unitPrice) || 0;
      const variable = Number(inputs.variableCost) || 0;
      const sales = Number(inputs.projectedSales) || 0;

      const contributionMargin = Math.max(0, price - variable);
      const bepVolume = contributionMargin > 0 ? fixed / contributionMargin : 0;
      const totalRevenue = price * sales;
      const totalCost = fixed + (variable * sales);
      const operatingProfit = totalRevenue - totalCost;
      const marginRatio = totalRevenue > 0 ? (operatingProfit / totalRevenue) * 100 : 0;

      const chartData: any[] = [];
      const step = Math.max(10, Math.round(bepVolume * 2 / 5));
      for (let s = 10; s <= Math.max(sales * 1.5, bepVolume * 2); s += step) {
        const rev = price * s;
        const cost = fixed + (variable * s);
        chartData.push({
          label: `${s}개 판매`,
          '매출 총액': rev,
          '소요 비용 합산': cost,
          '실 순이익 스케일': rev - cost
        });
      }

      return {
        results: [
          { label: '적자 탈출 필수 최소 손익분기 판매량', value: `${Math.ceil(bepVolume)} 개`, rawValue: bepVolume, displayType: 'text', info: '당월 고정 유지비를 완비 보전하며 이익 0원에 도달하기 위해 이 악물고 최소 팔아야 할 제품의 개수량입니다.' },
          { label: '당월 목표 판매 시 예상 실 영업이익', value: `${Math.round(operatingProfit).toLocaleString()} 원`, rawValue: operatingProfit, displayType: 'text' },
          { label: '목표 판매량 시 최종 영업이익률', value: `${marginRatio.toFixed(1)}%`, rawValue: marginRatio, displayType: 'text' },
          { label: '제품 1개당 순 마진 (공헌이익)', value: `${contributionMargin.toLocaleString()} 원`, rawValue: contributionMargin, displayType: 'text' },
          { label: '손익분기 돌파 시점 최소 매출액', value: `${Math.round(Math.ceil(bepVolume) * price).toLocaleString()} 원`, rawValue: bepVolume * price, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '사업 손익분기점(BEP) 연산기는 프랜차이즈, 요식업, 스마트스토어 이커머스를 경영하는 소상공인과 대표님들의 필수 의사결정 시뮬레이터입니다. 고정적인 인건비, 공간 임대료 인상이 제품 사입 단위 단가 마진과 결합 시 어느 지점부터 흑자 국면으로 수렴하는지를 그래프로 면밀히 조명합니다.',
      formula: '손익분기 판매 수량(BEP) = 고정 운영비용 / (제품 단일 판매가 - 단일 변동비용)',
      tips: [
        '소매 판매 가격을 함부로 깎지 마십시오. 판촉 목적으로 단가를 10%만 무리 할인해도 손익분기 도달을 위한 수량이 본래의 2배 가까이 가파르게 확장될 수 있습니다.',
        '자체 임차료나 정기 도메인 호스팅비 등 정기 고정비 누수분을 아예 처음부터 작게 타이트 통제 유지해야 불경기 한계 생존 체력을 길게 가져갑니다.'
      ],
      faqs: [
        { question: '고정비(Fixed Cost)와 변동비(Variable Cost)는 구체적으로 어떻게 다른가요?', answer: '고정비는 문을 닫아두고 제품을 단 1개도 생산/판매하지 않아도 매월 고지 고정되어 빠져나가는 관리 비용(임대장비 소각비, 고정 인건비)을 뜻하고, 변동비는 제품 제조나 택배 패키징과 유통에 따라 정비례로 함께 늘어나는 재료비 성격입니다.' }
      ]
    },
    relatedSlugs: ['percentage-calculator', 'vat-tax-calculator']
  },

  // 20. BASIC SCIENCE UNIT CONVERTER
  {
    title: '기초과학 및 생활 종합 단위 변환기',
    slug: 'unit-converter',
    category: 'science',
    description: '온도(섭씨/화씨), 길이(인치/센티미터), 넓이(평수/제곱미터), 무게(킬로그램/파운드) 등 이공계 과학 실험과 생활 양식에 필요한 다채로운 단위 배치를 정밀 변환합니다.',
    aliases: ['단위변환', '단위변환기', '단위환산', '온도변환', '화씨섭씨', '평수변환', '헤베평', '인치센치', '파운드킬로'],
    inputs: [
      { id: 'convertType', label: '수행할 물리 단위계 종류 선택', type: 'select', defaultValue: 'tempCtoF', options: [{ label: '온도 (섭씨 ℃ → 화씨 ℉)', value: 'tempCtoF' }, { label: '온도 (화씨 ℉ → 섭씨 ℃)', value: 'tempFtoC' }, { label: '넓이 (제곱미터 ㎡ → 평 坪)', value: 'areaM2toPyong' }, { label: '넓이 (평 坪 → 제곱미터 ㎡)', value: 'areaPyongtoM2' }, { label: '길이 (센티미터 cm → 인치 inch)', value: 'lenCmtoInch' }, { label: '길이 (인치 inch → 센티미터 cm)', value: 'lenInchtoCm' }, { label: '무게 (킬로그램 kg → 파운드 lbs)', value: 'weightKgtoLbs' }, { label: '무게 (파운드 lbs → 킬로그램 kg)', value: 'weightLbstoKg' }], section: '단위 요율 분류' },
      { id: 'sourceValue', label: '변환 적용할 원본 수치값', type: 'number', defaultValue: 100, section: '연산 정밀 수치' }
    ],
    calculate: (inputs) => {
      const type = inputs.convertType || 'tempCtoF';
      const val = Number(inputs.sourceValue) || 0;

      let resultVal = 0;
      let label = '단위 변환 결과';

      if (type === 'tempCtoF') {
        resultVal = (val * 9 / 5) + 32;
        label = `${val} ℃ 섭씨 ➔ 화씨 (℉) 환산결과`;
      } else if (type === 'tempFtoC') {
        resultVal = (val - 32) * 5 / 9;
        label = `${val} ℉ 화씨 ➔ 섭씨 (℃) 환산결과`;
      } else if (type === 'areaM2toPyong') {
        resultVal = val * 0.3025;
        label = `${val} ㎡ 제곱미터 ➔ 주택용 평형 (坪) 결과`;
      } else if (type === 'areaPyongtoM2') {
        resultVal = val / 0.3025;
        label = `${val} 평형 (坪) ➔ 미터법 (㎡) 환산결과`;
      } else if (type === 'lenCmtoInch') {
        resultVal = val * 0.393701;
        label = `${val} cm 센티미터 ➔ 야드인치 (inch) 결과`;
      } else if (type === 'lenInchtoCm') {
        resultVal = val * 2.54;
        label = `${val} inch 인치 ➔ 미터 cm 환산결과`;
      } else if (type === 'weightKgtoLbs') {
        resultVal = val * 2.20462;
        label = `${val} kg 킬로그램 ➔ 피트파운드 (lbs) 결과`;
      } else if (type === 'weightLbstoKg') {
        resultVal = val / 2.20462;
        label = `${val} lbs 파운드 ➔ 미터법 (kg) 환산결과`;
      }

      const chartData = [
        { name: '원래 원본 수치', value: val },
        { name: '환산 단위 수치', value: Number(resultVal.toFixed(2)) }
      ];

      return {
        results: [
          { label: label, value: `${resultVal.toFixed(2)}`, rawValue: resultVal, displayType: 'text', info: '국제 표준 도량형 공식의 수렴 배율에 입각해 정밀하게 정렬 환산한 지수입니다.' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '생활 과학 단위 환산기는 전 세계가 규정한 고정 물리 환산 계수를 일목요연 매칭하여, 해외여행 전공 공학 보고 시 수시 발생하는 계도 오차를 시원하게 해결합니다.',
      formula: '섭씨/화씨 변환(F = C * 1.8 + 32). 면적 변환(1 제곱미터 = 0.3025 평형)',
      tips: [
        '해외 직구로 시공 장비를 구매할 때 미국의 야드파운드법 인치 길이와 국내 센티미터 격차를 사전 매치하면 치수 실패를 방지합니다.'
      ],
      faqs: [
        { question: '국가는 왜 건축물에서 "평" 대신 "㎡" 사용을 전격 의무화하나요?', answer: '전통 계량 坪 단위는 지역 시공 기량에 따른 미세한 측량 불완전성이 포함되므로, 법정 공차를 원천 일치화하고 소유자의 투명한 자산 분석을 조력하기 위해 ㎡ 단위를 쓰도록 권고합니다.' }
      ]
    },
    relatedSlugs: ['interior-construction-calculator', 'percentage-calculator']
  },

  // 21. INTERIOR CONSTRUCTION AND WALLPAPER CALCULATOR
  {
    title: '인테리어 평수(㎡) 및 타일 도배 소요량 계산기',
    slug: 'interior-construction-calculator',
    category: 'construction',
    description: '방이나 건물 공간의 가로, 세로, 천장 높이를 입력해 한국 "평坪" 가치 및 법정 헤베(㎡) 면적을 상호 변환하고, 시공 중 소모되는 마진 여유 비율(할증률)을 가미해 필수 타일과 벽지 롤의 예상 소요수량을 추산합니다.',
    aliases: ['평수', '도배지', '타일계산', '헤베', '목재', '인테리어계산', '평수계산', '방넓이', '바닥면적', '셀프인테리어'],
    inputs: [
      { id: 'width', label: '시공 대상 방 가로 폭', type: 'number', defaultValue: 3.6, unit: 'm', unitPosition: 'suffix', section: '실측 치수 등록' },
      { id: 'length', label: '시공 대상 방 세로 폭', type: 'number', defaultValue: 3.0, unit: 'm', unitPosition: 'suffix', section: '실측 치수 등록' },
      { id: 'height', label: '바닥부터 천장까지 높이', type: 'number', defaultValue: 2.3, unit: 'm', unitPosition: 'suffix', section: '실측 치수 등록' },
      { id: 'lossRate', label: '자재 손실/마진 할증률 (%)', type: 'range', defaultValue: 10, min: 0, max: 25, step: 5, unit: '%', unitPosition: 'suffix', section: '시공 마진 설정' }
    ],
    calculate: (inputs) => {
      const w = Number(inputs.width) || 0;
      const l = Number(inputs.length) || 0;
      const h = Number(inputs.height) || 2.3;
      const loss = Number(inputs.lossRate) || 10;

      const floorAreaM2 = w * l;
      const floorAreaPyong = floorAreaM2 * 0.3025;
      const wallAreaM2 = 2 * (w + l) * h;

      const lossMultiplier = 1 + (loss / 100);
      const tilesNeeded = (floorAreaM2 * lossMultiplier) / 0.09;
      const wallPaperRolls = (wallAreaM2 * lossMultiplier) / 5.3;

      const chartData = [
        { name: '바닥 면적 (㎡)', value: Number(floorAreaM2.toFixed(1)) },
        { name: '벽면 면적 (㎡)', value: Number(wallAreaM2.toFixed(1)) }
      ];

      return {
        results: [
          { label: '실측 공간 바닥 면적 (평수)', value: `${floorAreaPyong.toFixed(1)} 평 (坪)`, rawValue: floorAreaPyong, displayType: 'text', info: '실제 면적 평수에 기반한 시공 환산입니다.' },
          { label: '실측 공간 바닥 면적 (헤베 ㎡)', value: `${floorAreaM2.toFixed(1)} ㎡`, rawValue: floorAreaM2, displayType: 'text' },
          { label: '정수 환산 벽 도배지 소요량 (소형 롤)', value: `${Math.ceil(wallPaperRolls)} 롤 상당`, rawValue: wallPaperRolls, displayType: 'text', info: '일반적인 합지소형 벽지 롤(5.3㎡ 도포)과 시공 소실 마진을 반영해 계산한 값입니다.' },
          { label: '정수 환산 바닥 타일 소요량 (300mm각)', value: `${Math.ceil(tilesNeeded)} 장 상당`, rawValue: tilesNeeded, displayType: 'text', info: '300x300mm 표준 세라믹 타일 면적과 할증률을 얹어 시뮬레이션한 수량입니다.' },
          { label: '도배 대상 전체 벽면 면적', value: `${wallAreaM2.toFixed(1)} ㎡`, rawValue: wallAreaM2, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '인테리어 공간 자재 계산기는 욕실 타일 덧방을 시도하거나 벽지 롤을 직접 주문해 방을 가꿀 때의 자재 수치 실패를 없애 줍니다. 셀프 인테리어 도중 모서리 컷팅과 칼질 소실로 발생하는 자재 버림을 할증율(Loss Factor) 옵션으로 안전하게 방어해 보세요.',
      formula: '바닥면적 = 가로 * 세로. 벽지소요 = (벽면면적 * 시공할증%) / 단일 롤 표준 커버 면지적',
      tips: [
        '초보자의 타일 시공이나 헤링본 배치는 모서리 커팅 소요 손실이 극심하므로 안전한 시공을 위해 할증율 15% 정도의 넉넉한 예비분을 설정하십시오.'
      ],
      faqs: [
        { question: '시공 업자들의 "헤베" 및 "루베" 뜻은 무엇입니까?', answer: '일본식 표현의 잔재로, "헤베(헤이베이)"는 제곱미터(㎡) 면적 단위이며 "루베"는 입방미터(㎥) 체적 부피 단위입니다.' }
      ]
    },
    relatedSlugs: ['unit-converter', 'percentage-calculator']
  }
];

export const CALCULATORS: CalculatorSchema[] = [
  ...BASE_CALCULATORS,
  ...MORE_CALCULATORS
];

export const EXPANDED_CALCULATOR_INDEX = [
  // Finance & Savings (금융 및 저축)
  { title: '예적금 단리 이자 계산기', slug: 'simple-interest-calculator', category: 'finance', aliases: ['simple interest deposit', '단리금리', '예금이자', '단리계산'] },
  { title: '단리 적금 실수령액 정산기', slug: 'simple-interest-calculator', category: 'finance', aliases: ['simple interest savings', '적금단리', '만기적리', '무복리적금'] },
  { title: '인플레이션 소비자 물가상승 예측기', slug: 'inflation-calculator', category: 'finance', aliases: ['inflation calculator power', '물가상승', '화폐가치', '실질가치'] },
  { title: '대환대출 중도상환 수수료 비교기', slug: 'loan-refinance-calculator', category: 'finance', aliases: ['repayment refinance penalty', '대환대출', '갈아타기', '중도수수료'] },
  { title: '자산 복리 이자 모의 기획기', slug: 'compound-interest-calculator', category: 'finance', aliases: ['compound rates simulation', '원리복리', '예적금복리', '복리마법'] },
  { title: '적금 자동 성장액 납입 예측기', slug: 'savings-growth-calculator', category: 'finance', aliases: ['savings tracking standard', '적금성장', '목돈마련', '미래적금'] },
  { title: '비상금 마련 및 생활비 지출 플래너', slug: 'savings-growth-calculator', category: 'finance', aliases: ['emergency funds planner', '비상금계산', '저축목표', '가계예산'] },
  { title: '개인 신용 대출 상환 계획기', slug: 'mortgage-calculator', category: 'finance', aliases: ['debt repayment tracker', 'personal loan schedules', '신용대출금리', '상환계획', '신용상환'] },
  { title: 'HYSA 파킹통장 우대 금리 비교기', slug: 'savings-growth-calculator', category: 'finance', aliases: ['high yield savings APY', 'compound tracker', '은행파킹통장', '고금리예금', '파킹통장'] },
  { title: '물가상승 및 화폐가치 하락 추산기', slug: 'inflation-calculator', category: 'finance', aliases: ['cpi adjustment', 'purchasing power inflation', '물가상승률', '인플레이션', '화폐가치'] },

  // Tax & Salary (세금 및 급여)
  { title: '증여세 모의 계산기 (부모 자식간 공제)', slug: 'gift-tax-calculator', category: 'tax', aliases: ['gift tax parenting rates', '증여공제', '부모증여', '자식증여세'] },
  { title: '미성년 자녀 증여 면제 한도기', slug: 'gift-tax-calculator', category: 'tax', aliases: ['minor child gift exemption', '미성년증여', '자녀증여세'] },
  { title: '실업급여 (구직급여) 조기 지급 산정기', slug: 'unemployment-benefit-calculator', category: 'salary', aliases: ['unemployment packages duration', '실업수당', '구직급여', '실업계산'] },
  { title: '퇴사 실업급여 모의 수령금 연산기', slug: 'unemployment-benefit-calculator', category: 'salary', aliases: ['estimate unemployment packages', '실업급여', '고용지원금', '퇴직급여'] },
  { title: '연봉 실수령액 세후 종합 정산기', slug: 'net-salary-calculator', category: 'salary', aliases: ['annual net salary takeout', '세후월급', '실수령액', '연봉실수령'] },
  { title: '부가가치세 (VAT) 부과 영수증 추정기', slug: 'vat-tax-calculator', category: 'tax', aliases: ['value added tax ledger', '부가세환급', '부가세계산', '과세영수증'] },
  { title: '고정 시급 주휴수당 세후 모의 계산기', slug: 'hourly-to-salary-calculator', category: 'salary', aliases: ['convert salary rates', 'pay conversions', '주휴수당', '시급변환', '일당환산'] },
  { title: '종합소득세 과세 표준 세율 간편 산출기', slug: 'gift-tax-calculator', category: 'tax', aliases: ['comprehensive income tax base', '종소세', '종합소득세', '과표세율'] },
  { title: '원천징수 3.3% 프리랜서 소득 세후기', slug: 'net-salary-calculator', category: 'salary', aliases: ['freelancer withholding tax 3.3', '3.3세금', '프리랜서급여', '세후정산'] },

  // Investment & Stocks (재테크 및 투자)
  { title: '투자 대비 수익률 (ROI) 분석기', slug: 'roi-calculator', category: 'investment', aliases: ['return over investments cost', 'roi계산', '회수율', '투자성격'] },
  { title: '주식 평단가 물타기 매수 시뮬레이터', slug: 'stock-ladders-calculator', category: 'investment', aliases: ['stock average pricing down', '주식물타기', '평단가낮추기', '추매물타기'] },
  { title: '가상자산 비트코인 거래 수익 계산기', slug: 'crypto-profit-calculator', category: 'investment', aliases: ['cryptocurrency trading profit ledgers', '코인수익', '비트코인수익', '이더리움수익'] },
  { title: '원금 2배 달성 복리 72 법칙 계산기', slug: 'rule-of-72-calculator', category: 'investment', aliases: ['72 rule double values', '72법칙', '원금2배', '복리마법'] },
  { title: '주식 시가 배당금 재투자 (DRIP) 플래너', slug: 'dividend-calculator', category: 'investment', aliases: ['drip stock dividends grow', '배당재투자', 'drip계산', '주식배당금'] },
  { title: '투자 수익률(ROI) 가시 연산기', slug: 'roi-calculator', category: 'investment', aliases: ['roi rate', 'business profit returns', '투자수익', '투자회수율', 'roi분석'] },
  { title: '해외 미국 주식 양도세 및 환차익 추정기', slug: 'crypto-profit-calculator', category: 'investment', aliases: ['us stock foreign currency tax', '미국주식양도세', '양도세', '환차익'] },

  // Retirement (은퇴설계)
  { title: '조기은퇴 파이어족 4% 안전인출기', slug: 'swr-4percent-calculator', category: 'retirement', aliases: ['swr safe withdrawal index', '4퍼센트룰', '파이어족', '안전인출'] },
  { title: '노후 필요한 은퇴 자산 규모 예측기', slug: 'retirement-planner', category: 'retirement', aliases: ['determine nest eggs requirements', '노후생활비', '은퇴자금', '은퇴연금'] },
  { title: '국민연금 개시 연령 수령 기대 조사기', slug: 'retirement-planner', category: 'retirement', aliases: ['national pension start estimate', '국민연금수령액', '노령연금', '개시나이'] },

  // Military (밀리터리)
  { title: '전역 예정 장병 D-Day 날짜 계산기', slug: 'military-discharge-calculator', category: 'military', aliases: ['military enlistments discharges ddays', '전역일', '군대전역', '입대디데이'] },
  { title: '군 장병 내일준비적금 전역 수령금 계산기', slug: 'military-savings-calculator', category: 'military', aliases: ['military savings matching calculators', '장병내일준비적금', '군적금', '매칭지원금'] },
  { title: '공익 근무 요원 D-Day 소집해제 계산기', slug: 'military-discharge-calculator', category: 'military', aliases: ['social agent military discharges', '소집해제일리', '공익전역', '사회복무'] },

  // Real Estate (부동산)
  { title: '주택담보대출 LTV DSR 규제 한선기', slug: 'mortgage-calculator', category: 'real-estate', aliases: ['mortgages bounds requirements ltv', '주담대한도', 'dsr한도', 'ltv규제'] },
  { title: '아파트 전세 월세 장단 주거비 비교기', slug: 'rent-vs-buy-calculator', category: 'real-estate', aliases: ['residential monthly rents vs buy', '전서월세비교', '집사기월세', '주거비교'] },
  { title: '부동산 상가 오피스텔 임대 수익률 계산기', slug: 'rental-yield-calculator', category: 'real-estate', aliases: ['realty tenant rental cashflow yields', '임대수익률', '오피스텔수익', '상가임대'] },
  { title: 'DSR 부채원리금상환 비율 계산기', slug: 'mortgage-calculator', category: 'real-estate', aliases: ['dsr', 'debt ratio limits', 'dsr한도', 'dsr비율', '부채상환비율'] },
  { title: 'LTV 담보인정 한도 분석기', slug: 'mortgage-calculator', category: 'real-estate', aliases: ['ltv', 'equity percent', 'ltv한도', '담보한도', '주담대LTV'] },
  { title: '자가 주택 매매 임대 비용 정량 비교기', slug: 'rent-vs-buy-calculator', category: 'real-estate', aliases: ['rent buy costs', 'property ownership savings', '전세월세비교', '매매임대', '전세월세전환'] },
  { title: '연간 자산 취득세 및 재산세 사전 정산기', slug: 'mortgage-calculator', category: 'real-estate', aliases: ['property tax annual cost', 'assess real estate taxes', '재산세취득세', '부동산세금', '부동산취득세'] },

  // Health (건강 지수 / 피트니스)
  { title: '복부 내장지방 둘레 비율 WHR 판별기', slug: 'whr-calculator', category: 'health', aliases: ['belly fats waist to hip ratio', '복부비만율', 'whr계산', '허리엉덩이둘레'] },
  { title: 'YMCA 공식 간편 신체 체지방 분석기', slug: 'body-fat-ymca-calculator', category: 'health', aliases: ['ymca lipid mass tracking index', 'ymca체지방', '신체체지방률', '지방무게'] },
  { title: '유산소 카르보넨 Karvonen 목표 심박기', slug: 'target-heart-rate-calculator', category: 'health', aliases: ['karvonen fitness training pulses', '카르보넨', '목표심박수', '유산소심박'] },
  { title: '체중 감량 일일 칼로리 소실 계획기', slug: 'bmr-calculator', category: 'health', aliases: ['weight loss deficit', 'daily burn intake target', '칼로리적자', '다이어트식단', 'tdee적자'] },
  { title: '하루 필요 적정 권장 수분 섭취량 계산기', slug: 'bmi-calculator', category: 'health', aliases: ['hydration target litters', 'daily water needs', '물섭취량', '하루수분', '수분권장량'] },
  { title: '순수 체지방 및 골격 비율 분석기', slug: 'bmi-calculator', category: 'health', aliases: ['body fat percent', 'lean body calculation', '체지방분석', '체질량표준', '지방비중자체'] },
  { title: '체질량 지수 (BMI) 비만 카테고리 기', slug: 'bmi-calculator', category: 'health', aliases: ['body mass index standard obese', 'bmi지수', '비만도측정', '표준체중'] },
  { title: '일일 기초대사량 (BMR) 해리스-베네딕트', slug: 'bmr-calculator', category: 'health', aliases: ['basal metabolic rates harris default', '기초대사량', 'bmr계산', '대사량측정'] },

  // Education (교육 및 학업)
  { title: '고교 내신 등급 표준편차 석차 예측기', slug: 'rank-standard-deviation-calculator', category: 'education', aliases: ['school rank standard deviation predict', '내신표준편차', '석차구형', '교내등급'] },
  { title: '대학 GPA 평점 4.5 4.0 변환 계산기', slug: 'gpa-calculator', category: 'education', aliases: ['gpa scale converters score', 'gpa변환', '학점변환', '대학교학점'] },

  // Automobile (자동차)
  { title: '전기차 연 충전료 vs 휘발유 절약 비교기', slug: 'electric-car-savings-calculator', category: 'automobile', aliases: ['electric savings vs gas price', '전기차유지비', '연료비교', '충전가성비'] },
  { title: '출퇴근 자동차 유류비 주유 소모 계산기', slug: 'fuel-cost-calculator', category: 'automobile', aliases: ['fuel expenses commutings gas', '주유비계산', '유류비정산', '출퇴근유류비'] },
  { title: '차량 구매 할부 금융 계획기', slug: 'mortgage-calculator', category: 'automobile', aliases: ['car purchase loan options', '자동차할부', '차량대출', '오토론대차'] },

  // Travel (여행 & 정산)
  { title: '여행 팁 분할 및 더치페이 정산기', slug: 'percentage-calculator', category: 'travel', aliases: ['travel tips split billing sharing', '팁계산', '더치페이원', '여행정산'] },
  { title: '일행별 식당 N빵 더치페이 영수 정기', slug: 'dutch-pay-calculator', category: 'travel', aliases: ['split dine bill dutch payments', 'N빵계산', '더치페이', '회식비분할'] },

  // Shopping (쇼핑 & 소비)
  { title: '쇼핑 최종 세일 할인액 쿠폰 계산기', slug: 'shopping-discount-calculator', category: 'shopping', aliases: ['sales coupon final costs discount', '할인율계산', '세일가격', '쿠폰정산'] },
  { title: '쇼핑 세일 할인율 단가 연산기', slug: 'percentage-calculator', category: 'shopping', aliases: ['discount percent', 'markdown bargains', '할인율계산', '세일가격', '할인단가'] },

  // Utility & Common bills (공과금 및 공공요금)
  { title: '누진세 반영 주택용 전기 요금 연산기', slug: 'electricity-calculator', category: 'utility', aliases: ['household electricity progressive tiers', '전기요금누진', '전기세계산', '한전요금'] },

  // Business (비즈니스)
  { title: '구독 비즈니스 성장 MRR ARR 예측기', slug: 'recurring-revenue-calculator', category: 'business', aliases: ['mrr arr business recurring forecast', '구독매출', 'arr전망', 'mrr계산'] },
  { title: '고객 획득 비용(CAC) 비즈니스 분석기', slug: 'savings-growth-calculator', category: 'business', aliases: ['cac metric', 'marketing spend acquire', '마케팅비용', 'cac분석', '고객유치비'] },
  { title: '영업 손익분기점 (BEP) 생산 한선기', slug: 'business-bep-calculator', category: 'business', aliases: ['business break even point volume', '손익분기점', 'bep계산', '마진분석'] },

  // Math & Science (수학/과학/변환)
  { title: '두 자연수 최대공약수 GCD 최소공배수 LCM', slug: 'gcd-lcm-calculator', category: 'math', aliases: ['math gcd lcm euclids division', '최대공약수', '최소공배수', 'gcd', 'lcm'] },
  { title: '실생활 다리 단위 환산 변환기', slug: 'unit-converter', category: 'science', aliases: ['comprehensive unit converters scale', '단위변환', '미터인치', '환산계산'] },

  // Construction (시공 & 인테리어)
  { title: '인테리어 방 도배 타일 자재 분량기', slug: 'interior-construction-calculator', category: 'construction', aliases: ['interior tiles wallpapers loss margins', '인테리어자재', '타일수량', '도배지계산'] }
];

export function searchCalculators(query: string): { title: string; slug: string; category: CalculatorCategory; description: string; matchesIcon: string }[] {
  const norm = query.toLowerCase().trim();
  if (!norm) return [];

  const matchedRich = CALCULATORS.filter(c => 
    c.title.toLowerCase().includes(norm) ||
    c.description.toLowerCase().includes(norm) ||
    c.aliases.some(a => a.toLowerCase().includes(norm))
  ).map(c => ({
    title: c.title,
    slug: c.slug,
    category: c.category,
    description: c.description,
    matchesIcon: 'rich'
  }));

  const matchedIndex = EXPANDED_CALCULATOR_INDEX.filter(c =>
    c.title.toLowerCase().includes(norm) ||
    c.aliases.some(a => a.toLowerCase().includes(norm))
  ).map(c => ({
    title: c.title,
    slug: c.slug,
    category: c.category,
    description: `마스터 템플릿 엔진을 통해 실시간 즉석 연산 활용이 가능합니다.`,
    matchesIcon: 'index'
  }));

  const seenSlugs = new Set();
  const list: any[] = [];

  for (const item of [...matchedRich, ...matchedIndex]) {
    const key = `${item.title}-${item.slug}`;
    if (!seenSlugs.has(key)) {
      seenSlugs.add(key);
      list.push(item);
    }
  }

  return list.slice(0, 10);
}
