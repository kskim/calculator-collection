/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CalculatorSchema } from '../types';

export const MORE_CALCULATORS: CalculatorSchema[] = [
  // 1. SIMPLE INTEREST CALCULATOR
  {
    title: '예적금 단리 이자 계산기',
    slug: 'simple-interest-calculator',
    category: 'finance',
    description: '원금과 이자율, 예치 기간을 결합하여 매년 일정한 이자만 발생하는 단리(Simple Interest) 상품의 세전/세후 이자 수익과 최종 적립금을 연산합니다.',
    aliases: ['단리', '단리이자', '정기예금단리', '단리방식'],
    inputs: [
      { id: 'principal', label: '예치 원금', type: 'number', defaultValue: 10000000, unit: '원', unitPosition: 'suffix', section: '투자 금액 정보' },
      { id: 'rate', label: '연 이자율', type: 'range', defaultValue: 3.5, min: 0.1, max: 15, step: 0.1, unit: '%', unitPosition: 'suffix', section: '금리 설정' },
      { id: 'term', label: '예치 기간 (월)', type: 'number', defaultValue: 12, unit: '개월', unitPosition: 'suffix', section: '기간 설정' },
      { id: 'taxFree', label: '이자소득세 비과세 여부', type: 'boolean', defaultValue: false, section: '세금 설정' }
    ],
    calculate: (inputs) => {
      const principal = Number(inputs.principal) || 0;
      const rate = Number(inputs.rate) || 0;
      const termMonths = Number(inputs.term) || 12;
      const isTaxFree = !!inputs.taxFree;

      const years = termMonths / 12;
      const grossInterest = Math.round(principal * (rate / 100) * years);
      const taxRate = isTaxFree ? 0 : 0.154; // 15.4% 일반 과세
      const tax = Math.round(grossInterest * taxRate);
      const netInterest = grossInterest - tax;
      const totalWealth = principal + netInterest;

      const chartData = [
        { name: '원자산 (원금)', value: principal },
        { name: '세후 수령 이자', value: netInterest }
      ];

      return {
        results: [
          { label: '세후 최종 실수령 총액', value: `${totalWealth.toLocaleString()} 원`, rawValue: totalWealth, displayType: 'text', info: '원금과 이자액에서 소득세(15.4%)가 차감된 최종 만기 수령금입니다.' },
          { label: '세전 총 발생 이자', value: `${grossInterest.toLocaleString()} 원`, rawValue: grossInterest, displayType: 'text' },
          { label: '차감 세액 (소득세 15.4%)', value: `${tax.toLocaleString()} 원`, rawValue: tax, displayType: 'text' },
          { label: '새후 순수 이자 수익', value: `${netInterest.toLocaleString()} 원`, rawValue: netInterest, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '단리 계산기를 이용하면 매칭 단리 이익을 계산하게 됩니다. 복리와 달리 이자가 원금에 가산되지 않으므로, 이자 배가 효율을 비교하기 좋습니다.',
      formula: '이자 = 원금 * (연 이자율 / 100) * (예치개월 / 12)',
      tips: [
        '새마을금고, 신협 등 단위조합의 저율 과세 상품을 연동하면 1.4% 농특세만 차감하여 세후 보정 수령을 극대화할 수 있습니다.'
      ],
      faqs: [
        { question: '복리와 단리의 차이점은 무엇인가요?', answer: '단리는 오직 원금에 대해서만 이자가 붙는 반면, 복리는 발생한 이자가 다음 주기의 새로운 원금이 되어 이자에 이자가 붙습니다.' }
      ]
    },
    relatedSlugs: ['compound-interest-calculator', 'savings-growth-calculator']
  },

  // 2. INFLATION CALCULATOR
  {
    title: '인플레이션 및 물가상승 화폐가치 계산기',
    slug: 'inflation-calculator',
    category: 'finance',
    description: '과거 기준 연도와 현재 가치, 혹은 평균 연간 물가상승률을 대입하여 미래에 자금의 가치가 얼마나 감쇠되는지 예측합니다.',
    aliases: ['인플레이션', '물가상승', '화폐가치', '실질가치', '구매력하락'],
    inputs: [
      { id: 'amount', label: '현재 자산 규모', type: 'number', defaultValue: 100000000, unit: '원', unitPosition: 'suffix', section: '현재 기준 금액' },
      { id: 'rate', label: '예상 연간 물가상승률', type: 'range', defaultValue: 3.0, min: 0.1, max: 15, step: 0.1, unit: '%', unitPosition: 'suffix', section: '미래 전망' },
      { id: 'years', label: '기간 (년)', type: 'number', defaultValue: 10, unit: '년', unitPosition: 'suffix', section: '미래 전망' }
    ],
    calculate: (inputs) => {
      const amount = Number(inputs.amount) || 0;
      const rate = Number(inputs.rate) || 0;
      const years = Number(inputs.years) || 10;

      const purchasingPower = Math.round(amount / Math.pow(1 + (rate / 100), years));
      const valueLoss = amount - purchasingPower;

      const chartData: any[] = [];
      for (let i = 0; i <= years; i += Math.max(1, Math.floor(years / 5))) {
        chartData.push({
          label: `${i}년 후`,
          '실질 가치 (구매력)': Math.round(amount / Math.pow(1 + (rate / 100), i)),
          '손실된 명목 가치': Math.round(amount - (amount / Math.pow(1 + (rate / 100), i)))
        });
      }

      return {
        results: [
          { label: '기간 경과 후 실질 가치(구매력)', value: `${purchasingPower.toLocaleString()} 원`, rawValue: purchasingPower, displayType: 'text', info: '물가상승을 반영한 결과, 현재의 화폐가치 기준으로 환산한 세후 실질 자산 규모입니다.' },
          { label: '물가상승에 따른 실체 자산 손실 규모', value: `${valueLoss.toLocaleString()} 원`, rawValue: valueLoss, displayType: 'text' },
          { label: '누적 가치 하락 비율', value: `${((valueLoss / amount) * 100).toFixed(1)}% 하락`, rawValue: (valueLoss / amount) * 100, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '인플레이션 물가상승 계산기는 현금 보전 자산의 취약점을 시각화합니다. 자산 저축 수단을 주식이나 부동산 같은 가치 연동 자산으로 분산해야 할 타당성을 제시합니다.',
      formula: '미래 실질 가치 = 원금 / (1 + 물가상승률)^기간',
      tips: [
        '현금을 그냥 예치하는 대신 연 복리 3% 이상의 채권이나 배당 성향의 연금 계좌에 전개하여 가치 보전에 도움을 얻어보세요.'
      ],
      faqs: [
        { question: '국내 역대 평균 소비자물가상승률은 대략 어느 정도인가요?', answer: '한국은행의 최근 중장기 관리 목표 수준은 연평균 대략 2% 정도로 수렴되고 실질 체감 물가는 더 높은 변동성을 띱니다.' }
      ]
    },
    relatedSlugs: ['compound-interest-calculator', 'savings-growth-calculator']
  },

  // 3. LOAN REFINANCE CALCULATOR
  {
    title: '이자 절감 대환 수수료 비교 계산기 (대출 갈아타기)',
    slug: 'loan-refinance-calculator',
    category: 'finance',
    description: '기존 대출에서 저금리 대출로 전환 시, 중도상환수수료와 인지세 대비 절약할 수 있는 실제 누적 이자액수 한도를 리포트합니다.',
    aliases: ['대환대출', '갈아타기', '중도상환수수료', '이자절감', '대환'],
    inputs: [
      { id: 'balance', label: '현재 남아있는 대출 잔액', type: 'number', defaultValue: 100000000, unit: '원', unitPosition: 'suffix', section: '기존 대출 정보' },
      { id: 'oldRate', label: '기존 연 이자율', type: 'number', defaultValue: 5.5, unit: '%', unitPosition: 'suffix', section: '기존 대출 정보' },
      { id: 'newRate', label: '대환 예정 저금리 이자율', type: 'number', defaultValue: 4.2, unit: '%', unitPosition: 'suffix', section: '대환 대출 조건' },
      { id: 'remMonth', label: '상환 잔여 기간', type: 'number', defaultValue: 24, unit: '개월', unitPosition: 'suffix', section: '대환 대출 조건' },
      { id: 'penaltyRate', label: '기존 대출 중도상환 수수료율', type: 'range', defaultValue: 1.2, min: 0, max: 3, step: 0.1, unit: '%', unitPosition: 'suffix', section: '기타 전경 비용' },
      { id: 'additionalFee', label: '기타 보증/중개 법정 서류 수수료', type: 'number', defaultValue: 150000, unit: '원', unitPosition: 'suffix', section: '기타 전경 비용' }
    ],
    calculate: (inputs) => {
      const balance = Number(inputs.balance) || 0;
      const oldRate = Number(inputs.oldRate) || 0;
      const newRate = Number(inputs.newRate) || 0;
      const remMonth = Number(inputs.remMonth) || 24;
      const penaltyRate = Number(inputs.penaltyRate) || 0;
      const fee = Number(inputs.additionalFee) || 0;

      // 단순화 만기 일시 상환 기준 이자 차이 연산
      const years = remMonth / 12;
      const oldTotalInterest = balance * (oldRate / 100) * years;
      const newTotalInterest = balance * (newRate / 100) * years;

      const interestSaved = oldTotalInterest - newTotalInterest;
      const refinanceCost = (balance * (penaltyRate / 100)) + fee;
      const netBenefit = interestSaved - refinanceCost;

      const chartData = [
        { name: '대환 전 누적 이자지출', value: Math.round(oldTotalInterest) },
        { name: '대환 후 이자 + 발생 수수료', value: Math.round(newTotalInterest + refinanceCost) }
      ];

      return {
        results: [
          { label: '갈아타기로 세금제외 실 이익규모', value: `${netBenefit.toLocaleString()} 원`, rawValue: netBenefit, displayType: 'text', info: '이자 세이브 금액에서 중도상환 수수료 및 수입 인지 소득 비용 전체를 사 차감한 확실한 가치 몫입니다.' },
          { label: '순수 절약되는 할부 이자 총합', value: `${Math.round(interestSaved).toLocaleString()} 원`, rawValue: interestSaved, displayType: 'text' },
          { label: '차감되는 전환 일실 수수료 부담총체', value: `${Math.round(refinanceCost).toLocaleString()} 원`, rawValue: refinanceCost, displayType: 'text' },
          { label: '갈아타기 추천 소견', value: netBenefit > 0 ? '갈아타기 전격 권장' : '전환 손실 (유지 권장)', rawValue: 0, displayType: 'badge', badgeColor: netBenefit > 0 ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-rose-100 text-rose-800 border-rose-200' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '대대적인 주담대 이자 급변기 시절에 전세대출이나 주택담보의 상환 스케줄을 재조정하고 대환 이득을 실시간 조율하기 좋은 대환 설계기입니다.',
      formula: '순 절약이익 = (기존 대출 잔액 이자총량 - 대환 대출 이자총량) - 발생 중도 수수료',
      tips: [
        '통상 대출 실행 후 3년이 경과하면 대부분의 저축 은행이나 제1금융권의 중도상환수수료는 면제되므로 실행 연혁을 정조준해보세요.'
      ],
      faqs: [
        { question: '중도 상환 수수료는 어떻게 면제되나요?', answer: '대체로 3년의 보유 시한 이후엔 면제 소각되며, 일부 변동금리 상품이나 서민 금융 혜택 모델의 경우 즉시 면제 처리가 가능합니다.' }
      ]
    },
    relatedSlugs: ['mortgage-calculator', 'savings-growth-calculator']
  },

  // 4. GIFT TAX CALCULATOR
  {
    title: '증여세 모의 계산기 (부모 자녀 공제 지원)',
    slug: 'gift-tax-calculator',
    category: 'tax',
    description: '수증자와 증여자의 관계를 지정하고 한국 국세청 증여 기본 면제 한도를 연동 적용하여, 공제가 차감된 과세 표준 세액과 예정 부과 세금을 계산합니다.',
    aliases: ['증여세', '공제한도', '증여면제', '부모증여', '자녀증여'],
    inputs: [
      { id: 'giftAmount', label: '증여할 현금/재산 평가 가격', type: 'number', defaultValue: 150000000, unit: '원', unitPosition: 'suffix', section: '증여 재산 세부 정보' },
      { id: 'relation', label: '증여인과 수증인의 가족 관계', type: 'select', defaultValue: 'parent_adult', options: [{ label: '직계존속 (부모 ➔ 성인 직계자녀 - 5천만원 공제)', value: 'parent_adult' }, { label: '직계존속 (부모 ➔ 미성년 자녀 - 2천만원 공제)', value: 'parent_minor' }, { label: '배우자 증여 (6억 원 공제 한도)', value: 'spouse' }, { label: '직계비속 (자녀 ➔ 부모 - 5천만원 공제)', value: 'descendant' }, { label: '기타 6촌 이내 혈족, 4촌 인척 (1천만원 공제)', value: 'relatives' }, { label: '제3자 및 타인 증여 (공제 없음)', value: 'none' }], section: '증여 인지 요율 설정' }
    ],
    calculate: (inputs) => {
      const amount = Number(inputs.giftAmount) || 0;
      const relation = inputs.relation || 'parent_adult';

      let deduction = 0;
      if (relation === 'parent_adult') deduction = 50000000;
      else if (relation === 'parent_minor') deduction = 20000000;
      else if (relation === 'spouse') deduction = 600000000;
      else if (relation === 'descendant') deduction = 50000000;
      else if (relation === 'relatives') deduction = 10000000;

      const taxableBase = Math.max(0, amount - deduction);

      // 한국 소득 증여세 5단계 누진 적용
      let tax = 0;
      let limitMsg = '';
      if (taxableBase <= 100000000) {
        tax = taxableBase * 0.1;
      } else if (taxableBase <= 500000000) {
        tax = (taxableBase * 0.2) - 10000000;
      } else if (taxableBase <= 1000000000) {
        tax = (taxableBase * 0.3) - 60000000;
      } else if (taxableBase <= 3000000000) {
        tax = (taxableBase * 0.4) - 160000000;
      } else {
        tax = (taxableBase * 0.5) - 460000000;
      }

      // 자진 신고 할인 세액공제 (기본 3%)
      const discount = Math.round(tax * 0.03);
      const netTax = Math.max(0, tax - discount);

      const chartData = [
        { name: '공제 한도 가액', value: Math.min(amount, deduction) },
        { name: '진정 과세 대상액 (과표)', value: taxableBase },
        { name: '산정된 증여세 세고', value: netTax }
      ];

      return {
        results: [
          { label: '납부할 신고 증여세액 최종 합산', value: `${Math.round(netTax).toLocaleString()} 원`, rawValue: netTax, displayType: 'text', info: '3% 자진 신고 세액 공제가 가미 보정된 최종 부과 가치입니다.' },
          { label: '가족관계에 따른 면제 공제 한도', value: `${deduction.toLocaleString()} 원`, rawValue: deduction, displayType: 'text' },
          { label: '과세 표준액 ( taxable base )', value: `${taxableBase.toLocaleString()} 원`, rawValue: taxableBase, displayType: 'text' },
          { label: '자진신고 보정 우대 세액 (3% 공제)', value: `${discount.toLocaleString()} 원`, rawValue: discount, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '부모와 자식 간 거래, 혹은 신혼 부부 증여 시 합법 한도 안에서 절세를 정렬 계산하게 도와주는 최적의 시뮬레이터입니다.',
      formula: '과세표준 = (증여가액 - 관계별 인적공제액), 증여세 = 과세표준 * 초과누진구간세율 - 누진공제액',
      tips: [
        '성인 자녀 공제 5천만 원 한도는 10년간 누적된 수치를 기준으로 합산하므로 사전 연혁 간격을 조정 배분하십시오.'
      ],
      faqs: [
        { question: '생활비 송금이나 결혼 축의금도 증여세가 적용되나요?', answer: '사회 통념상 허용되는 결혼 축의금이나 일상 학자금, 생활 소모 비용은 본래 증여 비과세 대상으로 규정됩니다.' }
      ]
    },
    relatedSlugs: ['vat-tax-calculator', 'business-bep-calculator']
  },

  // 5. UNEMPLOYMENT BENEFIT CALCULATOR
  {
    title: '실업급여 (구직급여) 모의 지급 계산기',
    slug: 'unemployment-benefit-calculator',
    category: 'salary',
    description: '이직일 전 3개월 평균 고정 임금 및 고용보험 납부 세부 연령, 총 가입 연수 이력을 연계하여 산정 한도 상한선에 부합하는 소출 구직 수령급 일력과 만기 총액을 도출합니다.',
    aliases: ['실업급여', '구직급여', '고용주휴', '실직임금', '권고사직수당'],
    inputs: [
      { id: 'dailyWage', label: '퇴직 전 3개월 평균 1일 임금 (세전)', type: 'number', defaultValue: 100000, unit: '원', unitPosition: 'suffix', section: '이직 전 평균 급여 사항' },
      { id: 'coveragePeriod', label: '고용보험 피보험 기간 (가입 기간)', type: 'select', defaultValue: '3_5', options: [{ label: '1년 미만 가입 이력', value: 'under_1' }, { label: '1년 이상 ~ 3년 미만', value: '1_3' }, { label: '3년 이상 ~ 5년 미만', value: '3_5' }, { label: '5년 이상 ~ 10년 미만', value: '5_10' }, { label: '10년 이상 연안 수급권', value: 'over_10' }], section: '피보험 내역 조건 설정' },
      { id: 'ageRange', label: '퇴직 시점 기준 만 연령 나이', type: 'select', defaultValue: 'under_50', options: [{ label: '만 50세 미만 직장인', value: 'under_50' }, { label: '만 50세 이상 혹은 장애 등급 수혜자', value: 'over_50_disabled' }], section: '피보험 내역 조건 설정' }
    ],
    calculate: (inputs) => {
      const dailyWage = Number(inputs.dailyWage) || 0;
      const coverage = inputs.coveragePeriod || '3_5';
      const age = inputs.ageRange || 'under_50';

      // 2026 대한민국 고용보험 구직급여 연산 반영
      // 1일 구직급여액 = 평균임금의 60%
      let baseDailyBenefit = dailyWage * 0.6;
      
      // 상한액 하한액 홀딩 (2026 기준 보정)
      const maxDaily = 66000; 
      const minDaily = 60120; // 최저임금 연동 하한가 가이드 보정선

      if (baseDailyBenefit > maxDaily) baseDailyBenefit = maxDaily;
      if (baseDailyBenefit < minDaily) baseDailyBenefit = minDaily;

      // 피보험 및 수급 나이에 따른 최종 보장 일수 (2026년 규정 반영)
      let payoutDays = 90;
      const isOver50 = age === 'over_50_disabled';

      if (coverage === 'under_1') {
        payoutDays = 120; // 1년 미만은 연령 무관 통상 120일
      } else if (coverage === '1_3') {
        payoutDays = isOver50 ? 180 : 150;
      } else if (coverage === '3_5') {
        payoutDays = isOver50 ? 210 : 180;
      } else if (coverage === '5_10') {
        payoutDays = isOver50 ? 240 : 210;
      } else if (coverage === 'over_10') {
        payoutDays = isOver50 ? 270 : 240;
      }

      const totalBenefit = baseDailyBenefit * payoutDays;

      const chartData = [
        { name: '보장 일 소강비', value: Math.round(baseDailyBenefit) },
        { name: '연계 만기 총수령 타겟액 (1000원 단위)', value: Math.round(totalBenefit / 1000) }
      ];

      return {
        results: [
          { label: '만기 예정 구직급여 세전 총액', value: `${Math.round(totalBenefit).toLocaleString()} 원`, rawValue: totalBenefit, displayType: 'text', info: '선택한 가입 이력과 만 연령에 부과되어 책정 진행되는 전체 구직급여 최종액입니다.' },
          { label: '산출 일일 보정 구직 수당액', value: `${Math.round(baseDailyBenefit).toLocaleString()} 원/일`, rawValue: baseDailyBenefit, displayType: 'text' },
          { label: '법정 정비 적용 총 수혜 보장일수', value: `${payoutDays} 일간 수혜`, rawValue: payoutDays, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '비자발적 퇴사 시 구직 전형 기간 동안 안정된 생활과 조속한 업무 복귀 장려를 도모해 주는 국가 구직급여 사전 가이드입니다.',
      formula: '구직급여 일액 = 이직 전 평균임금 * 60% (상하한 범위 제어 연동)',
      tips: [
        '퇴사 직후 지체 않고 본인의 주민관할 고용플러스 센터에 권고사직 실업 연동 수급 수취 신청을 접수해야 당일 손실이 발생하지 않습니다.'
      ],
      faqs: [
        { question: '자발적 사직의 경우 실업 구직비 세액 수령은 일체 불가능한가요?', answer: '정상 자발 퇴사는 기본 비대상이나, 임금체불 연속, 사측의 보정 왕따 등 회피 불가 강제 노동 일탈 시 증빙 확인을 거치면 예외 인정 가능합니다.' }
      ]
    },
    relatedSlugs: ['net-salary-calculator', 'hourly-to-salary-calculator']
  },

  // 6. STEPS AND ACCUMULATED SAVINGS ESTIMATOR (ROI)
  {
    title: '투자 자산 대비 수익률 (ROI) 및 원금 회수 계산기',
    slug: 'roi-calculator',
    category: 'investment',
    description: '특정 비즈니스나 오프라인 상가 장비 취득, 자산 구매 시 초기 투하 자본금 대비 만기 수익률(ROI) 및 분할 회수 자본 기간을 다차원 연산합니다.',
    aliases: ['roi', '투자수익률', '회수기간', '수익가치', '영업수익'],
    inputs: [
      { id: 'initialInvestment', label: '초기 자산 투하 총예산', type: 'number', defaultValue: 50000000, unit: '원', unitPosition: 'suffix', section: '투자 원리 구성' },
      { id: 'finalValue', label: '자산 매도 또는 최종 현재가치', type: 'number', defaultValue: 65000000, unit: '원', unitPosition: 'suffix', section: '투자 만기 가치' },
      { id: 'monthlyCashFlow', label: '정기 보유 기간 월 수익 잉여금', type: 'number', defaultValue: 1500000, unit: '원', unitPosition: 'suffix', section: '투자 만기 가치' },
      { id: 'holdingMonths', label: '보유한 실기간 소요연수', type: 'number', defaultValue: 12, unit: '개월', unitPosition: 'suffix', section: '목표 투자 기간' }
    ],
    calculate: (inputs) => {
      const initial = Number(inputs.initialInvestment) || 1;
      const finalVal = Number(inputs.finalValue) || 0;
      const mFlow = Number(inputs.monthlyCashFlow) || 0;
      const months = Number(inputs.holdingMonths) || 12;

      const totalCashFlow = mFlow * months;
      const totalGain = (finalVal + totalCashFlow) - initial;
      const roi = (totalGain / initial) * 100;
      const annualRoi = months > 0 ? (roi / (months / 12)) : 0;
      const breakEvenMonths = mFlow > 0 ? initial / mFlow : 0;

      const chartData = [
        { name: '총 지출 투하금', value: initial },
        { name: '누적 운영 현금영수', value: totalCashFlow },
        { name: '자산 잔여처분가치', value: finalVal }
      ];

      return {
        results: [
          { label: '총자본 투자수익률 (ROI)', value: `${roi.toFixed(1)} %`, rawValue: roi, displayType: 'text', info: '매각 및 보유 현금 창출분을 합치고 누계 지출 대비 벌어들인 최종 자산 성장 배율입니다.' },
          { label: '연평균 가용 자본 이율 환산액', value: `${annualRoi.toFixed(1)} % / 연간`, rawValue: annualRoi, displayType: 'text' },
          { label: '운영 보유수익 월 원금 순수 정산이익', value: `${totalGain.toLocaleString()} 원`, rawValue: totalGain, displayType: 'text' },
          { label: '월 운영금 기준 단순 원금 회수기간', value: breakEvenMonths > 0 ? `${breakEvenMonths.toFixed(1)} 개월 소요` : '운영 현출 없음', rawValue: breakEvenMonths, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '사업 창업 투자, 소규모 가구 부동산 부업, 혹은 가상 주식 투입 대비 실질 자본 성장 효율과 손익 복귀 타임라인을 파악하는 핵심 수식입니다.',
      formula: 'ROI = [(만기자산가치 + 보유기간 누계현금흐름) - 초기투자액] / 초기투자액 * 100',
      tips: [
        '단순 액수만 보기보다 해당 원금 회수를 위한 고정 리스크 감내 기간의 비용 가치를 기회비용과 상호 저울질하십시오.'
      ],
      faqs: [
        { question: '좋은 ROI 도달율은 표준적으로 어느 수치인가요?', answer: '수취 도메인 연한에 따르나 일반 안정 상가 주식 포트는 연평균 7~10% 이상 수렴 시 몹시 훌륭한 것으로 판별합니다.' }
      ]
    },
    relatedSlugs: ['compound-interest-calculator', 'business-bep-calculator']
  },

  // 7. STOCK AVERAGE DOWN CALCULATOR
  {
    title: '주식 평단가 및 물타기 추가매수 계산기',
    slug: 'stock-ladders-calculator',
    category: 'investment',
    description: '현재 보유한 한도 주식 잔수 및 평균 매수 단가와, 추가 매수할 신규 수량/체결가를 통합 평단가로 조합하고 주가 반등 시의 목표 탈출 손익을 시각화합니다.',
    aliases: ['물타기', '평단가', '평단계산기', '추가매수', '주식평단', '불타기'],
    inputs: [
      { id: 'currentPrice', label: '1차 보유 주식 평균 단가', type: 'number', defaultValue: 85000, unit: '원', unitPosition: 'suffix', section: '현재 보유 잔고 현황' },
      { id: 'currentQty', label: '현재 보유 수량 (계좌)', type: 'number', defaultValue: 100, unit: '주', unitPosition: 'suffix', section: '현재 보유 잔고 현황' },
      { id: 'newPrice', label: '추가 매수할 목표 주가', type: 'number', defaultValue: 65000, unit: '원', unitPosition: 'suffix', section: '신규 추가 투입 예정' },
      { id: 'newQty', label: '추가 매수할 수량', type: 'number', defaultValue: 150, unit: '주', unitPosition: 'suffix', section: '신규 추가 투입 예정' }
    ],
    calculate: (inputs) => {
      const p1 = Number(inputs.currentPrice) || 0;
      const q1 = Number(inputs.currentQty) || 0;
      const p2 = Number(inputs.newPrice) || 0;
      const q2 = Number(inputs.newQty) || 0;

      const cost1 = p1 * q1;
      const cost2 = p2 * q2;
      const totalCost = cost1 + cost2;
      const totalQty = q1 + q2;

      const avgPrice = totalQty > 0 ? totalCost / totalQty : 0;
      const priceDropRatio = p1 > 0 ? ((p1 - avgPrice) / p1) * 100 : 0;

      const chartData = [
        { name: '1차 매입액 비중', value: cost1 },
        { name: '추가 물타기 투입액', value: cost2 }
      ];

      return {
        results: [
          { label: '조합 완료된 최종 평단가 (세후)', value: `${Math.round(avgPrice).toLocaleString()} 원/주`, rawValue: avgPrice, displayType: 'text', info: '추가 자금 원리가 모두 투하된 후의 진정한 가용 개당 평단 수치입니다.' },
          { label: '평단가 인하 효과 (기존대비)', value: `${priceDropRatio.toFixed(1)}% 하향 낮춤`, rawValue: priceDropRatio, displayType: 'text' },
          { label: '최종 조합 누적 보유주수', value: `${totalQty} 주`, rawValue: totalQty, displayType: 'text' },
          { label: '전체 총 투하 인수자금 합계', value: `${totalCost.toLocaleString()} 원`, rawValue: totalCost, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '주식 평단가 물타기 예측기는 마이너스 계좌 상태에서 반등 탈출을 위한 필수 기하수학 연산 시나리오를 가동합니다.',
      formula: '신규 평균 평단가 = (보유량 * 현재평단 + 추가량 * 신규매수가) / (보유량 + 추가량)',
      tips: [
        '수급 세력이 붕괴되고 가치가 소멸되는 우하향 저품질 잡주에 무한 물타기를 자행하는 것은 조달 파산으로 가니 조심하십시오.'
      ],
      faqs: [
        { question: '불타기와 물타기는 어떻게 다릅니까?', answer: '물타기는 손 손실 계좌 단가를 낮추는 하향 매수이고, 불타기는 지상 우상향 추세에 자금을 얹어 기대 이익을 복가하는 상향 추격매수법입니다.' }
      ]
    },
    relatedSlugs: ['dividend-calculator', 'percentage-calculator']
  },

  // 8. CRYPTOCURRENCY PROFIT CALCULATOR
  {
    title: '가상자산 및 코인 수익 계산기',
    slug: 'crypto-profit-calculator',
    category: 'investment',
    description: '매수 거래 정가와 코인 거래 개수, 실시간 매도 목표 가격과 거래 수수료를 결합 정산하여 순수 발생 원금 및 세전 투자 이율을 확인합니다.',
    aliases: ['비트코인', '이더리움', '코인수익', '가상자산', '코인수익률'],
    inputs: [
      { id: 'buyPrice', label: '코인/토블록 1개당 매수 체결가', type: 'number', defaultValue: 95000000, unit: '원', unitPosition: 'suffix', section: '코인 매매 설정' },
      { id: 'buyQty', label: '매입/보유한 코인 개수', type: 'number', defaultValue: 0.15, unit: '개', unitPosition: 'suffix', section: '코인 매매 설정' },
      { id: 'sellPrice', label: '매도 예정 수렴 타겟 목표가', type: 'number', defaultValue: 115000000, unit: '원', unitPosition: 'suffix', section: '코인 매매 설정' },
      { id: 'feeRate', label: '가상자산 오더 거래 수수료율', type: 'range', defaultValue: 0.05, min: 0.01, max: 0.5, step: 0.01, unit: '%', unitPosition: 'suffix', section: '부가 비용 거래' }
    ],
    calculate: (inputs) => {
      const buyP = Number(inputs.buyPrice) || 0;
      const qty = Number(inputs.buyQty) || 0;
      const sellP = Number(inputs.sellPrice) || 0;
      const fee = Number(inputs.feeRate) || 0.05;

      const initialCost = buyP * qty;
      const grossSale = sellP * qty;

      const totalFee = (initialCost + grossSale) * (fee / 100);
      const netGain = grossSale - initialCost - totalFee;
      const profitRate = initialCost > 0 ? (netGain / initialCost) * 100 : 0;

      const chartData = [
        { name: '투입 순원금', value: Math.round(initialCost) },
        { name: '수수료 차감 순손익', value: Math.round(netGain) }
      ];

      return {
        results: [
          { label: '가상자산 실 매도 순손익금', value: `${Math.round(netGain).toLocaleString()} 원`, rawValue: netGain, displayType: 'text', info: '양방향 매수 매도 거래 수수료가 전액 차감 반영된 실제 손에 쥐는 세전 결과입니다.' },
          { label: '최종 가동 순수 투자수익률', value: `${profitRate.toFixed(2)} %`, rawValue: profitRate, displayType: 'text' },
          { label: '거래소 지출 총 수수료 부담액', value: `${Math.round(totalFee).toLocaleString()} 원`, rawValue: totalFee, displayType: 'text' },
          { label: '매수 원금 규모', value: `${Math.round(initialCost).toLocaleString()} 원`, rawValue: initialCost, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '변동이 격렬한 비트코인, 이더리움 및 소총 알트코인 매수 매도 구간에 정교한 차익 연동 시뮬레이션을 수행합니다.',
      formula: '순손익 = (매도가 * 수량 - 매수가 * 수량) - 복합수수료총액',
      tips: [
        '세금 징수 기준년이 도래할 때 국내 해외 거래 여부 및 관련 법정 소득 분할 적용선을 검토하여 소득 세법을 대비하세요.'
      ],
      faqs: [
        { question: '국내 거래소(업비트, 빗썸 등) 표준 수수료 범위는 어떻게 되나요?', answer: '원화 대면 시장 이양 시 대략 0.05% ~ 0.25% 범위 안팎에서 예약 거래 및 시장 가격 매칭 수수료가 차등 보정 적용됩니다.' }
      ]
    },
    relatedSlugs: ['stock-ladders-calculator', 'percentage-calculator']
  },

  // 9. RULE OF 72 CALCULATOR
  {
    title: '72 법칙 (복리 원금 2배 달성 기한 계산기)',
    slug: 'rule-of-72-calculator',
    category: 'investment',
    description: '매년 기대할 수 있는 복리 이율/수익률을 적용하여, 투자한 초기 원금이 정확히 2배로 불어나는 자산 소강 연수 주기를 추정합니다.',
    aliases: ['72법칙', '원금두배', '원금2배', '복리마법', '자산배가'],
    inputs: [
      { id: 'principal', label: '거치할 원금 총량', type: 'number', defaultValue: 10000000, unit: '원', unitPosition: 'suffix', section: '기준 금액 수치' },
      { id: 'rate', label: '예상 연간 가중 복리 수익률', type: 'range', defaultValue: 8.0, min: 1, max: 30, step: 0.5, unit: '%', unitPosition: 'suffix', section: '자산 복리 수익률' }
    ],
    calculate: (inputs) => {
      const principal = Number(inputs.principal) || 0;
      const rate = Number(inputs.rate) || 8.0;

      // 72 법칙 지수 연산
      const ruleYears = 72 / rate;
      const actualYears = Math.log(2) / Math.log(1 + (rate / 100));

      const finalAmount = principal * 2;

      const chartData: any[] = [];
      const interval = Math.max(1, Math.round(actualYears / 4));
      for (let y = 0; y <= Math.ceil(actualYears); y += interval) {
        chartData.push({
          label: `${y}년차`,
          '복리 적립 규모': Math.round(principal * Math.pow(1 + (rate / 100), y))
        });
      }

      return {
        results: [
          { label: '72 법칙 기준 2배 도달 완료 기한', value: `${ruleYears.toFixed(1)} 년 소요`, rawValue: ruleYears, displayType: 'text', info: '금융학의 약식 72 법칙 공식에 입각하여 가계 자산이 2배로 증대되는 주기선입니다.' },
          { label: '전형 학술 정밀 연산 도달 기한', value: `${actualYears.toFixed(2)} 년 소요`, rawValue: actualYears, displayType: 'text' },
          { label: '성장 달성 시 최종 자산 총계', value: `${finalAmount.toLocaleString()} 원`, rawValue: finalAmount, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '인터넷 금융학의 교과 원리에 기초해 72의 수학 법칙을 연동합니다. 연 8% 복리 복배시 2배 확충 성장에 대략 9년이 소요됨을 즉각 확인하십시오.',
      formula: '2배 도달 소요 연안 ≒ 72 / 연간 복리 기대 수익률(%)',
      tips: [
        '복리 주기가 대중적으로 축소(분기 복리 등)될 시 연 도달 구간은 약 단축될 수 있으므로 정량 복리 계산기를 우회 병행하십시오.'
      ],
      faqs: [
        { question: '72 법칙은 복리에만 대입되는 수식인가요?', answer: '예, 원금 잔여분이 복리 승수로 누적 가산되어 배가 성장하는 기하급적 환경에서만 정교한 도출 피드백을 실현해 냅니다.' }
      ]
    },
    relatedSlugs: ['compound-interest-calculator', 'savings-growth-calculator']
  },

  // 10. SAFE WITHDRAWAL RATE (SWR) CALCULATOR
  {
    title: '은퇴자산 4% 인출 안정도 계산기 (SWR 은퇴생존 룰)',
    slug: 'swr-4percent-calculator',
    category: 'retirement',
    description: '파이어족 은퇴 연구인 벵겐 4% 인출 규칙에 입각해, 목표 은퇴 적립금과 매년 물가 연동 인출할 안정 액수 한도를 정량 검토합니다.',
    aliases: ['4%룰', '4%법칙', 'swr', 'fire족', '파이어족인출', '은퇴자산'],
    inputs: [
      { id: 'nestEgg', label: '은퇴 시점 확보 완료 예정 총 자산', type: 'number', defaultValue: 1000000000, unit: '원', unitPosition: 'suffix', section: '나의 은퇴 자산 규모' },
      { id: 'withdrawRate', label: '매 연도 연초 설정 인출율 비율 (%)', type: 'range', defaultValue: 4.0, min: 2.5, max: 7.0, step: 0.1, unit: '%', unitPosition: 'suffix', section: '안전 인출 정책' },
      { id: 'inflation', label: '연평균 기대 물가 가속률', type: 'number', defaultValue: 2.5, unit: '%', unitPosition: 'suffix', section: '안전 인출 정책' }
    ],
    calculate: (inputs) => {
      const egg = Number(inputs.nestEgg) || 0;
      const rate = Number(inputs.withdrawRate) || 4.0;
      const inf = Number(inputs.inflation) || 2.5;

      const firstYearOut = egg * (rate / 100);
      const monthlyOut = firstYearOut / 12;

      const chartData: any[] = [];
      let balance = egg;
      let yearlyOut = firstYearOut;
      // 30년간 시뮬레이션 (매년 자금은 인플레이션 반영 늘려 인출하며 보수 연 6.5% 세전 이율 투자 성장 가정)
      for (let y = 1; y <= 30; y += 5) {
        chartData.push({
          label: `${y}년차`,
          '예상 자산 잔고 대조군': Math.round(balance),
          '해당 연도 연 지출액': Math.round(yearlyOut)
        });
        balance = (balance - yearlyOut) * 1.065;
        yearlyOut = yearlyOut * (1 + (inf / 100));
      }

      return {
        results: [
          { label: '은퇴 첫해 안전 연간 인출 가능액', value: `${Math.round(firstYearOut).toLocaleString()} 원/연간`, rawValue: firstYearOut, displayType: 'text', info: '안전 한도로 설정해 은퇴 첫 연도에 통장에서 빼내 생활비로 할당할 순 금액입니다.' },
          { label: '월 평균 환산 가용 생활비 범주', value: `${Math.round(monthlyOut).toLocaleString()} 원/월`, rawValue: monthlyOut, displayType: 'text' },
          { label: '30년 자산 생존 적격도 평가', value: rate <= 4.0 ? '매우 안전 (생존 98% 이상)' : rate <= 5.0 ? '보통 (인플레이션 주의 요망)' : '위험군 (보정 자산 조기 소진 우려)', rawValue: 0, displayType: 'badge', badgeColor: rate <= 4.0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '조기 은퇴를 준비하는 FIRE족 군들에게 수십 년간 수조 원의 주식 시장 시계열을 입증한 미국 트리니티 스터디(Trinity Study) 연구 규율입니다.',
      formula: '첫해 인출 생활비 = 은퇴 완비 원금자산 * (SWR 설계 비율 / 100)',
      tips: [
        '시장 수익률이 몹시 저조한 은퇴 초기 하강기(Sequence of Returns Risk)에는 지출 몫을 탄력적으로 소폭 감축하면 생존 기간을 수배 늘릴 수 있습니다.'
      ],
      faqs: [
        { question: 'Bengon 4% 규칙은 물가 상승이 매번 어떻게 처리되나요?', answer: '둘째 해부터는 지출금을 원금 비율이 아닌, 첫해 지출 금액에 그해 실제 직면한 소비자물가 상승 누적 비율만큼 가산하여 출금 관리합니다.' }
      ]
    },
    relatedSlugs: ['retirement-planner', 'savings-growth-calculator']
  },

  // 11. MILITARY SAVINGS CALCULATOR
  {
    title: '군 장병 적금 (장병내일준비적금) 만기 계산기',
    slug: 'military-savings-calculator',
    category: 'military',
    description: '현역 장병이 가입하는 5% 고금리 장병내일준비적금의 군 비과세 혜택과 국가 재정 지원 구좌 매칭금(2026년 기준 100% 매칭 적용 완료)을 포함한 만기 수령금을 분석합니다.',
    aliases: ['군적금', '장병내일준비적금', '장병적금', '군인적금', '군인만기'],
    inputs: [
      { id: 'monthlyDeposit', label: '월 적립 금액 (최대 40만원)', type: 'select', defaultValue: 400000, options: [{ label: '400,000 원 (최대 한도)', value: 400000 }, { label: '300,000 원 리미트', value: 300000 }, { label: '200,000 원 기본 설정', value: 200000 }, { label: '100,000 원 소량', value: 100000 }], section: '장병 적금 가입 불입금' },
      { id: 'serviceTerm', label: '남은 복무 및 불입 기간 (월)', type: 'select', defaultValue: 18, options: [{ label: '18 개월 (육군 / 해병대 / 의경)', value: 18 }, { label: '20 개월 (해군 / 해양경찰)', value: 20 }, { label: '21 개월 (공군 / 사회복무요원)', value: 21 }], section: '납입 기간 설정' }
    ],
    calculate: (inputs) => {
      const deposit = Number(inputs.monthlyDeposit) || 400000;
      const months = Number(inputs.serviceTerm) || 18;

      // 2026년 군 장병적금 이자 규율 적용
      // 기본은행 이자율 연 5% 가정 및 비과세
      // 매칭지원금 2026 대한민국 100% 지원 확대 반영 (원리금 총합과 1:1 추가 적립)
      const totalPrincipal = deposit * months;
      
      // 월 복리가 없는 표준 정기 적금 세전 및 비과세 단리 이자 공식
      // 이자 = 월불입액 * [개월수 * (개월수 + 1) / 2] * (연리 / 12)
      const interestRate = 0.05;
      const bankInterest = deposit * (months * (months + 1) / 2) * (interestRate / 12);
      
      const bankTotal = totalPrincipal + bankInterest;
      // 정부 매칭 전액 재정 지원금 (2025/2026 기준 원리금의 100% 가산 지급)
      const matchingFund = bankTotal; 
      const grandTotal = bankTotal + matchingFund;

      const chartData = [
        { name: '군 저축 총원금', value: totalPrincipal },
        { name: '은행 적립 이자비', value: Math.round(bankInterest) },
        { name: '정부 100% 매칭지원금', value: Math.round(matchingFund) }
      ];

      return {
        results: [
          { label: '전역 시 만기 일괄 수령 총액', value: `${Math.round(grandTotal).toLocaleString()} 원`, rawValue: grandTotal, displayType: 'text', info: '네트 비과세 이자에 국가가 보조 지원하는 3대 재정 매칭 교환금까지 일괄 탑재한 실현 가치가치입니다.' },
          { label: '은행 비과세 원리금 소합계', value: `${Math.round(bankTotal).toLocaleString()} 원`, rawValue: bankTotal, displayType: 'text' },
          { label: '국가 공인 재정 매칭 환급 자금', value: `${Math.round(matchingFund).toLocaleString()} 원`, rawValue: matchingFund, displayType: 'text' },
          { label: '장병 본인 순수 적립 원금', value: `${totalPrincipal.toLocaleString()} 원`, rawValue: totalPrincipal, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '현 복무 중인 국군장병과 소집요원들의 가장 강력한 목돈 마련 처방인 장병내일준비적금의 가치 수식을 보여줍니다.',
      formula: '수령 최종자산 = (적립원금 + 은행 5% 비과세 이자) + 국가 매칭 지원 100% 자금',
      tips: [
        '복무 시작 후 신병 훈련소 등에서 일차 가입을 신속 수행하여 적금을 단 1개월이라도 이탈하지 말고 채우는 것이 손실 없는 지름길입니다.'
      ],
      faqs: [
        { question: '매칭지원금은 가입한 모두에게 부과 연동되나요?', answer: '예, 법정 정규 전역 일정을 준수하고 전역증 사본 등을 지참해 은행 만기 지점에 청구하면 차례로 국비 정산 가산됩니다.' }
      ]
    },
    relatedSlugs: ['military-discharge-calculator', 'savings-growth-calculator']
  },

  // 12. RENT VS BUY CALCULATOR
  {
    title: '주거 점유 월세 vs 매가 소요비용 비교 계산기',
    slug: 'rent-vs-buy-calculator',
    category: 'real-estate',
    description: '주택 자가 구매에 따르는 자산 이자 기회비용과 재산세, 감가상각을, 월세를 선택 시의 투자 대용 이익과 비교 연동하여 이상적 주거를 제언합니다.',
    aliases: ['월세비교', '집사기', '자가월세', '전세월세', '주택구매비용', '주거비용'],
    inputs: [
      { id: 'homeValue', label: '주택 매입 취득 정가', type: 'number', defaultValue: 500000000, unit: '원', unitPosition: 'suffix', section: '자가(매수) 선택 시' },
      { id: 'appreciation', label: '연평균 기대 주택 가격상승률', type: 'range', defaultValue: 2.0, min: -5, max: 10, step: 0.1, unit: '%', unitPosition: 'suffix', section: '자가(매수) 선택 시' },
      { id: 'monthlyRent', label: '월세 비교 대상 보정 월 임차료', type: 'number', defaultValue: 1200000, unit: '원', unitPosition: 'suffix', section: '임차(월세) 선택 시' },
      { id: 'opportunityCost', label: '자가 원금 대비 은행 기타 예금 금리', type: 'number', defaultValue: 3.5, unit: '%', unitPosition: 'suffix', section: '임차(월세) 선택 시' }
    ],
    calculate: (inputs) => {
      const hVal = Number(inputs.homeValue) || 1;
      const app = Number(inputs.appreciation) || 0;
      const mRent = Number(inputs.monthlyRent) || 0;
      const opp = Number(inputs.opportunityCost) || 3.5;

      const monthlyOpportunityCost = (hVal * (opp / 100)) / 12;
      const monthlyAppreciation = (hVal * (app / 100)) / 12;

      // 자가 유지 단순 계산 (기회소득 손실 - 주택 상승 기대치)
      const netMonthlyBuyCost = Math.round(monthlyOpportunityCost - monthlyAppreciation);
      const monthlyDifference = Math.abs(netMonthlyBuyCost - mRent);
      const recommendation = netMonthlyBuyCost < mRent ? '자가 매수 유리' : '월세 임차 유리';

      const chartData = [
        { name: '자가 실체 월기회비용', value: netMonthlyBuyCost },
        { name: '디폴트 월 지출 월세', value: mRent }
      ];

      return {
        results: [
          { label: '추천 주거 전략 판정', value: recommendation, rawValue: 0, displayType: 'badge', badgeColor: recommendation.includes('매수') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800' },
          { label: '자가(매수) 월 실체 기회비용', value: `${netMonthlyBuyCost.toLocaleString()} 원/월`, rawValue: netMonthlyBuyCost, displayType: 'text', info: '자가 원금이 묶이며 잃게 되는 기회 투자 수입에서 집값 연 상승 예상 폭을 상계 한 수치입니다.' },
          { label: '비교군 월세 단순 주거 지출비', value: `${mRent.toLocaleString()} 원/월`, rawValue: mRent, displayType: 'text' },
          { label: '매달 주거 의무 지출 오차 격차액', value: `${monthlyDifference.toLocaleString()} 원 차이`, rawValue: monthlyDifference, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '부동산 폭락 또는 연이율 정체 국면에서 집을 사서 소유하는 부담과 무작위 월세를 소비하는 것 중 가계에 유리한 길을 산정합니다.',
      formula: '자가 월 기회손실 = (주택가 * 타자산 이율% / 12) - (주택가 * 연 부동산상승률% / 12)',
      tips: [
        '집값이 하락할 우려나 취득세 및 수천만 원의 부동산 수수료를 감안할 때 거주 연한이 3년 이하라면 대체로 임차가 절대 안전 영역입니다.'
      ],
      faqs: [
        { question: '전세는 어떤 위치에 놓이나요?', answer: '전세는 보증금을 돌려받으므로 월 집세 지출이 0원에 까가우나, 전세자금 대출 이자 및 보증금 미반환 전세 사기 위험도 등을 종합 비용에 가세해야 올바릅니다.' }
      ]
    },
    relatedSlugs: ['mortgage-calculator', 'business-bep-calculator']
  },

  // 13. RENTAL YIELD CALCULATOR
  {
    title: '오피스텔 상가 부동산 임대 수익률 계산기',
    slug: 'rental-yield-calculator',
    category: 'real-estate',
    description: '부동산 매입 매매 대수 가격과 보증금, 담보 은행 대출 규모, 계약 월세 정보를 결합해 순수 발생 자본 대비 연 실체 임대 수익률을 도해 연산합니다.',
    aliases: ['임대수익률', '수익률', '오피스텔수익', '상가임대료', '수익형부동산'],
    inputs: [
      { id: 'purchasePrice', label: '부동산 총 투자 매입 금액', type: 'number', defaultValue: 250000000, unit: '원', unitPosition: 'suffix', section: '매물 기본 거래 정보' },
      { id: 'deposit', label: '보증금 회수 자금', type: 'number', defaultValue: 20000000, unit: '원', unitPosition: 'suffix', section: '매물 기본 거래 정보' },
      { id: 'monthlyRent', label: '임차 고객 청구 월세금', type: 'number', defaultValue: 900000, unit: '원', unitPosition: 'suffix', section: '매물 기본 거래 정보' },
      { id: 'loanAmount', label: '레버리지 담보 대출 금액', type: 'number', defaultValue: 100000000, unit: '원', unitPosition: 'suffix', section: '대출 및 이자 연계 수식' },
      { id: 'loanRate', label: '대출 연간 이자율 금리', type: 'number', defaultValue: 4.5, unit: '%', unitPosition: 'suffix', section: '대출 및 이자 연계 수식' }
    ],
    calculate: (inputs) => {
      const price = Number(inputs.purchasePrice) || 0;
      const deposit = Number(inputs.deposit) || 0;
      const mRent = Number(inputs.monthlyRent) || 0;
      const loan = Number(inputs.loanAmount) || 0;
      const lRate = Number(inputs.loanRate) || 0;

      // 레버리지 없는 등급
      const totalInvestmentNoLoan = Math.max(1, price - deposit);
      const annualIncomeNoLoan = mRent * 12;
      const yieldNoLoan = (annualIncomeNoLoan / totalInvestmentNoLoan) * 100;

      // 담보 레버리지 탑재 시
      const realEquity = Math.max(1, price - deposit - loan);
      const loanInterestAnnual = loan * (lRate / 100);
      const netAnnualIncomeWithLoan = (mRent * 12) - loanInterestAnnual;
      const yieldWithLoan = (netAnnualIncomeWithLoan / realEquity) * 100;

      const chartData = [
        { name: '무대출 환산 임대수익률 (%)', value: Number(yieldNoLoan.toFixed(2)) },
        { name: '레버리지 가세 레버리지수익률 (%)', value: Number(yieldWithLoan.toFixed(2)) }
      ];

      return {
        results: [
          { label: '레버리지(융자) 반영 자본 수익률', value: `${yieldWithLoan.toFixed(2)} % / 연간`, rawValue: yieldWithLoan, displayType: 'text', info: '담보 대출 이자를 제외한 순 세전 월세총합을 대출액을 제외한 실 불입 자기자산으로 환산한 값입니다.' },
          { label: '자기자본 100% 투입 시 기본 수익률', value: `${yieldNoLoan.toFixed(2)} % / 연간`, rawValue: yieldNoLoan, displayType: 'text' },
          { label: '실제 투입 완료 전 순수 자기 원금', value: `${realEquity.toLocaleString()} 원`, rawValue: realEquity, displayType: 'text' },
          { label: '은행 양방향 지출 연이자 지불 비용', value: `${Math.round(loanInterestAnnual).toLocaleString()} 원/연간`, rawValue: loanInterestAnnual, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '꼬마빌딩, 상가 및 직주근접 역세권 원룸의 실제 세전 부동산 수익 등급을 확인하도록 조율해 줍니다.',
      formula: '기본 수익률 = [연 임차총료 / (매물가 - 보증금)] * 100',
      tips: [
        '소매 임대 시 공실 연간 유지 비율이나 보수 관리비 중개수수료를 감안하여 기대치 수익에서 최소 1% 정도의 하향 보정을 두어 실 수지타산을 맞추세요.'
      ],
      faqs: [
        { question: '금리가 오를 때 레버리지 투자수익은 어떻게 변형되나요?', answer: '은행 대출 조달 이자 부하가 월세 수입을 잠식하게 되므로 도리어 무자본 기본 수익률 밑으로 역마진이 발생할 타격이 있습니다.' }
      ]
    },
    relatedSlugs: ['rent-vs-buy-calculator', 'mortgage-calculator']
  },

  // 14. EXTREMELY HELPFUL FITNESS WHR CALCULATOR
  {
    title: '복부 비만도 및 허리-엉덩이 비율(WHR) 계산기',
    slug: 'whr-calculator',
    category: 'health',
    description: '허리 둘레와 엉덩이 둘레 측정 치수를 바탕으로 하여 세계보건기구(WHO) 기준 복부 내장 지방 분포 성향 WHR(Waist-to-Hip Ratio) 등급을 정렬 연산합니다.',
    aliases: ['whr', '복부비만', '둘레비열', '내장지방', '엉덩이둘레', '허리둘레비율'],
    inputs: [
      { id: 'waist', label: '허리 가장 가는 지점 둘레', type: 'number', defaultValue: 32, unit: '인치 (inch)', unitPosition: 'suffix', section: '신체 부위별 연산' },
      { id: 'hip', label: '엉덩이 가장 넓은 부위 둘레', type: 'number', defaultValue: 38, unit: '인치 (inch)', unitPosition: 'suffix', section: '신체 부위별 연산' },
      { id: 'gender', label: '생물학적 대상 성별', type: 'select', defaultValue: 'male', options: [{ label: '남성 (최적WH률 0.90 미만)', value: 'male' }, { label: '여성 (최적WH률 0.85 미만)', value: 'female' }], section: '기본 프로필 요인' }
    ],
    calculate: (inputs) => {
      const wait = Number(inputs.waist) || 1;
      const hip = Number(inputs.hip) || 1;
      const isMale = inputs.gender === 'male';

      const whr = wait / hip;
      let status = '적정';
      
      if (isMale) {
        if (whr >= 0.95) status = '복부 고도비만';
        else if (whr >= 0.90) status = '정상 경계선';
        else status = '안정적 건강 상태';
      } else {
        if (whr >= 0.85) status = '복부 고도비만';
        else if (whr >= 0.80) status = '정상 경계선';
        else status = '안정적 건강 상태';
      }

      const chartData = [
        { name: '도출 허리/엉덩이 비', value: Number(whr.toFixed(3)) },
        { name: '표준 요건 상한선', value: isMale ? 0.90 : 0.85 }
      ];

      return {
        results: [
          { label: '허리-엉덩이 둘레 비율 (WHR)', value: `${whr.toFixed(3)}`, rawValue: whr, displayType: 'text', info: '엉덩이 뼈 수평 단면 둘레 대비 명치 밑 허리 둘레의 정량 분포 공식입니다.' },
          { label: '복부 내장지방 건강 등급 진단', value: status, rawValue: 0, displayType: 'badge', badgeColor: status.includes('비만') ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '단순 체중 BMI 정보에서 누락되는 상체 복부 내장지방 누적 위험을 WHO 규격 둘레로 즉각 측정하는 자가 임상의학 연동 도구입니다.',
      formula: 'WHR = 허리 둘레 측정치 / 엉덩이 둘레 측정치',
      tips: [
        '허리 줄자 측정 시에 숨을 완전히 내쉬고 배를 들이밀지 않은 표준 편평 상태에서 배꼽 바로 윗단을 잡는 게 대단히 합당합니다.'
      ],
      faqs: [
        { question: 'WHR 배율이 중요한 임상 이유는 무엇인가요?', answer: '허리 배율이 가파를수록 복부 장기 사이에 고지혈, 염증성 지질 물질이 차있다는 결정적 증표이며 고혈압 연계 확률을 표방합니다.' }
      ]
    },
    relatedSlugs: ['bmi-calculator', 'bmr-calculator']
  },

  // 15. YMCA BODY FAT CALCULATOR
  {
    title: '체지방률 YMCA 간편 신체 계산기',
    slug: 'body-fat-ymca-calculator',
    category: 'health',
    description: '체중과 성별, 정확한 허리 단면 둘레 비중만을 결합하여 미국의 체육협회 학술 YMCA 공식을 통해 대정 체지방 비율을 즉각 모의 산출합니다.',
    aliases: ['체지방량', 'ymca체지방', '허리둘레체지방', '지방비율'],
    inputs: [
      { id: 'weight', label: '나의 현재 몸무게', type: 'number', defaultValue: 75, unit: 'kg', unitPosition: 'suffix', section: '실측 치수 등록' },
      { id: 'waist', label: '허리 둘레 (중간 지점)', type: 'number', defaultValue: 84, unit: 'cm', unitPosition: 'suffix', section: '실측 치수 등록' },
      { id: 'gender', label: '대상 프로필 성별', type: 'select', defaultValue: 'male', options: [{ label: '남성', value: 'male' }, { label: '여성', value: 'female' }], section: '기본 프로필 요인' }
    ],
    calculate: (inputs) => {
      const w = Number(inputs.weight) || 75;
      const waistCm = Number(inputs.waist) || 84;
      const isMale = inputs.gender === 'male';

      // YMCA 공식 파운드 및 인치 환산 변환 계산
      const wLbs = w * 2.20462;
      const waistInch = waistCm * 0.393701;

      let fatPercent = 0;
      if (isMale) {
        fatPercent = ((4.15 * waistInch - 0.082 * wLbs - 98.42) / wLbs) * 100;
      } else {
        fatPercent = ((4.15 * waistInch - 0.082 * wLbs - 76.76) / wLbs) * 100;
      }

      fatPercent = Math.max(3, Math.min(60, fatPercent));

      const chartData = [
        { name: '순수 체지방 지분 (%)', value: Number(fatPercent.toFixed(1)) },
        { name: '재지방 (골격/기타근육) (%)', value: Number((100 - fatPercent).toFixed(1)) }
      ];

      return {
        results: [
          { label: 'YMCA 공식 환산 체지방률', value: `${fatPercent.toFixed(1)} %`, rawValue: fatPercent, displayType: 'text', info: '허리 치수와 체중 원리에 입각해 산정하는 공인 인체 역학적 지방 비례치입니다.' },
          { label: '실 체지방 환산 절대무게', value: `${(w * (fatPercent / 100)).toFixed(1)} kg`, rawValue: w * (fatPercent / 100), displayType: 'text' },
          { label: '지방 분류 건강 소견', value: isMale ? (fatPercent <= 14 ? '운동선수 수준' : fatPercent <= 24 ? '표준 건강' : '체지방 과다선') : (fatPercent <= 20 ? '피트니스형' : fatPercent <= 31 ? '표준 건강' : '급격 체지방 과다'), rawValue: 0, displayType: 'badge', badgeColor: 'bg-orange-100 text-orange-850' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '종합 피트니스에서 캘리퍼스 측정 기구가 소실되거나 전자기기 인바디 누락 시 신장 없이도 둘레 수학 법칙으로 보정 체지방을 도출하는 훌륭한 수단입니다.',
      formula: '체지방량(%) ≒ [복합 수치 비례치(허리/체중)] 대비 YMCA 상수식',
      tips: [
        '아침 공복에 동일 수평 위치의 배꼽 기준 둘레로 실측 정리하여 매칭하셔야 가장 흔들림 없는 타당한 비교값이 추적됩니다.'
      ],
      faqs: [
        { question: '전자기 생체 임피던스(Inbody) 대비 정확도는 어떠한가요?', answer: '수분 섭취량이나 컨디션 편차에 따라 전기 신호가 변하는 인바디에 비해, YMCA 둘레 방식이 인체 부피 기하학 특성상 도리어 연속 추적 오차가 적게 나타납니다.' }
      ]
    },
    relatedSlugs: ['whr-calculator', 'bmi-calculator']
  },

  // 16. TARGET HEART RATE CALCULATOR
  {
    title: '운동 목적 심박수 (카르보넨 공식) 계산기',
    slug: 'target-heart-rate-calculator',
    category: 'health',
    description: '안정 시 심박수와 만 연령에 따른 여유 심박수를 조합 연산하여, 다이어트 및 유산소 운동 효율을 최대화할 수 있는 적정 목표 심박 구간을 계산합니다.',
    aliases: ['카르보넨', '목표심박수', '심박수계산기', '안정심박수', '최대심박수', '유산소구간'],
    inputs: [
      { id: 'age', label: '나의 만 나이 설정', type: 'number', defaultValue: 30, unit: '세', unitPosition: 'suffix', section: '기본 프로필 요인' },
      { id: 'restingHeartRate', label: '안정 시 심박수 (아침 공복 측정)', type: 'number', defaultValue: 65, unit: 'BPM', unitPosition: 'suffix', section: '신체 부위별 연산' },
      { id: 'intensity', label: '희망 훈련 운동 심폐 강도 (%)', type: 'select', defaultValue: '65_75', options: [{ label: '지방 연소 및 체중 저강도 (60% ~ 70%)', value: '60_70' }, { label: '심폐 기능 향상 중강도 (70% ~ 80%)', value: '70_80' }, { label: '고강도 프로 인터벌 스포츠 (80% ~ 90%)', value: '80_90' }], section: '신체 부위별 연산' }
    ],
    calculate: (inputs) => {
      const age = Number(inputs.age) || 30;
      const resting = Number(inputs.restingHeartRate) || 65;
      const intensity = inputs.intensity || '65_75';

      let lowPct = 0.6;
      let highPct = 0.7;
      if (intensity === '70_80') { lowPct = 0.7; highPct = 0.8; }
      else if (intensity === '80_90') { lowPct = 0.8; highPct = 0.9; }

      // 카르보넨 공식
      // 최대심박수 = 220 - 나이
      const maxHr = 220 - age;
      const hrReserve = maxHr - resting;

      const targetLow = Math.round(hrReserve * lowPct + resting);
      const targetHigh = Math.round(hrReserve * highPct + resting);

      const chartData = [
        { name: '나의 안정 심박수', value: resting },
        { name: '지정 훈련구간 타겟최소', value: targetLow },
        { name: '지정 훈련구간 타겟최대', value: targetHigh },
        { name: '위험 도달 한계최대', value: maxHr }
      ];

      return {
        results: [
          { label: '최적 유효 운동 심박수 기준 범위', value: `${targetLow} ~ ${targetHigh} BPM`, rawValue: targetLow, displayType: 'text', info: '훈련 상태 시 가장 효과적으로 체지방 연소와 심폐 증진을 교환할 수 있는 밴드 구간입니다.' },
          { label: '연령 대비 최대 심박 위험 한계치', value: `${maxHr} BPM`, rawValue: maxHr, displayType: 'text' },
          { label: '심폐 운동 설계 권격 조언', value: intensity.includes('60') ? '안전한 지방 대사 전력 질주' : '지속적인 심장 단련 페이스 유지', rawValue: 0, displayType: 'badge', badgeColor: 'bg-emerald-100 text-emerald-800' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '카르보넨(Karvonen) 공식을 탑재한 최적의 훈련 조력기입니다. 스마트워치에 표시되는 심박 지수가 건강 구도에 맞게 운동하도록 실시간 설계합니다.',
      formula: '목표 심박수 = (최대심박수 - 안정시심박수) * 운동강도(%) + 안정시심박수',
      tips: [
        '안정 시 심박수는 기상 직후 침대 위에서 가볍게 손목 맥박을 1분간 측정한 치수로 입력해야 정확도가 수배 치솟습니다.'
      ],
      faqs: [
        { question: '최대 심박수 산정 표준 공식은 믿을 만한가요?', answer: '수백 명의 종합 임상 군들의 평균치인 "220-나이"를 근간 삼으며, 숙련된 프로 스포츠 맨들은 보다 상향된 개인 맥박을 갖습니다.' }
      ]
    },
    relatedSlugs: ['body-fat-ymca-calculator', 'bmr-calculator']
  },

  // 17. SCHOOL SCORE STANDARD DEVIATION CALCULATOR
  {
    title: '고교 내신 등급 표준편차 석차 계산기',
    slug: 'rank-standard-deviation-calculator',
    category: 'education',
    description: '시험 취득 점수와 해당 과목 평균점, 과목 전체 표준편차 및 수강 총학생수를 이용하여, 통계 전형 정규분포 기준 추정 석차와 등급을 대략 도출합니다.',
    aliases: ['표준편차', '내신등급', '표준점수', '석차계산기', '고등학교내신', '정규분포석차'],
    inputs: [
      { id: 'score', label: '나의 취득 점수', type: 'number', defaultValue: 92, section: '시험 성향 수치 입력' },
      { id: 'avg', label: '과목 전체 평균 점수', type: 'number', defaultValue: 72, section: '시험 성향 수치 입력' },
      { id: 'stdDev', label: '과목 전체 표준편차 수치', type: 'number', defaultValue: 18, section: '시험 성향 수치 입력' },
      { id: 'studentCount', label: '수강 학생 총인원수', type: 'number', defaultValue: 250, unit: '명', unitPosition: 'suffix', section: '모객단 규모' }
    ],
    calculate: (inputs) => {
      const score = Number(inputs.score) || 0;
      const avg = Number(inputs.avg) || 0;
      const stdDev = Math.max(0.1, Number(inputs.stdDev) || 1);
      const total = Math.max(1, Number(inputs.studentCount) || 1);

      // Z-점수 환산
      const zScore = (score - avg) / stdDev;

      // 정규분포 누적 분포 단면 근사 계산 (어차피 대칭이므로 z 값에 따랏)
      // Erf 근사를 활용한 누적 확율 도출 (정규 분포 누적)
      let p = 0.5 * (1.0 + Math.sign(zScore) * Math.sqrt(1.0 - Math.exp(-2.0 * zScore * zScore / Math.PI)));
      const pctOver = (1 - p) * 100; // 나보다 잘 본 비율
      const rank = Math.max(1, Math.round((pctOver / 100) * total));

      // 한국 표준 고교 9등급 분류 대입
      let grade = 9;
      if (pctOver <= 4) grade = 1;
      else if (pctOver <= 11) grade = 2;
      else if (pctOver <= 23) grade = 3;
      else if (pctOver <= 40) grade = 4;
      else if (pctOver <= 60) grade = 5;
      else if (pctOver <= 77) grade = 6;
      else if (pctOver <= 89) grade = 7;
      else if (pctOver <= 96) grade = 8;

      const chartData = [
        { name: '나의 변환 Z-점수', value: Number(zScore.toFixed(2)) },
        { name: '과목 중간 (평균 Z)', value: 0 }
      ];

      return {
        results: [
          { label: '추정 고유 내신 석차 등급', value: `${grade} 등급`, rawValue: grade, displayType: 'text', info: '한국 표준 내신 상대 평가 누적 비율에 대입 연동한 등급 지표입니다.' },
          { label: '전교 예상 석차 추이', value: `${rank} 등선 / ${total}명 중`, rawValue: rank, displayType: 'text' },
          { label: '상위 누적 백분율 수준', value: `상위 ${pctOver.toFixed(2)} %`, rawValue: pctOver, displayType: 'text' },
          { label: '시험의 난이도 Z-점수', value: `${zScore.toFixed(3)}`, rawValue: zScore, displayType: 'text', info: 'Z점수가 양수로 높을수록 과 평균 대비 탁월하게 시험을 잘 수령했음을 상징합니다.' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '중고등학교에서 가동되는 특목고 명문 일반고 과목별 성향과 난도 분포 등급을 통계적으로 사전 검토해 등선 비율을 도출합니다.',
      formula: 'Z-점수 = (원점수 - 과평균) / 표준편차. 정규분포 누적비 적용',
      tips: [
        '표준편차가 아주 작다(예: 10 이하)는 것은 학생들의 점수가 평균에 아주 조밀하게 붐빈다는 뜻으로, 1~2점 실수에 전교 석차가 극렬 하강 수 소멸할 소지가 큽니다.'
      ],
      faqs: [
        { question: 'Z-점수가 대입이나 편입에 왜 중요시되나요?', answer: '수강생들의 학업 수렴 분포도 표준편차를 가미 처리함으로써, 학풍 강세 학교의 내신 불리 요건을 국가 평가에서 보전 조율하기 위한 정직한 척도이기 때문입니다.' }
      ]
    },
    relatedSlugs: ['gpa-calculator', 'percentage-calculator']
  },

  // 18. ELECTRIC CAR SAVINGS CALCULATOR
  {
    title: '전기차 유지비 vs 휘발유 가가 가성비 계산기',
    slug: 'electric-car-savings-calculator',
    category: 'automobile',
    description: '연간 자가 주행량과 기존 휘발유 및 디젤 공인 연비 유가, 전기 충전용 단가(kWh) 효율을 전량 대조하여 전기 동력 확보에 따른 수백만원 절감 기회 분석을 띱니다.',
    aliases: ['전기차유지비', '유비비교', '기동충전', '전기차충전', '내연기관비교'],
    inputs: [
      { id: 'mileage', label: '연간 예상 주행 총거리', type: 'number', defaultValue: 20000, unit: 'km', unitPosition: 'suffix', section: '주행 조건' },
      { id: 'gasPrice', label: '휘발유 리터당 유가 세팅', type: 'number', defaultValue: 1650, unit: '원', unitPosition: 'suffix', section: '휘발유 차량 변수' },
      { id: 'gasEfficiency', label: '휘발유 누계 연비 효율', type: 'number', defaultValue: 12.0, unit: 'km/ℓ', unitPosition: 'suffix', section: '휘발유 차량 변수' },
      { id: 'evChargerPrice', label: '전기 충전 1kWh당 단가 비용', type: 'number', defaultValue: 340, unit: '원', unitPosition: 'suffix', section: '친환경 전기차 변수' },
      { id: 'evEfficiency', label: '전기차 종합 전비 효율', type: 'number', defaultValue: 5.5, unit: 'km/kWh', unitPosition: 'suffix', section: '친환경 전기차 변수' }
    ],
    calculate: (inputs) => {
      const mil = Number(inputs.mileage) || 0;
      const gPrice = Number(inputs.gasPrice) || 1650;
      const gEff = Number(inputs.gasEfficiency) || 12;
      const ePrice = Number(inputs.evChargerPrice) || 340;
      const eEff = Number(inputs.evEfficiency) || 5.5;

      const annualGasCost = (mil / gEff) * gPrice;
      const annualEvCost = (mil / eEff) * ePrice;
      const annualSavings = annualGasCost - annualEvCost;

      const chartData = [
        { name: '연 휘발유 연료비', value: Math.round(annualGasCost) },
        { name: '연 전기차 충수비', value: Math.round(annualEvCost) }
      ];

      return {
        results: [
          { label: '친환경 가동 연간 연료 세이브 총액', value: `${Math.round(annualSavings).toLocaleString()} 원/연간`, rawValue: annualSavings, displayType: 'text', info: '전기 충전 동력 이용 시 디폴트 휘발유 차량 대비 매칭 기하 절감되는 유휴 금액입니다.' },
          { label: '휘발유 차량 연간 예상 기름값', value: `${Math.round(annualGasCost).toLocaleString()} 원`, rawValue: annualGasCost, displayType: 'text' },
          { label: '전기차 연간 예상 완성 충전비', value: `${Math.round(annualEvCost).toLocaleString()} 원`, rawValue: annualEvCost, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '일일 통근 연장 거리가 길고 출장이 높은 주행 군들이 전기 이동수단 차종으로 전환 시의 지출 회수 기세를 면밀히 시연 감상하게 합니다.',
      formula: '휘발유 가액 = (주행 / 연비) * 유가, 전기 가액 = (주행 / 전비) * 전기료',
      tips: [
        '전기차는 구매 취득 단가 자체가 비공제 가액으로 비싼 경우가 잦으므로, 연료 소급 몫과 보험료 취득세를 입체 검증해 통제해야 현명합니다.'
      ],
      faqs: [
        { question: '겨울철 전기차 기동 전비가 폭락하는 이유는?', answer: '리튬이온 배터리 저온 정수 이탈과 더불어, 내연기관의 회수 폐열과 달리 순수 전기 히터 저항 구동으로 전력 가용 소모가 가속되기 때문입니다.' }
      ]
    },
    relatedSlugs: ['fuel-cost-calculator', 'percentage-calculator']
  },

  // 19. RECURRING REVENUE (MRR/ARR) FORECAST
  {
    title: '비즈니스 구독 매출 성장 예측 계산기 (MRR/ARR)',
    slug: 'recurring-revenue-calculator',
    category: 'business',
    description: '현재 시점 총 월간 반복 매출(MRR) 및 고객 신규 유입율, Churn Rate(중도 이탈 비율)를 조절 대입해, 향후 1년~3년 간의 기업 ARR 규모 성장을 시연합니다.',
    aliases: ['mrr', 'arr', '구독매출', 'SaaS', '스타트업성장', '이탈률'],
    inputs: [
      { id: 'startingMrr', label: '스타트업 현재 월 반복 매출 (MRR)', type: 'number', defaultValue: 15000000, unit: '원', unitPosition: 'suffix', section: '현재 비즈니스 볼륨' },
      { id: 'monthlyGrowth', label: '신규 고객 성장율 (월간 %)', type: 'range', defaultValue: 10, min: 1, max: 50, step: 0.5, unit: '%', unitPosition: 'suffix', section: '역동 지수 설정' },
      { id: 'churnRate', label: '고객 복합 중도 이탈률 (Churn %)', type: 'range', defaultValue: 3.5, min: 0.1, max: 20, step: 0.1, unit: '%', unitPosition: 'suffix', section: '역동 지수 설정' }
    ],
    calculate: (inputs) => {
      const sMrr = Number(inputs.startingMrr) || 0;
      const gRate = Number(inputs.monthlyGrowth) || 0;
      const cRate = Number(inputs.churnRate) || 0;

      const netGrowthRate = (gRate - cRate) / 100;
      
      const chartData: any[] = [];
      let currentMrr = sMrr;
      for (let m = 1; m <= 12; m++) {
        currentMrr = currentMrr * (1 + netGrowthRate);
        chartData.push({
          label: `${m}월 후`,
          MRR: Math.round(currentMrr),
          '연환산 ARR 스케일': Math.round(currentMrr * 12)
        });
      }

      const finalMrr = currentMrr;
      const finalArr = finalMrr * 12;

      return {
        results: [
          { label: '12개월 후 도달 확정 연 반복매출(ARR)', value: `${Math.round(finalArr).toLocaleString()} 원 / 연간`, rawValue: finalArr, displayType: 'text', info: '성장과 이탈 요율이 복합 적용된 1년 후 시평의 일시 상정 ARR 파이 볼륨입니다.' },
          { label: '12개월 후 월 반복매출 (MRR)', value: `${Math.round(finalMrr).toLocaleString()} 원 / 월`, rawValue: finalMrr, displayType: 'text' },
          { label: '비즈니스 진정 순월간 성장률 (합산)', value: `${(gRate - cRate).toFixed(1)} %`, rawValue: gRate - cRate, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: 'SaaS 및 정기 배송 구독 비즈니스 생태계에서 기업 가치 가속 기하학 성향을 정합 판단하는 핵심 밸류에이션 수단입니다.',
      formula: '차월 MRR = 전월 MRR * (1 + 신규보급% - 이탈률%)',
      tips: [
        '아무리 신규 충원 비율이 높아도 이탈률(Churn)이 5% 이상 만성 고착화되면 장기 시계열 성장은 물독 깨지듯 즉각 중단 마비됩니다.'
      ],
      faqs: [
        { question: 'ARR과 MRR의 상관 관계는 어찌 수립되나요?', answer: 'ARR은 연단위 반복 몫(Annual Recurring Revenue)으로 통칭 현재 달성 완료된 안정 MRR 숫자에 단순 12배를 얹어 상호 환산 적용해 공표합니다.' }
      ]
    },
    relatedSlugs: ['business-bep-calculator', 'percentage-calculator']
  },

  // 20. GEOMETRIC GCD AND LCM CALCULATOR
  {
    title: '최대공약수(GCD) 및 최소공배수(LCM) 수학 계산기',
    slug: 'gcd-lcm-calculator',
    category: 'math',
    description: '서로 다른 두 자연수 혹은 정수를 입력해 소인수분해 원리와 유클리드 호제법을 결합하여, 가장 큰 공통 약수(GCD)와 공통 배수(LCM)를 즉시 도출합니다.',
    aliases: ['최대공약수', '최소공배수', 'gcd', 'lcm', '유클리드', '약수와배수'],
    inputs: [
      { id: 'numA', label: '자연수 A 설정', type: 'number', defaultValue: 48, section: '정수 조건 구성' },
      { id: 'numB', label: '자연수 B 설정', type: 'number', defaultValue: 180, section: '정수 조건 구성' }
    ],
    calculate: (inputs) => {
      let a = Math.abs(Math.round(Number(inputs.numA) || 1));
      let b = Math.abs(Math.round(Number(inputs.numB) || 1));

      // 유클리드 호제법 GCD
      const getGcd = (x: number, y: number): number => {
        while (y !== 0) {
          let temp = x % y;
          x = y;
          y = temp;
        }
        return x;
      };

      const gcd = getGcd(a, b);
      const lcm = gcd > 0 ? (a * b) / gcd : 0;

      const chartData = [
        { name: '자연수 A', value: a },
        { name: '자연수 B', value: b },
        { name: '최대공약수 (GCD)', value: gcd },
        { name: '최소공배수 분율(단위10)', value: Math.round(lcm / 10) }
      ];

      return {
        results: [
          { label: '두 수의 최대공약수 (GCD)', value: `${gcd}`, rawValue: gcd, displayType: 'text', info: '두 자연수의 공통된 약수 들 중에서 수학적으로 가장 최대 한계의 값입니다.' },
          { label: '두 수의 최소공배수 (LCM)', value: `${lcm}`, rawValue: lcm, displayType: 'text', info: '두 수가 공통으로 전개해 가는 양적 배수 선상 최소의 수치입니다.' },
          { label: '두 자연수 곱의 관계 대조', value: `${(a * b).toLocaleString()}`, rawValue: a * b, displayType: 'text' }
        ],
        chartData
      };
    },
    seoContent: {
      guide: '수론 및 이산수학의 기본인 소수 분포와 배수 주기를 연동 해결하여, 톱니바퀴 연동이나 주기 파형 오차 매칭을 수학적으로 해결하도록 조력합니다.',
      formula: 'LCM(A, B) = (A * B) / GCD(A, B)',
      tips: [
        '약수 대조 시 유클리드 알고리즘은 거대한 천만 단위 이상의 고유 정수 공차 계산도 단 0.001초 미만에 초고속 가공 연산해 줍니다.'
      ],
      faqs: [
        { question: '유클리드 호제법의 원리는 핵심이 무엇인가요?', answer: '두 수의 나눗셈 잔여값을 지속 잔수로 순환 대조하며 공차 역수를 수렴 축소 검출하여 최대의 소외 지수를 확인하는 기법입니다.' }
      ]
    },
    relatedSlugs: ['percentage-calculator', 'unit-converter']
  }
];
