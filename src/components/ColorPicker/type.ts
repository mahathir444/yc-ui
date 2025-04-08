import { Ref, WritableComputedRef } from 'vue';
import { Size, RequiredDeep } from '@shared/type';
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

export interface ColorPickerEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: boolean): void;
  (e: 'popupVisibleChange', value: boolean): void;
}

export type ColorFormat = 'hex' | 'rgb';

// 内置类型
export type ColorPickerProvide = {
  props: RequiredDeep<ColorPickerProps>;
  emits: ColorPickerEmits;
  popupVisible: Ref<boolean>;
  computedColor: WritableComputedRef<string> | Ref<string>;
  baseColor: Ref<string>;
  format: WritableComputedRef<ColorFormat> | Ref<ColorFormat>;
  alpha: Ref<number>;
};
