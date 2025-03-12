import { CSSProperties } from 'vue';

export type TackType = 'track' | 'embed';

export interface ScrollbarProps {
  type?: TackType;
  outerClass?: string;
  outerStyle?: CSSProperties;
  style?: CSSProperties;
  autoFill?: boolean;
  verticalTrackWidth?: number;
  horizontalTrackHeight?: number;
  verticalThumbWidth?: number;
  verticalThubmHeight?: number;
}
