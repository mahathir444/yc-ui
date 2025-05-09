import { Direction } from '../_shared/type';

export interface StepsProps {
  type?: 'default' | 'arrow' | 'dot' | 'navigation';
  direction?: Direction;
  labelPlacement?: Direction;
  current?: number;
  defaultCurrent?: number;
  status?: StepStatus;
  lineLess?: boolean;
  small?: boolean;
  changeable?: boolean;
}

export interface StepsEmits {
  (e: 'change', step: number, ev: Event): void;
  (e: 'update:current', step: number): void;
}

export interface StepsSlots {
  default(): void;
}

export interface StepProps {
  title?: string;
  description?: string;
  status?: StepStatus;
  disabled?: boolean;
}

export interface StepSlots {
  node(params: { step: number; status: StepStatus }): void;
  icon(params: { step: number; status: StepStatus }): void;
  description(): void;
  default(): void;
}

export type StepStatus = 'wait' | 'process' | 'finish' | 'error';
