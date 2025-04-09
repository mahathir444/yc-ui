import { resizeBoxDirections } from '@shared/constants/resize-box';

export type DirectionType = (typeof resizeBoxDirections)[number];
export interface ResizeBoxProps {
  directions?: DirectionType[];
  width?: number;
  height?: number;
  component?: string;
}
