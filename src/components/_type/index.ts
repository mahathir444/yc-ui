import { RenderFunction } from 'vue';

export type Size = 'mini' | 'small' | 'medium' | 'large';

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

export type YcUiOptions = Record<string, any>;

export type Fn = (...args: any) => any;
