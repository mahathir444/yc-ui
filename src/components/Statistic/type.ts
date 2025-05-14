import { CSSProperties } from 'vue';

export interface StatisticProps {
  title?: string;
  value?: number | Date;
  format?: string;
  extra?: string;
  start?: boolean;
  precision?: number;
  separator?: string;
  showGroupSeparator?: boolean;
  animation?: boolean;
  animationDuration?: number;
  valueFrom?: number;
  placeholder?: string;
  valueStyle?: CSSProperties;
}

export interface StatisticSlots {
  title(): void;
  prefix(): void;
  suffix(): void;
  extra(): void;
  value(): void;
}

export interface CountdownProps {
  title?: string;
  value?: number;
  now?: number;
  format?: string;
  start?: boolean;
  valueStyle?: CSSProperties;
}

export interface CountDownEmits {
  (e: 'finish'): void;
}

export interface CountdownSlots {
  title(): void;
}
