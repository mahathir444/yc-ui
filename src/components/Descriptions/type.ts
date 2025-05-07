import { RenderContent, Size } from '@shared/type';
import { ResponsiveValue } from '../Grid';
import { CSSProperties } from 'vue';

export interface DescriptionsProps {
  data?: DescData[];
  column?: number | ResponsiveValue;
  title?: string;
  layout?: 'horizontal' | 'vertical' | 'inline-horizontal' | 'inline-vertical';
  align?: TextAlign | { label?: TextAlign; value?: TextAlign };
  size?: Size;
  bordered?: boolean;
  labelStyle?: CSSProperties;
  valueStyle?: CSSProperties;
  tableLayout?: 'auto' | 'fixed';
}

export interface DescriptionsSlots {
  value(): void;
  label(): void;
  title(): void;
}

export interface DescriptionsItemProps {
  span?: number;
  label: string;
}

export interface DescriptionsItemSlots {
  label(): void;
}

export interface DescData {
  label?: string | RenderContent;
  value?: string | RenderContent;
  span?: number;
}

export type TextAlign = 'left' | 'right' | 'center';
