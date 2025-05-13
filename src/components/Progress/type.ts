import { Size } from '@shared/type';

export interface ProgressProps {
  type: 'line' | 'circle';
  size: Size;
  percent: number;
  steps: number;
  animation: boolean;
  strokeWidth: number;
  width: number;
  color: string | Record<string, string>;
  trackColor: string;
  showText: boolean;
  status: 'normal' | 'success' | 'warning' | 'danger';
}
