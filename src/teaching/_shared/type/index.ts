import { RenderFunction } from 'vue';

export type Size = 'mini' | 'small' | 'medium' | 'large';

export type Direction = 'vertical' | 'horizontal';

export type RenderContent = string | RenderFunction;

export type ClassName =
  | string
  | Record<string, boolean>
  | (string | Record<string, boolean>)[];

export type Fn = (...args: any) => any;

export type ObjectData = Record<string, any>;

export type PopupContainer = string | HTMLElement;
