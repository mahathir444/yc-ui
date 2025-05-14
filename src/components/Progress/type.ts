import { Size } from '@shared/type';

export interface ProgressProps {
  type?: 'line' | 'circle';
  size?: Size;
  percent?: number;
  steps?: number;
  animation?: boolean;
  strokeWidth?: number;
  width?: number;
  color?: ProgressColor;
  trackColor?: string;
  showText?: boolean;
  status?: ProgressStatus;
}

export type ProgressColor = string | Record<string, string>;

export type ProgressStatus = 'normal' | 'success' | 'warning' | 'danger';
