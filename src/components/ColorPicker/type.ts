import { Ref, WritableComputedRef } from 'vue';
import { Size } from '@shared/type';
import { TriggerProps } from '@/components/Trigger';

export interface ColorPickerProps {
  modelValue?: string;
  defaultValue?: string;
  format?: ColorFormat;
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

// 内置类型
export type ProvideType = {
  computedColor: WritableComputedRef<string> | Ref<string>;
  baseColor: Ref<string>;
  alpha: Ref<number>;
  format: WritableComputedRef<ColorFormat> | Ref<ColorFormat>;
  popupVisible: Ref<boolean>;
  showHistory: Ref<boolean>;
  showPreset: Ref<boolean>;
  disabled: Ref<boolean>;
  disabledAlpha: Ref<boolean>;
  historyColors: Ref<string[]>;
  presetColors: Ref<string[]>;
};
