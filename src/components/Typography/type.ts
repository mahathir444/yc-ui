import { TooltipProps } from '@/components/Tooltip';

export interface TypographyProps {}

// base
export interface TypographyBaseProps {
  tag: string;
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  bold?: boolean;
  disabled?: boolean;
  mark?: boolean;
  underline?: boolean;
  deletable?: boolean;
  code?: boolean;
  editable?: boolean;
  editing?: boolean;
  defaultEditing?: boolean;
  editText?: string;
  copyable?: boolean;
  copyText?: string;
  copyDelay?: number;
  editTooltiProps?: TooltipProps;
  copyTooltiProps?: TooltipProps;
}

export interface TypographyBaseEmits {
  (e: 'update:editing', value: boolean): void;
  (e: 'update:editText', value: boolean): void;
  (e: 'edit-start'): void;
  (e: 'change', value: string): void;
  (e: 'copy', value: string): void;
  (e: 'edit-end'): void;
  (e: 'ellipsis', isEllipsis: boolean): void;
  (e: 'expand', expanded: boolean): void;
}

export interface TypographyBaseSlots {
  default(): void;
  ['expand-node'](params: { expanded: boolean }): void;
  ['copy-icon'](params: { copied: boolean }): void;
  ['copy-tooltip'](params: { copied: boolean }): void;
}

export interface TypographyTitleProps {
  heading: 1 | 2 | 3 | 4 | 5 | 6;
}
