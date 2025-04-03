import { Size } from '@shared/type';
import { TriggerProps } from '@/components/Trigger';

export interface ColorPickerProps {
  modelValue?: string;
  defaultValue?: string;
  format?: 'hex' | 'rgb';
  size?: Size;
  showText?: boolean;
  showHistory?: boolean;
  showPreset?: boolean;
  disabled?: boolean;
  disabledAlpha?: boolean;
  hideTrigger?: boolean;
  triggerProps?: TriggerProps;
  historyColors?: string[];
  presetColors?: string[];
}
export type ColorFormat = 'hex' | 'rgb';
