import { Size } from '@arco-design/web-vue';
import { TriggerProps } from '../Trigger';
import { PopupContainer } from '@shared/type';
import { DropdownPosition } from '../Dropdown';

export interface TimePickerProps {
  type?: 'time' | 'time-range';
  modelValue?: TimePickerValue;
  defaultValue?: TimePickerValue;
  disabled?: boolean;
  allowClear?: boolean;
  readonly?: boolean;
  error?: boolean;
  format?: string;
  placeholder?: string | string[];
  size?: Size;
  popupContainer?: PopupContainer;
  // use12Hours?: boolean;
  step?: {
    hour?: number;
    minute?: number;
    second?: number;
  };
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour?: number) => number[];
  disabledSeconds?: (
    selectedHour?: number,
    selectedMinute?: number
  ) => number[];
  hideDisabledOptions?: boolean;
  disableConfirm?: boolean;
  position?: DropdownPosition;
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  triggerProps?: TriggerProps;
  unmountOnClose?: boolean;
}

export interface TimePickerEmits {
  (e: 'update:modelValue', value: TimePickerProps['modelValue']): void;
  (e: 'change', value: TimePickerProps['modelValue']): void;
  (e: 'clear'): void;
  (e: 'popup-visible-change', visible: boolean): void;
  (e: 'update:popupVisible', visible: boolean): void;
  (e: 'select', value: TimePickerProps['modelValue']): void;
}

export type TimeType = 'hours' | 'minutes' | 'seconds' | 'meridiems';
export type TimePickerValue =
  | string
  | number
  | Date
  | Array<string | number | Date>;
