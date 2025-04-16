import { RESIZE_BOX_POSITION_MAP } from '@shared/constants';

export type DirectionType = (typeof RESIZE_BOX_POSITION_MAP)[number];

export interface ResizeBoxProps {
  directions?: DirectionType[];
  width?: number;
  height?: number;
  component?: string;
}
