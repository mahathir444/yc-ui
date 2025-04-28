import { CSSProperties } from 'vue';

export interface ScrollbarProps {
  type?: TackType;
  outerClass?: string;
  outerStyle?: CSSProperties;
  style?: CSSProperties;
  autoFill?: boolean;
}

export interface ScrollbarEmits {
  (e: 'scroll', left: number, top: number): void;
  (e: 'reachBottom'): void;
  (e: 'reachRight'): void;
}

export type TackType = 'track' | 'embed';
