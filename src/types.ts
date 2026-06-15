/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CalculatorCategory =
  | 'finance'
  | 'tax'
  | 'salary'
  | 'investment'
  | 'retirement'
  | 'military'
  | 'real-estate'
  | 'health'
  | 'education'
  | 'automobile'
  | 'travel'
  | 'shopping'
  | 'utility'
  | 'business'
  | 'math'
  | 'science'
  | 'construction'
  | 'fitness'
  | 'lifestyle'
  | 'date';

export interface CalculatorInputSchema {
  id: string;
  label: string;
  type: 'number' | 'range' | 'select' | 'boolean' | 'date';
  defaultValue: any;
  min?: number;
  max?: number;
  step?: number;
  unit?: string; // e.g. '$', '%', 'years', 'kg', 'miles'
  unitPosition?: 'prefix' | 'suffix';
  options?: { label: string; value: any }[]; // for 'select' type
  info?: string; // Tooltip / helper text
  section?: string; // Grouping inputs visually
}

export interface CalculatorResultRow {
  label: string;
  value: any;
  rawValue: number;
  displayType: 'currency' | 'percent' | 'number' | 'text' | 'date' | 'badge' | 'duration';
  badgeColor?: string; // for badge display
  info?: string;
}

export interface CalculatorSchema {
  title: string;
  slug: string;
  category: CalculatorCategory;
  description: string;
  aliases: string[]; // for robust search matching
  popular?: boolean;
  trending?: boolean;
  inputs: CalculatorInputSchema[];
  calculate: (inputs: Record<string, any>) => {
    results: CalculatorResultRow[];
    chartData?: any[]; // custom charting structure
    customReport?: any; // any extra rich detailed output fields
  };
  seoContent: {
    guide: string;
    formula?: string;
    tips: string[];
    faqs: { question: string; answer: string }[];
  };
  relatedSlugs: string[];
}
