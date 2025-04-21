import { TriggerProps } from '../Trigger';
import { PopupContainer } from '@shared/type';

export interface TimePickerProps {
  type?: 'time' | 'time-range';
  modelValue?: string | number | Date | Array<string | number | Date>;
  defaultValue?: string | number | Date | Array<string | number | Date>;
  disabled?: boolean;
  allowClear?: boolean;
  readonly?: boolean;
  error?: boolean;
  format?: string;
  placeholder?: string | string[];
  size?: 'mini' | 'small' | 'medium' | 'large';
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
  position?: 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br';
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  triggerProps?: TriggerProps;
  unmountOnClose?: boolean;
}

export type TimeType = 'hours' | 'minutes' | 'seconds' | 'meridiems';
