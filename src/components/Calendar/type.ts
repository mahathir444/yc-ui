export interface CalendarProps {
  modelValue?: string;
  detaultValue?: string;
  mode?: 'month' | 'year';
  defaultMode?: 'month' | 'year';
  modes?: ('month' | 'year')[];
}

export interface CalendarEmits {
  (e: 'change', date: string): void;
  (e: 'panel-change', date: string): void;
}

export interface CalendarSlots {
  header(params: { year: number; month: number }): void;
  default(params: { year: number; month: number; date: number }): void;
}
