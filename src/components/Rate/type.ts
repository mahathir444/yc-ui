export interface RateProps {
  count?: number;
  modelValue?: number;
  defaultValue?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  grading?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  color?: string;
}

export interface RateEmits {
  (e: 'update:modelValue', value: number): void;
  (e: 'change', value: number): void;
  (e: 'hoverChange', value: number): void;
}
