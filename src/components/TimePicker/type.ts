import { PopupContainer, Size } from '@shared/type';
import { TriggerProps } from '../Trigger';

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
  use12Hours?: boolean;
  step?: { hour?: number; minute?: number; second?: number };
  disabledHours?: number[];
  disabledMinutes?: number[];
  disabledSeconds?: number[];
  hideDisabledOptions?: boolean;
  disableConfirm?: boolean;
  position?: 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br';
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  triggerProps?: TriggerProps;
  unmountOnClose?: boolean;
}

export interface TimePickerEmits {
  (e: 'update:modelValue', value: TimePickerValue): void;
  (e: 'update:popupVisible', value: boolean): void;
  (
    e: 'change',
    timeString: string | Array<string | undefined> | undefined,
    time: Date | Array<Date | undefined> | undefined
  ): void;
  (
    e: 'select',
    timeString: string | Array<string | undefined> | undefined,
    time: Date | Array<Date | undefined> | undefined
  ): void;
  (e: 'clear'): void;
  (e: 'popup-visible-change', value: boolean): void;
}

export interface TimePickerSlots {
  prefix(): void;
  ['suffix-icon'](): void;
  extra(): void;
}

export type TimePickerValue =
  | string
  | number
  | Date
  | Array<string | number | Date>;
