import { ObjectData, Size } from '@shared/type';
import { TagProps } from '@/components/Tag';

export interface InputTagProps {
  modelValue?: InputTagValue;
  defaultValue?: InputTagValue;
  inputValue?: string;
  defaultInputValue?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  readonly?: boolean;
  allowClear?: boolean;
  size?: Size;
  maxTagCount?: number;
  retainInputValue?: boolean | InputRetainValue;
  formatTag?: (data: TagData) => string;
  uniqueValue?: boolean;
  tagNowrap?: boolean;
  fieldNames?: Record<string, string>;
  allowCreate?: boolean;
}

export type TagData =
  | {
      id?: string;
      label: string;
      value: string | number;
      closeable?: boolean;
      tagProps?: TagProps;
    }
  | ObjectData;

export type InputTagValue = (string | number | TagData)[];

export type InputRetainValue = { create?: boolean; blur?: boolean };

// 内部使用
export type InputTagEventType =
  | 'pressEnter'
  | 'input'
  | 'inputValueChange'
  | 'remove'
  | 'clear'
  | 'close'
  | 'focus'
  | 'blur';

export type InputTagEvent = Event | MouseEvent | KeyboardEvent | FocusEvent;
