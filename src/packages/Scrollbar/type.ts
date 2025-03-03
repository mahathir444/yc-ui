import { CSSProperties } from 'vue';

export type TackType = 'track' | 'embed';

export interface ScrollbarProps {
  type?: TackType;
  outerClass?: string;
  outerStyle?: CSSProperties;
}
