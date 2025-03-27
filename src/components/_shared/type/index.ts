import { RenderFunction } from 'vue';

export type Size = 'mini' | 'small' | 'medium' | 'large';

export type Direction = 'vertical' | 'horizontal';

export type CloseType =
  | 'mask'
  | 'closeBtn'
  | 'cancelBtn'
  | 'confirmBtn'
  | 'esc'
  | '';

export type RenderContent = string | RenderFunction;

export type ClassName =
  | string
  | Record<string, boolean>
  | (string | Record<string, boolean>)[];

export type Fn = (...args: any) => any;

export type ObjectData = Record<string, any>;

export type IconProps = {
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'bevel' | 'miter' | 'round' | 'inherit';
  rotate?: number;
  spin?: boolean;
  size?: number | number[];
  color?: string;
};

export type RequiredDeep<T> = {
  [P in keyof T]-?: T[P] extends object ? RequiredDeep<T[P]> : T[P];
};
