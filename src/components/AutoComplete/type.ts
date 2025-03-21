import {
  SelectOptions,
  FilterOption,
  VirtualListProps,
} from '@/components/Select/type';
import { PopupContainer, TriggerProps } from '@/components/Trigger/type';
export interface AutoCompleteProps {
  modelValue?: string;
  defaultValue?: string;
  disabled?: boolean;
  data?: SelectOptions;
  popupContainer?: PopupContainer;
  strict?: boolean;
  filterOption?: FilterOption;
  triggerProps?: TriggerProps;
  allowClear?: boolean;
  vistualListProps?: VirtualListProps;
}
